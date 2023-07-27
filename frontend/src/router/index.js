import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Category from "../views/CategoryView.vue";
import Tags from "../views/TagView.vue";
import Sort from "../views/SortView.vue";
import NotFound from "../views/NotFound.vue";
import Admin from "../views/AdminView.vue";
import Page from "../views/PageView.vue";
import SearchResults from "../views/SearchResults.vue";
import SuggestLink from "../views/SuggestLink.vue";
import UserView from "../views/UserView.vue";
import Dateline from "../views/DatelineView.vue";
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/admin/:view",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/page/:name",
    name: "Page",
    component: Page,
  },
  {
    path: "/dateline/:place",
    name: "Dateline",
    component: Dateline,
  },
  {
    path: "/cat/:name",
    name: "Category",
    component: Category,
  },
  {
    path: "/tag/:name",
    name: "Tags",
    component: Tags,
  },
  {
    path: "/user/:name",
    name: "UserView",
    component: UserView,
  },
  {
    path: "/sort/:view",
    name: "Sort",
    component: Sort,
  },
  {
    path: "/search/:searchTerm",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/suggest",
    name: "SuggestLink",
    component: SuggestLink,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

export default router;
