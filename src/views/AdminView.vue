<template>
  <div class="admin">
    <div class="admin-shell">
      <header class="admin-header">
        <div class="admin-logo">
          <span class="admin-badge">ADMIN</span>
          <span class="admin-title">(주)세영테크 보온핀 문의 관리</span>
        </div>
      </header>

      <section v-if="!isLoggedIn" class="login-section">
        <h2>관리자 로그인</h2>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">아이디</label>
            <input
              id="username"
              v-model="loginForm.username"
              type="text"
              required
              autocomplete="username"
              placeholder="관리자 아이디를 입력하세요"
            />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <p v-if="loginError" class="error-message">{{ loginError }}</p>
          <button type="submit" class="btn btn-primary" :disabled="isLoggingIn">
            {{ isLoggingIn ? "로그인 중..." : "로그인" }}
          </button>
        </form>
      </section>

      <section v-else class="inquiry-section">
        <div class="inquiry-card">
          <div class="inquiry-header">
            <div>
              <h2>견적 문의 목록</h2>
              <p class="inquiry-subtitle">
                온라인 문의로 접수된 보온핀 견적 요청 현황입니다.
              </p>
            </div>
            <button
              class="btn btn-outline"
              @click="fetchInquiries"
              :disabled="isLoading"
            >
              새로고침
            </button>
          </div>

          <p v-if="loadError" class="error-message">{{ loadError }}</p>

          <div v-if="isLoading" class="loading">
            데이터를 불러오는 중입니다...
          </div>

          <div v-else-if="inquiries.length === 0" class="empty">
            등록된 견적 문의가 없습니다.
          </div>

          <div v-else>
            <!-- 데스크톱 테이블 -->
            <div class="table-wrapper desktop-only">
              <table class="inquiry-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>회사명</th>
                    <th>담당자</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                    <th>문의 내용</th>
                    <th>처리 상태</th>
                    <th>작업</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in inquiries" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.companyName }}</td>
                    <td>{{ item.manager }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td class="content-cell">
                      <div class="content-text">
                        {{ item.content }}
                      </div>
                    </td>
                    <td>
                      <span
                        class="status-badge"
                        :class="item.status ? 'status-done' : 'status-pending'"
                      >
                        {{ item.status ? "확인 완료" : "대기" }}
                      </span>
                    </td>
                    <td>
                      <div class="action-buttons">
                        <button
                          class="btn btn-small btn-detail"
                          @click="openDetailModal(item.id)"
                        >
                          상세보기
                        </button>
                        <button
                          class="btn btn-small"
                          :disabled="item.status || updatingId === item.id"
                          @click="markAsDone(item)"
                        >
                          {{
                            updatingId === item.id ? "처리 중..." : "확인 완료"
                          }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 모바일 카드 -->
            <div class="mobile-cards mobile-only">
              <div
                v-for="item in inquiries"
                :key="item.id"
                class="inquiry-card-mobile"
              >
                <div class="card-header">
                  <span class="card-id">#{{ item.id }}</span>
                  <span
                    class="status-badge"
                    :class="item.status ? 'status-done' : 'status-pending'"
                  >
                    {{ item.status ? "확인 완료" : "대기" }}
                  </span>
                </div>
                <div class="card-body">
                  <div class="card-row">
                    <span class="card-label">회사명</span>
                    <span class="card-value">{{ item.companyName }}</span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">담당자</span>
                    <span class="card-value">{{ item.manager }}</span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">이메일</span>
                    <span class="card-value">{{ item.email }}</span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">전화번호</span>
                    <span class="card-value">{{ item.phone }}</span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">문의 내용</span>
                    <span class="card-value card-content">{{
                      item.content
                    }}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <button
                    class="btn btn-small btn-detail"
                    @click="openDetailModal(item.id)"
                  >
                    상세보기
                  </button>
                  <button
                    class="btn btn-small"
                    :disabled="item.status || updatingId === item.id"
                    @click="markAsDone(item)"
                  >
                    {{ updatingId === item.id ? "처리 중..." : "확인 완료" }}
                  </button>
                </div>
              </div>
            </div>

            <div class="pagination" v-if="totalPages > 1">
              <span class="pagination-info">
                {{ page + 1 }} / {{ totalPages }} 페이지 (총
                {{ totalElements }}건)
              </span>
              <button
                class="btn btn-small"
                :disabled="page === 0 || isLoading"
                @click="
                  () => {
                    if (page > 0) {
                      page--;
                      fetchInquiries();
                    }
                  }
                "
              >
                이전
              </button>
              <button
                class="btn btn-small"
                :disabled="page >= totalPages - 1 || isLoading"
                @click="
                  () => {
                    if (page < totalPages - 1) {
                      page++;
                      fetchInquiries();
                    }
                  }
                "
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 상세 보기 모달 -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>견적 문의 상세</h3>
            <button class="modal-close" @click="closeModal">×</button>
          </div>
          <div v-if="isLoadingDetail" class="modal-loading">로딩 중...</div>
          <div v-else-if="detailError" class="modal-error">
            {{ detailError }}
          </div>
          <div v-else-if="detailInquiry" class="modal-body">
            <div class="detail-row">
              <span class="detail-label">ID</span>
              <span class="detail-value">{{ detailInquiry.id }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">회사명</span>
              <span class="detail-value">{{ detailInquiry.companyName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">담당자</span>
              <span class="detail-value">{{ detailInquiry.manager }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">이메일</span>
              <span class="detail-value">
                <a :href="`mailto:${detailInquiry.email}`">{{
                  detailInquiry.email
                }}</a>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">전화번호</span>
              <span class="detail-value">
                <a :href="`tel:${detailInquiry.phone}`">{{
                  detailInquiry.phone
                }}</a>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">처리 상태</span>
              <span
                class="status-badge"
                :class="detailInquiry.status ? 'status-done' : 'status-pending'"
              >
                {{ detailInquiry.status ? "확인 완료" : "대기" }}
              </span>
            </div>
            <div class="detail-row detail-row-full">
              <span class="detail-label">문의 내용</span>
              <div class="detail-content">{{ detailInquiry.content }}</div>
            </div>
          </div>
          <div
            v-if="detailInquiry && !detailInquiry.status"
            class="modal-footer"
          >
            <button
              class="btn btn-primary"
              :disabled="updatingId === detailInquiry.id"
              @click="markAsDone(detailInquiry)"
            >
              {{
                updatingId === detailInquiry.id
                  ? "처리 중..."
                  : "확인 완료 처리"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

type Inquiry = {
  id: number;
  companyName: string;
  manager: string;
  email: string;
  phone: string;
  content: string;
  status: boolean;
};

type InquiryPage = {
  content: Inquiry[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // 현재 페이지 (0-base)
};

const isLoggedIn = ref(false);
const isLoggingIn = ref(false);
const isLoading = ref(false);
const updatingId = ref<number | null>(null);
const loginError = ref("");
const loadError = ref("");

const loginForm = reactive({
  username: "",
  password: "",
});

const inquiries = ref<Inquiry[]>([]);
const page = ref(0);
const size = ref(10);
const totalPages = ref(0);
const totalElements = ref(0);

const showModal = ref(false);
const detailInquiry = ref<Inquiry | null>(null);
const isLoadingDetail = ref(false);
const detailError = ref("");

const handleLogin = async () => {
  loginError.value = "";
  isLoggingIn.value = true;
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: loginForm.username,
        password: loginForm.password,
      }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        loginError.value = "아이디 또는 비밀번호가 올바르지 않습니다.";
      } else {
        loginError.value = "로그인 중 오류가 발생했습니다.";
      }
      return;
    }

    // 로그인 성공
    isLoggedIn.value = true;
    page.value = 0; // 첫 페이지로 리셋
    await fetchInquiries();
  } catch (e) {
    console.error(e);
    loginError.value = "로그인 요청에 실패했습니다.";
  } finally {
    isLoggingIn.value = false;
  }
};

const fetchInquiries = async () => {
  loadError.value = "";
  isLoading.value = true;
  try {
    const params = new URLSearchParams({
      page: page.value.toString(),
      size: size.value.toString(),
    });

    const res = await fetch(`${API_BASE}/api/inquiry?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) {
      // 세션이 없거나 만료된 경우
      isLoggedIn.value = false;
      loadError.value = "";
      return;
    }

    if (!res.ok) {
      loadError.value = "견적 문의 목록을 불러오는 중 오류가 발생했습니다.";
      return;
    }

    const data: InquiryPage = await res.json();
    inquiries.value = data.content ?? [];
    totalPages.value = data.totalPages ?? 0;
    totalElements.value = data.totalElements ?? 0;
    page.value = data.number ?? 0;
  } catch (e) {
    console.error(e);
    loadError.value = "견적 문의 목록을 불러오는 데 실패했습니다.";
  } finally {
    isLoading.value = false;
  }
};

const openDetailModal = async (id: number) => {
  showModal.value = true;
  isLoadingDetail.value = true;
  detailError.value = "";
  detailInquiry.value = null;

  try {
    const res = await fetch(`${API_BASE}/api/inquiry/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) {
      isLoggedIn.value = false;
      showModal.value = false;
      loadError.value = "세션이 만료되었습니다. 다시 로그인해주세요.";
      return;
    }

    if (!res.ok) {
      detailError.value = "상세 정보를 불러오는 중 오류가 발생했습니다.";
      return;
    }

    const data: Inquiry = await res.json();
    detailInquiry.value = data;

    // 목록의 해당 항목도 업데이트
    const index = inquiries.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      inquiries.value[index] = data;
    }
  } catch (e) {
    console.error(e);
    detailError.value = "상세 정보를 불러오는 데 실패했습니다.";
  } finally {
    isLoadingDetail.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  detailInquiry.value = null;
  detailError.value = "";
};

const markAsDone = async (item: Inquiry) => {
  if (item.status) return;
  updatingId.value = item.id;
  try {
    const res = await fetch(`${API_BASE}/api/inquiry/${item.id}`, {
      method: "PATCH",
      credentials: "include",
    });

    if (res.status === 401) {
      isLoggedIn.value = false;
      loadError.value = "세션이 만료되었습니다. 다시 로그인해주세요.";
      if (showModal.value) {
        closeModal();
      }
      return;
    }

    if (!res.ok) {
      alert("상태 업데이트 중 오류가 발생했습니다.");
      return;
    }

    item.status = true;

    // 모달이 열려있고 같은 항목이면 모달의 데이터도 업데이트
    if (
      showModal.value &&
      detailInquiry.value &&
      detailInquiry.value.id === item.id
    ) {
      detailInquiry.value.status = true;
    }
  } catch (e) {
    console.error(e);
    alert("상태 업데이트 요청에 실패했습니다.");
  } finally {
    updatingId.value = null;
  }
};
</script>

<style scoped>
.admin {
  min-height: 100vh;
  background: #0f172a;
  padding: 2rem 0;
}

.admin-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2.5rem;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 2rem;
}

.admin-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #f97316;
  color: #111827;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.admin-title {
  color: #e5e7eb;
  font-size: 1rem;
  font-weight: 500;
}

.login-section {
  max-width: 420px;
  margin: 0 auto;
}

.inquiry-section {
  margin-top: 1rem;
}

.inquiry-card {
  background: #020617;
  border-radius: 12px;
  border: 1px solid #1f2937;
  padding: 1.75rem 1.5rem 1.5rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.65);
}

.login-form {
  background: #020617;
  padding: 2.5rem 2rem;
  border-radius: 8px;
  border: 1px solid #1f2937;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7);
}

.login-form .form-group {
  margin-bottom: 1.25rem;
}

.login-form label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: #e5e7eb;
}

.login-form input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 4px;
  border: 1px solid #374151;
  font-size: 0.95rem;
  background: #020617;
  color: #e5e7eb;
}

.login-form input:focus {
  outline: none;
  border-color: #0eb677;
  box-shadow: 0 0 0 1px rgba(14, 182, 119, 0.5);
}

.error-message {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: #e74c3c;
  font-size: 0.9rem;
}

.inquiry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.inquiry-header h2 {
  font-size: 1.6rem;
  color: #e5e7eb;
}

.inquiry-subtitle {
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: #9ca3af;
}

.loading,
.empty {
  padding: 2rem 1rem;
  text-align: center;
  color: #9ca3af;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #d1d5db;
}

.pagination-info {
  margin-right: 0.5rem;
}

.table-wrapper {
  overflow-x: auto;
}

.inquiry-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
}

.inquiry-table th,
.inquiry-table td {
  border: 1px solid #1f2937;
  padding: 0.75rem 0.6rem;
  font-size: 0.9rem;
}

.inquiry-table th {
  background: #020617;
  text-align: left;
  white-space: nowrap;
  color: #d1d5db;
  font-weight: 600;
}

.inquiry-table td {
  color: #f3f4f6;
  background: #1e293b;
}

.inquiry-table tbody tr:hover td {
  background: #334155;
}

.content-cell {
  max-width: 320px;
}

.content-text {
  max-height: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f3f4f6;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-done {
  background: #d4edda;
  color: #155724;
}

.btn-primary {
  background: #0eb677;
  color: #fff;
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #0eb677;
  color: #fff;
}

.btn-primary:hover:enabled {
  background: #0ca563;
}

.btn-outline {
  background: #fff;
  color: #0eb677;
  border: 1px solid #0eb677;
}

.btn-outline:hover {
  background: #0eb677;
  color: #fff;
}

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  background: #34495e;
  color: #fff;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-detail {
  background: #0eb677;
}

.btn-detail:hover:enabled {
  background: #0ca563;
}

.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

.mobile-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.inquiry-card-mobile {
  background: #1e293b;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1.25rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #1f2937;
}

.card-id {
  font-weight: 600;
  color: #9ca3af;
  font-size: 0.9rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-label {
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 500;
}

.card-value {
  font-size: 0.95rem;
  color: #f3f4f6;
  word-break: break-word;
}

.card-content {
  max-height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.card-actions .btn {
  flex: 1;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #020617;
  border: 1px solid #1f2937;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #1f2937;
}

.modal-header h3 {
  margin: 0;
  color: #e5e7eb;
  font-size: 1.3rem;
}

.modal-close {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #e5e7eb;
}

.modal-body {
  padding: 1.5rem;
}

.modal-loading,
.modal-error {
  padding: 2rem;
  text-align: center;
  color: #9ca3af;
}

.modal-error {
  color: #e74c3c;
}

.detail-row {
  display: flex;
  margin-bottom: 1.25rem;
  gap: 1rem;
}

.detail-row-full {
  flex-direction: column;
}

.detail-label {
  min-width: 100px;
  font-weight: 600;
  color: #9ca3af;
  font-size: 0.9rem;
}

.detail-value {
  color: #f3f4f6;
  flex: 1;
  word-break: break-word;
}

.detail-value a {
  color: #0eb677;
  text-decoration: none;
}

.detail-value a:hover {
  color: #0ca563;
  text-decoration: underline;
}

.detail-content {
  margin-top: 0.5rem;
  padding: 1rem;
  background: #1e293b;
  border-radius: 6px;
  color: #f3f4f6;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #1f2937;
  display: flex;
  justify-content: flex-end;
}

.btn:disabled {
  opacity: 0.6;
  cursor: default;
}

@media (max-width: 768px) {
  .admin {
    padding: 1.5rem 0;
  }

  .admin-shell {
    padding: 0 1rem 1.5rem;
  }

  .login-form {
    padding: 2rem 1.5rem;
  }

  .inquiry-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .modal-content {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
    max-height: 100vh;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1.25rem;
  }
}
</style>
