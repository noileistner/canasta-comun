import "@twicpics/components/style.css";
import TwicPics from "@twicpics/components/vue3";

export const useTwicPics = () => ({
  install(app) {
    app.use(TwicPics, {
      domain: "https://canastacomun.twic.pics",
    });
  },
});
