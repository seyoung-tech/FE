<template>
  <div class="products">
    <div class="container">
      <!-- Page Header -->
      <section class="page-header">
        <h1>제품 소개</h1>
        <p>다양한 규격의 보온핀을 제조하고 있습니다</p>
      </section>

      <!-- Product Info Section -->
      <section class="product-info">
        <h2>보온핀이란?</h2>
        <div class="info-content">
          <p>
            보온핀은 단열재를 벽체, 천장 등에 고정하는 핀으로, 외단열 및 내단열 시공에서
            단열재가 떨어지지 않게 고정하는 필수 자재입니다.
          </p>
          <p>
            EPS(스티로폼), XPS, 그라스울, 미네랄울 등 다양한 단열재 종류와 함께 사용되며,
            건축물의 단열 성능을 유지하는 데 중요한 역할을 합니다.
          </p>
        </div>
      </section>

      <!-- Product Image and Specifications -->
      <section class="specifications">
        <h2>제품 규격</h2>
        <div class="product-spec-container">
          <div class="product-image-wrapper">
            <img
              src="/images/ChatGPT Image 2026년 1월 19일 오후 04_26_21.png"
              alt="보온핀 제품"
              class="product-image"
            />
          </div>
          <div class="spec-table-wrapper">
            <table class="spec-table">
              <thead>
                <tr>
                  <th>길이</th>
                  <th>길이 (mm)</th>
                  <th>밑판 크기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1인치</td>
                  <td>40mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>2인치</td>
                  <td>50mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>3인치</td>
                  <td>75mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>4인치</td>
                  <td>100mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>5인치</td>
                  <td>125mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>6인치</td>
                  <td>150mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>7인치</td>
                  <td>175mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>8인치</td>
                  <td>200mm</td>
                  <td>43mm × 43mm</td>
                </tr>
                <tr>
                  <td>9인치</td>
                  <td>230mm</td>
                  <td>43mm × 43mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Product Features -->
      <section class="features">
        <h2>제품 특징</h2>
        <div class="features-grid">
          <div class="feature-item">
            <h3>견고한 고정력</h3>
            <p>단열재를 안정적으로 고정하여 시공 후에도 변형이나 이탈이 없습니다.</p>
          </div>
          <div class="feature-item">
            <h3>방청 처리</h3>
            <p>부식과 녹을 방지하는 처리로 오래 사용할 수 있습니다.</p>
          </div>
          <div class="feature-item">
            <h3>다양한 규격</h3>
            <p>35T부터 150T까지 다양한 두께에 맞는 제품을 제공합니다.</p>
          </div>
        </div>
      </section>

      <!-- Application Section -->
      <section class="application">
        <h2>적용 분야</h2>
        <div class="application-list">
          <div class="app-item">
            <h3>외단열 시공</h3>
            <p>건물 외벽에 단열재를 고정하는 용도로 사용됩니다.</p>
          </div>
          <div class="app-item">
            <h3>내단열 시공</h3>
            <p>건물 내부 벽체나 천장에 단열재를 고정하는 용도로 사용됩니다.</p>
          </div>
          <div class="app-item">
            <h3>경량철골 구조</h3>
            <p>경량철골 구조물에 단열재를 고정하는 데 사용됩니다.</p>
          </div>
          <div class="app-item">
            <h3>슬래브 및 천장</h3>
            <p>슬래브나 천장에 단열재를 고정하는 용도로 사용됩니다.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-box">
          <h2>견적 문의</h2>
          <p>다양한 규격의 보온핀에 대한 견적 문의를 받고 있습니다.</p>
          <div class="cta-buttons">
            <a :href="`tel:${contactInfo.mobile}`" class="btn btn-primary btn-call">{{ contactInfo.mobile }}</a>
            <RouterLink to="/inquiry" class="btn btn-secondary">온라인 문의</RouterLink>
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
.products {
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

.product-info,
.specifications,
.features,
.application {
  margin-bottom: 5rem;
}

.product-info h2,
.specifications h2,
.features h2,
.application h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.info-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #34495e;
}

.info-content p {
  margin-bottom: 1.5rem;
}

.product-spec-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.product-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.spec-table-wrapper {
  overflow-x: auto;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.spec-table thead {
  background: #0EB677;
  color: #fff;
}

.spec-table th,
.spec-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.spec-table th {
  font-weight: 600;
  font-size: 1.1rem;
}

.spec-table tbody tr:hover {
  background: #f8f9fa;
}

.spec-table tbody tr:last-child td {
  border-bottom: none;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-item p {
  color: #7f8c8d;
  line-height: 1.6;
}

.application-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.app-item {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid #0EB677;
}

.app-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.app-item p {
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
  background: #0EB677;
  color: #fff;
}

.btn-primary:hover {
  background: #0CA563;
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

.btn-call {
  font-size: 1.1rem;
  font-weight: 700;
  -webkit-tap-highlight-color: rgba(14, 182, 119, 0.3);
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .product-info h2,
  .specifications h2,
  .features h2,
  .application h2 {
    font-size: 1.8rem;
  }

  .product-info,
  .specifications,
  .features,
  .application {
    margin-bottom: 3rem;
  }

  .product-spec-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-image-wrapper {
    padding: 1.5rem;
  }

  .spec-table {
    font-size: 0.85rem;
  }

  .spec-table th,
  .spec-table td {
    padding: 0.75rem 0.5rem;
  }

  .features-grid,
  .application-list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-item,
  .app-item {
    padding: 1.5rem;
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
