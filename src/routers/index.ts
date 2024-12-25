import NProgress from "@/config/nprogress";
import router from "@/routers/router";
router.beforeEach(() => {
  NProgress.start();
})
router.afterEach(() => {
  NProgress.done();
})
export default router;
