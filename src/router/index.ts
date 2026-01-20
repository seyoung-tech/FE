import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    // 저장된 위치가 있으면 (뒤로가기/앞으로가기) 그 위치로 이동
    if (savedPosition) {
      return savedPosition;
    }
    // 그 외의 경우 항상 최상단으로 스크롤
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "(주)세영테크 | 보온핀 · 건축자재 전문 제조 공장",
        description:
          "품질과 신용으로 승부하는 (주)세영테크. 외단열/내단열 시공용 보온핀, 와셔(와샤) 등 건축자재를 전문 생산·납품하는 보온핀 공장입니다.",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        title: "회사 소개 | 보온핀 · 건축자재 업체 (주)세영테크",
        description:
          "보온핀 전문 제조 공장 및 건축자재 업체 (주)세영테크의 회사 소개, 연혁, 인사말을 확인하세요.",
      },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView.vue"),
      meta: {
        title: "제품 소개 | 보온핀 규격 및 와셔(와샤) 건축자재",
        description:
          "1인치부터 9인치까지 다양한 규격의 보온핀과 와셔(와샤) 건축자재 제품을 소개합니다. 단열재 고정핀, 보온핀 제작·납품·공급 전문.",
      },
    },
    {
      path: "/location",
      name: "location",
      component: () => import("../views/LocationView.vue"),
      meta: {
        title: "오시는 길 | (주)세영테크 위치 안내",
        description: "(주)세영테크 위치 및 오시는 길 안내입니다.",
      },
    },
    {
      path: "/inquiry",
      name: "inquiry",
      component: () => import("../views/InquiryView.vue"),
      meta: {
        title: "견적 문의 | 보온핀 견적 요청",
        description:
          "보온핀 견적 문의를 남겨주세요. 전화 또는 이메일로 빠르게 답변드립니다.",
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: {
        title: "관리자 | 견적 문의 관리",
        description:
          "(주)세영테크 보온핀 견적 문의를 관리자 계정으로 확인하고 처리 상태를 관리합니다.",
      },
    },
  ],
});

export default router;
