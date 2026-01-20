<template>
  <div class="location">
    <div class="container">
      <!-- Page Header -->
      <section class="page-header">
        <h1>연락처</h1>
        <p>문의 및 방문 안내</p>
      </section>

      <!-- Important Notice -->
      <section class="notice-section">
        <div class="notice-box">
          <h2>방문 전 반드시 연락 부탁드립니다</h2>
          <p>
            원활한 상담을 위해 방문을 원하시는 경우 미리 전화 또는 이메일로 연락
            주시면 정확한 위치를 안내해드립니다.
          </p>
        </div>
      </section>

      <!-- Contact Info -->
      <section class="contact-info">
        <div class="contact-grid">
          <div class="contact-card">
            <h3>전화</h3>
            <p>
              <a :href="`tel:${contactInfo.phone}`" class="contact-link">{{
                contactInfo.phone
              }}</a>
            </p>
            <p class="note">{{ contactInfo.businessHours }}</p>
          </div>
          <div class="contact-card">
            <h3>휴대폰</h3>
            <p>
              <a :href="`tel:${contactInfo.mobile}`" class="contact-link">{{
                contactInfo.mobile
              }}</a>
            </p>
            <p class="note">{{ contactInfo.businessHours }}</p>
          </div>
          <div class="contact-card">
            <h3>팩스</h3>
            <p class="fax-number">{{ contactInfo.fax }}</p>
          </div>
          <div class="contact-card">
            <h3>이메일</h3>
            <p>
              <a :href="`mailto:${contactInfo.email}`" class="contact-link">{{
                contactInfo.email
              }}</a>
            </p>
            <p class="note">24시간 접수 가능</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-box">
          <h2>문의하기</h2>
          <p>전화 또는 온라인으로 편리하게 문의하실 수 있습니다.</p>
          <div class="cta-buttons">
            <a
              :href="`tel:${contactInfo.mobile}`"
              class="btn btn-primary btn-call"
              >{{ contactInfo.mobile }}</a
            >
            <RouterLink to="/inquiry" class="btn btn-secondary"
              >온라인 문의</RouterLink
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { contactInfo } from "../config/contact";
</script>

<style scoped>
.location {
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

.notice-section {
  margin-bottom: 4rem;
}

.notice-box {
  max-width: 800px;
  margin: 0 auto;
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.notice-box h2 {
  font-size: 1.5rem;
  color: #856404;
  margin-bottom: 1rem;
}

.notice-box p {
  color: #856404;
  line-height: 1.8;
  font-size: 1.1rem;
}

.contact-info {
  margin-bottom: 5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.contact-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contact-card h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 600;
}

.contact-card > p {
  margin: 0;
  margin-bottom: 0.5rem;
}

.contact-link {
  color: #0eb677;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  transition: color 0.3s;
  display: inline-block;
}

.contact-link:hover {
  color: #0ca563;
}

.contact-card p:not(.note) {
  color: #34495e;
  font-size: 1.1rem;
}

.note {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.fax-number {
  color: #34495e;
  font-size: 1.3rem;
  font-weight: 600;
}

.cta-section {
  margin-top: 5rem;
}

.cta-box {
  background: #34495e;
  color: #fff;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.cta-box h2 {
  color: #fff;
  margin-bottom: 1rem;
}

.cta-box p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-primary {
  background: #0eb677;
  color: #fff;
}

.btn-primary:hover {
  background: #0ca563;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 182, 119, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-secondary:hover {
  background: #fff;
  color: #34495e;
}

.btn-outline {
  background: #fff;
  color: #0eb677;
  border: 2px solid #0eb677;
}

.btn-outline:hover {
  background: #0eb677;
  color: #fff;
}

.btn-call {
  font-size: 1.1rem;
  font-weight: 700;
  -webkit-tap-highlight-color: rgba(14, 182, 119, 0.3);
}

@media (max-width: 768px) {
  .location {
    padding: 3rem 0;
  }

  .page-header {
    margin-bottom: 3rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .notice-section {
    margin-bottom: 3rem;
  }

  .notice-box {
    padding: 1.5rem;
  }

  .notice-box h2 {
    font-size: 1.3rem;
  }

  .notice-box p {
    font-size: 1rem;
  }

  .contact-info {
    margin-bottom: 3rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .contact-card {
    padding: 1.5rem;
  }

  .contact-link {
    font-size: 1.1rem;
  }

  .fax-number {
    font-size: 1.1rem;
  }

  .cta-section {
    margin-top: 3rem;
  }

  .cta-box {
    padding: 2rem 1.5rem;
  }

  .cta-box h2 {
    font-size: 1.5rem;
  }

  .cta-box p {
    font-size: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
  }

  .btn-call {
    font-size: 1.2rem;
    padding: 1.2rem;
  }
}
</style>
