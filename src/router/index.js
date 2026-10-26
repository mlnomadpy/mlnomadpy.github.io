import HomeView from "../views/HomeView.vue";
export const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/aboutme",
    name: "aboutme",
    component: () => import("../views/AboutMeView.vue"),
  },
  { path: "/about", redirect: "/aboutme" },
  {
    path: "/research",
    name: "research",
    component: () => import("../views/ResearchView.vue"),
  },
  { path: "/cv", name: "cv", component: () => import("../views/CvView.vue") },
  {
    path: "/talks",
    name: "talks",
    component: () => import("../views/TalksView.vue"),
  },
  {
    path: "/talks/:id",
    name: "TalkDetails",
    component: () => import("../views/TalkDetailsView.vue"),
    props: true,
  },
  {
    path: "/poetry",
    name: "poetry",
    component: () => import("../views/PoetryView.vue"),
  },
  {
    path: "/poetry/:id",
    name: "PoetryDetails",
    component: () => import("../views/PoetryDetailsView.vue"),
    props: true,
  },
  {
    path: "/music",
    name: "music",
    component: () => import("../views/MusicView.vue"),
  },
  {
    path: "/404",
    name: "NotFoundPage",
    component: () => import("../views/NotFoundView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];
