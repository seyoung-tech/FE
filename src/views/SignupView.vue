<template>
  <div class="signup">
    <div class="container">
      <section class="signup-section">
        <h1>회원가입</h1>
        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-group">
            <label for="username">아이디 *</label>
            <input
              type="text"
              id="username"
              v-model="form.username"
              required
              placeholder="아이디를 입력해주세요"
            />
          </div>

          <div class="form-group">
            <label for="password">비밀번호 *</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          <div class="form-group">
            <label for="passwordConfirm">비밀번호 확인 *</label>
            <input
              type="password"
              id="passwordConfirm"
              v-model="form.passwordConfirm"
              required
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>

          <div v-if="error" class="error-message">{{ error }}</div>

          <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? "가입 중..." : "회원가입" }}
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../api/client";

const form = ref({
  username: "",
  password: "",
  passwordConfirm: "",
});

const isSubmitting = ref(false);
const error = ref("");

const handleSignup = async () => {
  error.value = "";

  // 비밀번호 확인
  if (form.value.password !== form.value.passwordConfirm) {
    error.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      username: form.value.username,
      password: form.value.password,
    };

    await api.post("/api/auth/signup", payload);

    alert("회원가입이 완료되었습니다.");
    
    // 폼 초기화
    form.value = {
      username: "",
      password: "",
      passwordConfirm: "",
    };
  } catch (e: any) {
    console.error(e);
    if (e.response?.status === 400) {
      error.value = "입력한 정보를 다시 확인해주세요.";
    } else {
      error.value = "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.signup {
  padding: 4rem 0;
  background: #fff;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 500px;
  padding: 0 1rem;
}

.signup-section {
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 8px;
}

.signup-section h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.signup-form {
  max-width: 100%;
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

.form-group input {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: "Pretendard", sans-serif;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #0eb677;
  box-shadow: 0 0 0 3px rgba(14, 182, 119, 0.1);
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #fee;
  border-radius: 4px;
  border: 1px solid #fcc;
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

@media (max-width: 768px) {
  .signup-section {
    padding: 2rem 1.5rem;
  }

  .signup-section h1 {
    font-size: 2rem;
  }

  .form-group input {
    font-size: 16px; /* 모바일에서 자동 줌 방지 */
  }
}
</style>
