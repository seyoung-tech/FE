<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section brand">
          <h3>{{ contactInfo.companyName }}</h3>
          <p>품질과 신용으로 승부하는 보온핀 제조 전문 공장입니다.</p>
        </div>
        <div class="footer-section">
          <h4>연락처</h4>
          <ul class="contact-list">
            <li>
              전화:
              <a :href="`tel:${contactInfo.phone}`">{{ contactInfo.phone }}</a>
            </li>
            <li>팩스: {{ contactInfo.fax }}</li>
            <li>
              휴대폰:
              <a :href="`tel:${contactInfo.mobile}`">{{
                contactInfo.mobile
              }}</a>
            </li>
            <li>
              이메일:
              <a :href="`mailto:${contactInfo.email}`">{{
                contactInfo.email
              }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>빠른 링크</h4>
          <nav class="footer-links">
            <RouterLink to="/about">회사 소개</RouterLink>
            <RouterLink to="/products">제품 소개</RouterLink>
            <RouterLink to="/location">오시는 길</RouterLink>
            <RouterLink to="/inquiry">견적 문의</RouterLink>
          </nav>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 (주)세영테크. All Rights Reserved.</p>
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
  background: #2d3439;
  color: #c8cdd0;
  padding: 2.5rem 0 1.25rem;
  margin-top: 3rem;
}

.footer .container {
  max-width: 1100px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin: 0 0 0.75rem;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
}

.footer-section.brand h3 {
  font-size: 15px;
}

.footer-section p {
  margin: 0;
  line-height: 1.6;
  font-size: 14px;
  color: #9ca3a8;
}

.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.contact-list li {
  margin-bottom: 0.35rem;
  color: #9ca3a8;
}

.footer-section a {
  color: #0eb677;
}

.footer-section a:hover {
  color: #12c484;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.footer-links :deep(a) {
  color: #9ca3a8;
  font-size: 14px;
}

.footer-links :deep(a:hover) {
  color: #0eb677;
}

.footer-bottom {
  border-top: 1px solid #3d454b;
  padding-top: 1.25rem;
  text-align: center;
  font-size: 13px;
  color: #6b7379;
}

.footer-bottom p {
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
</style>
