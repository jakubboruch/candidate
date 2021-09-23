import Vue from "vue";
import VueRouter from "vue-router";
import ProductList from "../views/ProductList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Product List",
    component: ProductList,
  },
  {
    path: "/contact-form",
    name: "Contact Form",
    component: () => import("../views/ContactForm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
