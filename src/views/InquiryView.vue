<template>
  <div class="inquiry">
    <div class="container">
      <!-- Page Header -->
      <section class="page-header">
        <h1>견적 문의</h1>
        <p>전문 상담을 통해 최적의 제품을 추천해드립니다</p>
      </section>

      <!-- Contact Methods -->
      <section class="contact-methods">
        <div class="methods-grid">
          <div class="method-card phone">
            <h3>전화 문의</h3>
            <p>빠른 상담이 필요하시면 전화로 문의해주세요.</p>
            <a :href="`tel:${contactInfo.mobile}`" class="btn btn-primary btn-call">{{ contactInfo.mobile }}</a>
            <p class="method-note">{{ contactInfo.businessHours }}</p>
          </div>
          <div class="method-card email">
            <h3>이메일 문의</h3>
            <p>상세한 문의사항은 이메일로 보내주세요.</p>
            <a :href="`mailto:${contactInfo.email}`" class="btn btn-secondary">{{ contactInfo.email }}</a>
            <p class="method-note">24시간 접수 가능</p>
          </div>
        </div>
      </section>

      <!-- Inquiry Form -->
      <section class="inquiry-form-section">
        <h2>온라인 문의 양식</h2>
        <p class="form-description">
          아래 양식을 작성해주시면 빠르게 답변드리겠습니다.
        </p>
        <form @submit.prevent="handleSubmit" class="inquiry-form">
          <div class="form-group">
            <label for="company">회사명 *</label>
            <input
              type="text"
              id="company"
              v-model="form.company"
              required
              placeholder="회사명을 입력해주세요"
            />
          </div>

          <div class="form-group">
            <label for="manager">담당자명 *</label>
            <input
              type="text"
              id="manager"
              v-model="form.manager"
              required
              placeholder="담당자명을 입력해주세요"
            />
          </div>

          <div class="form-group">
            <label for="email">이메일 *</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              placeholder="이메일 주소를 입력해주세요"
            />
          </div>

          <div class="form-group">
            <label for="phone">전화번호 *</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              required
              placeholder="전화번호를 입력해주세요"
            />
          </div>

          <div class="form-group">
            <label for="message">문의 내용 *</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="6"
              placeholder="문의하실 내용을 자세히 입력해주세요"
            ></textarea>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="form.agreePrivacy"
                required
              />
              <span>개인정보 수집 및 이용에 동의합니다. *</span>
            </label>
            <p class="privacy-note">
              수집된 개인정보는 견적 문의 및 상담 목적으로만 사용되며,<br />
              문의 처리 완료 후 즉시 삭제됩니다.
            </p>
          </div>

          <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? "전송 중..." : "문의하기" }}
          </button>
        </form>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { contactInfo } from "../config/contact";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const form = ref({
  company: "",
  manager: "",
  email: "",
  phone: "",
  message: "",
  agreePrivacy: false,
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!form.value.agreePrivacy) {
    alert("개인정보 수집 및 이용에 동의해 주세요.");
    return;
  }

  isSubmitting.value = true;

  try {
    // 1) 백엔드로 견적 문의 저장
    const payload = {
      company: form.value.company,
      manager: form.value.manager,
      email: form.value.email,
      phone: form.value.phone,
      content: form.value.message,
    };

    const res = await fetch(`${API_BASE}/api/inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("문의 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      isSubmitting.value = false;
      return;
    }

    // 2) 이메일 클라이언트도 함께 열기 (기존 동작 유지)
    const subject = encodeURIComponent(`보온핀 견적 문의 - ${form.value.company}`);
    const body = encodeURIComponent(`
회사명: ${form.value.company}
담당자명: ${form.value.manager}
이메일: ${form.value.email}
전화번호: ${form.value.phone}

문의 내용:
${form.value.message}
    `);

    const mailtoLink = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    alert("문의가 등록되었습니다. 이메일 클라이언트가 열리면 메일도 함께 보내주세요.");

    // 폼 초기화
    form.value = {
      company: "",
      manager: "",
      email: "",
      phone: "",
      message: "",
      agreePrivacy: false,
    };
  } catch (e) {
    console.error(e);
    alert("문의 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.inquiry {
  padding: 4rem 0;
  background: #fff;
  min-height: 80vh;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e0e0e0;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.page-header p {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.contact-methods {
  margin-bottom: 5rem;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.method-card {
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.method-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.method-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.method-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.method-note {
  font-size: 0.9rem;
  color: #95a5a6;
  margin-top: 1rem;
}

.inquiry-form-section {
  margin-bottom: 0;
}

.inquiry-form-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

.form-description {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 3rem;
}

.inquiry-form {
  max-width: 700px;
  margin: 0 auto;
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: "Pretendard", sans-serif;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0EB677;
  box-shadow: 0 0 0 3px rgba(14, 182, 119, 0.1);
}

.form-group textarea {
  resize: vertical;
}

.checkbox-group {
  background: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin-top: 0.25rem;
  cursor: pointer;
}

.checkbox-label span {
  font-weight: 500;
  color: #2c3e50;
}

.privacy-note {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: #7f8c8d;
  line-height: 1.5;
}

.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
}

.btn-primary {
  background: #0EB677;
  color: #fff;
}

.btn-primary:hover {
  background: #0CA563;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 182, 119, 0.3);
}

.btn-secondary {
  background: #2c3e50;
  color: #fff;
}

.btn-secondary:hover {
  background: #34495e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

.btn-submit {
  width: 100%;
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  font-size: 1.1rem;
  margin-top: 1rem;
}

.btn-submit:hover:not(:disabled) {
  background: #34495e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-call {
  font-size: 1.1rem;
  font-weight: 700;
  -webkit-tap-highlight-color: rgba(14, 182, 119, 0.3);
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .inquiry-form-section h2 {
    font-size: 2rem;
  }

  .methods-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .method-card {
    padding: 2rem 1.5rem;
  }

  .btn {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    text-align: center;
  }

  .btn-call {
    font-size: 1.2rem;
    padding: 1.2rem;
  }

  .inquiry-form {
    padding: 2rem 1.5rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    font-size: 16px; /* 모바일에서 자동 줌 방지 */
  }
}
</style>
