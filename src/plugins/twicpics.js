import "@twicpics/components/style.css";
import TwicPics from "@twicpics/components/vue3";

export const useTwicPics = () => ({
  install(app) {
    const domain = "https://canastacomun.twic.pics";

    app.use(TwicPics, {
      domain,
    });
    app.config.globalProperties.$TwicPics = {
      url(path) {
        const url = new URL(domain);
        url.pathname = path;
        return url.href;
      },
    };
  },
});
