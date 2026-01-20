<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ contactInfo.companyName }}</h3>
          <p>품질과 신용으로 승부하는 보온핀 제조 전문 공장입니다.</p>
        </div>
        <div class="footer-section">
          <h4>연락처</h4>
          <p>전화: <a :href="`tel:${contactInfo.phone}`">{{ contactInfo.phone }}</a></p>
          <p>팩스: {{ contactInfo.fax }}</p>
          <p>휴대폰: <a :href="`tel:${contactInfo.mobile}`">{{ contactInfo.mobile }}</a></p>
          <p>이메일: <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a></p>
        </div>
        <div class="footer-section">
          <h4>빠른 링크</h4>
          <div class="footer-links">
            <RouterLink to="/about">회사 소개</RouterLink>
            <RouterLink to="/products">제품 소개</RouterLink>
            <RouterLink to="/location">오시는 길</RouterLink>
            <RouterLink to="/inquiry">견적 문의</RouterLink>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 (주)세영테크. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { contactInfo } from "../config/contact";
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin: 0 0 1rem;
  font-weight: 600;
}

.footer-section h3 {
  font-size: 1.3rem;
}

.footer-section p {
  margin: 0.5rem 0;
  line-height: 1.6;
  color: #bdc3c7;
}

.footer-section a {
  color: #0EB677;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #0CA563;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links RouterLink {
  display: block;
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links RouterLink:hover {
  color: #0eb677;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 1.5rem;
  text-align: center;
  color: #95a5a6;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
