import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// SEO: 라우터 변경 시 메타 태그 업데이트
router.beforeEach((to, _from, next) => {
  // Title 업데이트
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  // Description 메타 태그 업데이트
  if (to.meta.description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description as string);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", to.meta.description as string);
      document.head.appendChild(metaDescription);
    }
  }

  // OG Title 업데이트
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && to.meta.title) {
    ogTitle.setAttribute("content", to.meta.title as string);
  }

  // OG Description 업데이트
  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && to.meta.description) {
    ogDescription.setAttribute("content", to.meta.description as string);
  }

  // OG URL 업데이트
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    const baseUrl = window.location.origin;
    ogUrl.setAttribute("content", `${baseUrl}${to.path}`);
  }

  // Robots 메타 태그 명시적으로 설정 (색인 허용)
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement("meta");
    robotsMeta.setAttribute("name", "robots");
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.setAttribute("content", "index,follow");

  next();
});

app.mount("#app");
