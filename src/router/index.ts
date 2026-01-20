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
        title: "(주)세영테크 | 보온핀 전문 제조",
        description:
          "품질과 신용으로 승부하는 (주)세영테크. 외단열/내단열 시공용 보온핀 제조 및 견적 문의를 받습니다.",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        title: "회사 소개 | (주)세영테크",
        description: "(주)세영테크의 회사 소개, 연혁, 인사말을 확인하세요.",
      },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView.vue"),
      meta: {
        title: "제품 소개 | 보온핀 규격 및 종류",
        description:
          "다양한 규격의 보온핀 제품을 소개합니다. 35T부터 150T까지 다양한 두께에 맞는 보온핀을 제조합니다.",
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
