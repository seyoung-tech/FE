<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <RouterLink to="/" class="logo">
          <img
            src="/images/스크린샷 2026-01-19 161602 (1).png"
            alt="(주)세영테크 로고"
            class="logo-image"
          />
        </RouterLink>
        <nav class="nav">
          <RouterLink to="/" class="nav-link">메인</RouterLink>
          <RouterLink to="/about" class="nav-link">회사 소개</RouterLink>
          <RouterLink to="/products" class="nav-link">제품 소개</RouterLink>
          <RouterLink to="/location" class="nav-link">오시는 길</RouterLink>
          <RouterLink to="/inquiry" class="nav-link inquiry-btn"
            >견적 문의</RouterLink
          >
        </nav>
        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          aria-label="메뉴"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav class="mobile-nav" :class="{ active: mobileMenuOpen }">
        <RouterLink to="/" class="mobile-nav-link" @click="closeMobileMenu"
          >메인</RouterLink
        >
        <RouterLink to="/about" class="mobile-nav-link" @click="closeMobileMenu"
          >회사 소개</RouterLink
        >
        <RouterLink
          to="/products"
          class="mobile-nav-link"
          @click="closeMobileMenu"
          >제품 소개</RouterLink
        >
        <RouterLink
          to="/location"
          class="mobile-nav-link"
          @click="closeMobileMenu"
          >오시는 길</RouterLink
        >
        <RouterLink
          to="/inquiry"
          class="mobile-nav-link"
          @click="closeMobileMenu"
          >견적 문의</RouterLink
        >
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
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.nav-link:hover {
  color: #0eb677;
}

.nav-link.router-link-active {
  color: #0eb677;
}

.inquiry-btn {
  background: #0eb677;
  color: #fff !important;
  padding: 0.45rem 1rem;
  font-size: 14px;
  font-weight: 500;
  margin-left: 0.5rem;
}

.inquiry-btn:hover {
  background: #099a5c;
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
  width: 20px;
  height: 2px;
  background: #333;
}

.mobile-nav {
  display: none;
  flex-direction: column;
  background: #fff;
  padding: 0.5rem 0 1rem;
  border-top: 1px solid #e5e5e5;
}

.mobile-nav-link {
  padding: 0.75rem 1.25rem;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.mobile-nav-link:hover {
  color: #0eb677;
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
    transition: max-height 0.2s ease-out;
  }

  .mobile-nav.active {
    max-height: 320px;
  }

  .logo-image {
    height: 34px;
  }
}
</style>
