<template>
  <div class="home">
    <!-- Banner Slider Section -->
    <section class="banner-slider">
      <div class="slider-container">
        <div
          class="slider-wrapper"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="slide"
            :class="{ active: currentSlide === index }"
          >
            <div
              class="slide-image"
              :class="{ 'no-overlay': index === 0 || index === 1 }"
              :style="{
                backgroundImage: slide.image
                  ? `url(${
                      index === 0 && isMobile
                        ? '/images/mob-banner1.png'
                        : index === 1 && isMobile
                        ? '/images/mob-banner2.png'
                        : slide.image
                    })`
                  : 'none',
                backgroundColor: '#2c3e50',
              }"
            >
              <div v-if="index !== 0 && index !== 1" class="slide-overlay">
                <div class="slide-content">
                  <h1 class="slide-title">{{ slide.title }}</h1>
                  <h2 class="slide-subtitle">{{ slide.subtitle }}</h2>
                  <p class="slide-description">{{ slide.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slider-controls">
          <button
            class="slider-btn prev"
            @click="prevSlide"
            aria-label="이전 슬라이드"
          >
            ‹
          </button>
          <button
            class="slider-btn next"
            @click="nextSlide"
            aria-label="다음 슬라이드"
          >
            ›
          </button>
        </div>
        <div class="slider-indicators">
          <button
            v-for="(_, index) in slides"
            :key="index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
            :aria-label="`슬라이드 ${index + 1}`"
          ></button>
        </div>
      </div>
    </section>

    <!-- Products Preview Section -->
    <section class="products-preview">
      <div class="container">
        <h2 class="section-title">주요 제품</h2>
        <div class="products-grid">
          <div class="product-card">
            <div class="product-image">
              <img src="/images/보온핀.png" alt="일반 보온핀 제품" />
            </div>
            <h3>일반 보온핀</h3>
            <p>35T ~ 150T 다양한 두께에 맞는 보온핀</p>
          </div>
          <div class="product-card">
            <div class="product-image">
              <img src="/images/보온핀-일반.jpg" alt="와셔 포함 보온핀 제품" />
            </div>
            <h3>와셔 포함 보온핀</h3>
            <p>와셔가 포함된 고정력이 뛰어난 보온핀</p>
          </div>
        </div>
        <div class="text-center" style="margin-top: 2rem">
          <RouterLink to="/products" class="btn btn-outline"
            >전체 제품 보기</RouterLink
          >
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">왜 우리를 선택해야 할까요?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>전문 제조 공장</h3>
            <p>
              (주)세영테크는 보온핀 전문 제조 공장으로 오랜 경험과 노하우를
              보유하고 있습니다.
            </p>
          </div>
          <div class="feature-card">
            <h3>높은 품질</h3>
            <p>엄격한 품질 관리로 고객에게 최고의 제품을 제공합니다.</p>
          </div>
          <div class="feature-card">
            <h3>빠른 납기</h3>
            <p>신속한 제조 및 납기 준수로 고객의 일정에 맞춥니다.</p>
          </div>
          <div class="feature-card">
            <h3>신뢰할 수 있는 서비스</h3>
            <p>고객과의 신뢰를 최우선으로 생각하며 정직한 거래를 약속합니다.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>지금 바로 견적을 문의하세요</h2>
          <p>전문 상담을 통해 최적의 제품을 추천해드립니다.</p>
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
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { contactInfo } from "../config/contact";

const currentSlide = ref(0);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const slides = ref([
  {
    title: "품질과 신용으로 승부하는",
    subtitle: "(주)세영테크",
    description:
      "외단열/내단열 시공에 필수적인 보온핀을 전문으로 제조합니다. 다양한 규격과 높은 품질로 고객 만족을 최우선으로 합니다.",
    image: "/images/seyoung-banner1.png",
  },
  {
    title: "오랜 경험과 노하우",
    subtitle: "전문 제조 기술",
    description:
      "보온핀 제조에 특화된 전문 공장으로 엄격한 품질 관리와 신속한 납기를 약속합니다.",
    image: "/images/banner2.png",
  },
  {
    title: "고객 만족을 최우선으로",
    subtitle: "신뢰할 수 있는 파트너",
    description:
      "고객과의 신뢰를 바탕으로 정직한 거래와 최고의 서비스를 제공합니다.",
    image: "/images/banner3_web.png",
  },
]);

let autoSlideInterval: number | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  resetAutoSlide();
};

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1;
  resetAutoSlide();
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetAutoSlide();
};

const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

const startAutoSlide = () => {
  autoSlideInterval = window.setInterval(() => {
    nextSlide();
  }, 5000); // 5초마다 자동 슬라이드
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  startAutoSlide();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  stopAutoSlide();
});
</script>

<style scoped>
.home {
  width: 100%;
}

/* Banner Slider Section */
.banner-slider {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.slide-image.no-overlay {
  background-size: cover;
  background-position: center;
  background-color: #fff;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-content {
  text-align: center;
  color: #fff;
  max-width: 800px;
  padding: 2rem;
}

.slide-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
}

.slide-subtitle {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
}

.slide-description {
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.95;
}

.slider-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
}

.slider-btn {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  pointer-events: all;
}

.slider-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.slider-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background: #fff;
}

/* Buttons */
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
  color: #2c3e50;
}

.btn-outline {
  background: transparent;
  color: #0eb677;
  border: 2px solid #0eb677;
}

.btn-outline:hover {
  background: #0eb677;
  color: #fff;
}

/* Features Section */
.features {
  padding: 5rem 0;
  background: #fff;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background: #f8f9fa;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

/* Products Preview Section */
.products-preview {
  padding: 5rem 0;
  background: #f8f9fa;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 280px;
  margin-bottom: 1.5rem;
  background: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.product-image:empty::after {
  content: "이미지 준비 중";
  color: #999;
  font-size: 0.9rem;
}

.product-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.product-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

.text-center {
  text-align: center;
}

/* CTA Section */
.cta {
  padding: 5rem 0;
  background: #34495e;
  color: #fff;
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .banner-slider {
    height: 350px;
  }

  .slide-title {
    font-size: 1.2rem;
  }

  .slide-subtitle {
    font-size: 1.6rem;
  }

  .slide-description {
    font-size: 0.9rem;
    padding: 0 1rem;
  }

  .slide-content {
    padding: 1.5rem;
  }

  .slider-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .slider-indicators {
    bottom: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .features {
    padding: 3rem 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .products-preview {
    padding: 3rem 0;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-card {
    padding: 1.5rem;
  }

  .product-image {
    height: 240px;
  }

  .product-image img {
    padding: 0.75rem;
  }

  .cta {
    padding: 3rem 0;
  }

  .cta-content {
    padding: 0 1rem;
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }

  .cta-content p {
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
    text-align: center;
  }

  .btn-call {
    font-size: 1.1rem;
    font-weight: 700;
  }
}
</style>
