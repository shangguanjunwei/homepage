import NProgress from "@/config/nprogress";
import router from "@/routers/router";
const webTitle = import.meta.env.VITE_GLOB_APP_TITLE || ''
router.beforeEach((to) => {
  let title = webTitle;
  // 设置页面标题
  if (to.meta.title) {
    title += ` | ${to.meta.title}`;
  }
  (document as any).title = title;
  NProgress.start();
})
router.afterEach(() => {
  NProgress.done();
})
export default router;
