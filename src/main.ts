import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// SEO: 라우터 변경 시 메타 태그 업데이트
router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description as string);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = to.meta.description as string;
      document.head.appendChild(meta);
    }
  }
  next();
});

app.mount("#app");
