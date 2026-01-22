<template>
  <div class="about">
    <div class="container">
      <!-- Page Header -->
      <section class="page-header">
        <h1>회사 소개</h1>
        <p>품질과 신용으로 승부하는 (주)세영테크</p>
      </section>

      <!-- Greeting Section -->
      <section class="greeting">
        <h2>보온핀 · 건축자재 전문 업체 인사말</h2>
        <div class="greeting-content">
          <p>안녕하세요. 보온핀 전문 제조 공장 (주)세영테크입니다.</p>
          <p>
            저희는 오랜 기간 보온핀 제조에 전념하여 쌓아온 경험과 노하우를
            바탕으로 고객 여러분께 최고 품질의 건축자재 보온핀과 와셔(와샤)
            제품을 제공하기 위해 노력하고 있습니다.
          </p>
          <p>
            건축 현장에서 단열재 고정에 필수적인 보온핀은 그 품질이 시공의
            안정성과 직접적으로 연결됩니다. (주)세영테크는 보온핀 및 관련
            건축자재를 전문으로 생산하는 보온핀 업체이자 건축자재 업체로서,
            엄격한 품질 관리와 정직한 거래를 통해 고객과의 신뢰를 쌓아가고
            있습니다.
          </p>
          <p>
            앞으로도 고객 만족을 최우선으로 생각하며, 더 나은 제품과 서비스를
            제공하기 위해 끊임없이 노력하겠습니다.
          </p>
          <p class="signature">감사합니다.</p>
        </div>
      </section>

      <!-- History Section -->
      <section class="history">
        <h2>연혁</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-year">2026</div>
            <div class="timeline-content">
              <h3>홈페이지 오픈</h3>
              <p>온라인을 통한 고객 접점 확대</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2015</div>
            <div class="timeline-content">
              <h3>보온핀 전문 제조 시작</h3>
              <p>다양한 규격의 보온핀 제조 및 공급</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="values">
        <h2>경영 이념</h2>
        <div class="values-grid">
          <div class="value-card">
            <h3>품질</h3>
            <p>엄격한 품질 관리로 최고의 제품을 생산합니다.</p>
          </div>
          <div class="value-card">
            <h3>신용</h3>
            <p>고객과의 약속을 지키며 신뢰를 쌓아갑니다.</p>
          </div>
          <div class="value-card">
            <h3>서비스</h3>
            <p>고객 만족을 최우선으로 생각합니다.</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-box">
          <h2>함께 성장해 나가요</h2>
          <p>저희와 함께 하실 고객을 기다립니다.</p>
          <RouterLink to="/inquiry" class="btn btn-primary"
            >견적 문의하기</RouterLink
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { onMounted, onUnmounted } from "vue";

// 구조화된 데이터 (JSON-LD) 추가
onMounted(() => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "회사 소개 | 보온핀 · 건축자재 업체 (주)세영테크",
    "description": "보온핀 전문 제조 공장 및 건축자재 업체 (주)세영테크의 회사 소개, 연혁, 인사말을 확인하세요.",
    "mainEntity": {
      "@type": "Organization",
      "name": "(주)세영테크",
      "description": "보온핀 전문 제조 공장 및 건축자재 업체",
      "url": "https://www.seyoung-tech.kr",
      "telephone": "031-316-0250",
      "email": "sytt1234@naver.com",
      "foundingDate": "2015",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KR",
      },
    },
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(jsonLd);
  script.id = "about-jsonld";
  document.head.appendChild(script);
});

onUnmounted(() => {
  const script = document.getElementById("about-jsonld");
  if (script) {
    script.remove();
  }
});
</script>

<style scoped>
.about {
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

.greeting,
.history,
.values {
  margin-bottom: 5rem;
}

.greeting h2,
.history h2,
.values h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.greeting-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #34495e;
}

.greeting-content p {
  margin-bottom: 1.5rem;
}

.signature {
  text-align: right;
  font-weight: 600;
  margin-top: 2rem;
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding-left: 3rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #0eb677;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: -1.5rem;
  top: 0.5rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0eb677;
  border: 3px solid #fff;
  box-shadow: 0 0 0 3px #0eb677;
}

.timeline-year {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0eb677;
  margin-bottom: 0.5rem;
}

.timeline-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.timeline-content p {
  color: #7f8c8d;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.value-card {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.value-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #0eb677;
}

.value-card p {
  color: #7f8c8d;
  line-height: 1.6;
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

@media (max-width: 768px) {
  .about {
    padding: 3rem 0;
  }

  .page-header {
    margin-bottom: 3rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .greeting,
  .history,
  .values {
    margin-bottom: 3rem;
  }

  .greeting h2,
  .history h2,
  .values h2 {
    font-size: 1.8rem;
  }

  .greeting-content {
    font-size: 1rem;
  }

  .timeline {
    padding-left: 2rem;
  }

  .timeline-item {
    padding-left: 2rem;
    margin-bottom: 2rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .value-card {
    padding: 2rem;
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

  .btn {
    width: 100%;
    padding: 1rem;
  }
}
</style>
