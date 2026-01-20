<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <RouterLink to="/" class="logo">
          <img src="/images/스크린샷 2026-01-19 161602 (1).png" alt="(주)세영테크 로고" class="logo-image" />
        </RouterLink>
        <nav class="nav">
          <RouterLink to="/" class="nav-link">메인</RouterLink>
          <RouterLink to="/about" class="nav-link">회사 소개</RouterLink>
          <RouterLink to="/products" class="nav-link">제품 소개</RouterLink>
          <RouterLink to="/location" class="nav-link">오시는 길</RouterLink>
          <RouterLink to="/inquiry" class="nav-link inquiry-btn">견적 문의</RouterLink>
        </nav>
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="메뉴">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav class="mobile-nav" :class="{ active: mobileMenuOpen }">
        <RouterLink to="/" class="mobile-nav-link" @click="closeMobileMenu">메인</RouterLink>
        <RouterLink to="/about" class="mobile-nav-link" @click="closeMobileMenu">회사 소개</RouterLink>
        <RouterLink to="/products" class="mobile-nav-link" @click="closeMobileMenu">제품 소개</RouterLink>
        <RouterLink to="/location" class="mobile-nav-link" @click="closeMobileMenu">오시는 길</RouterLink>
        <RouterLink to="/inquiry" class="mobile-nav-link" @click="closeMobileMenu">견적 문의</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-image {
  height: 50px;
  width: auto;
  object-fit: contain;
  display: block;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #0EB677;
}

.nav-link.router-link-active {
  color: #0EB677;
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: #0EB677;
}

.inquiry-btn {
  background: #0EB677;
  color: #fff !important;
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.inquiry-btn:hover {
  background: #0CA563;
}

.inquiry-btn.router-link-active::after {
  display: none;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background: #2c3e50;
  transition: all 0.3s;
}

.mobile-nav {
  display: none;
  flex-direction: column;
  background: #fff;
  padding: 1rem 0;
  border-top: 1px solid #e0e0e0;
}

.mobile-nav-link {
  padding: 1rem 2rem;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-nav-link:hover {
  background: #f8f9fa;
  color: #0EB677;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-nav {
    display: flex;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
  }

  .mobile-nav.active {
    max-height: 500px;
  }

  .logo-image {
    height: 40px;
  }
}
</style>
