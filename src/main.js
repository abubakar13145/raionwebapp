import { createApp } from "vue/dist/vue.esm-bundler";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import ProductTree from "./pages/ProductTree.vue";
import Tree from "./pages/Tree.vue";
import "./assets/scss/app.scss";
import { LoadingPlugin } from "vue-loading-overlay";
import titleMixin from "./pages/includes/titleMixin";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import Vue3TouchEvents from "vue3-touch-events";

import "vue-loading-overlay/dist/css/index.css";

const routes = [
  {
    path: "/",
    component: Tree,
    name: "home",
    meta: {
      title: "Raion - Home",
    },
  },
  {
    path: "/product",
    component: Home,
    name: "product",
    meta: {
      title: "Raion - Tree",
    },
  },
  {
    path: "/productstree",
    component: ProductTree,
    name: "productstree",
    meta: {
      title: "Raion - Products Tree",
    },
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);

app.config.globalProperties.$hostname =
  process.env.NODE_ENV === "production" ? "https://raionapi20230407235334.azurewebsites.net/" : "https://localhost:7283";

app.use(router);
app.use(LoadingPlugin, {
  color: "#9fe7d8",
});
app.use(Vue3TouchEvents);

app.component("EasyDataTable", Vue3EasyDataTable);

app.mount("#app");
app.mixin(titleMixin);
import "bootstrap/dist/js/bootstrap.js";

window.bootstrap = require("bootstrap/dist/js/bootstrap.js");
