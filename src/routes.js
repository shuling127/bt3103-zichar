import PageContent from "./components/PageContent.vue";
import Orders from "./components/Orders";
import Modify from "./components/Modify";
import Dashboard from "./components/Dashboard.vue";

export default [
  { path: "/", component: PageContent },
  { path: "/orders", component: Orders, name: "orders" },
  {
    path: "/modify/:modify_id",
    component: Modify,
    props: true,
    name: "modify",
  },
  { path: "/dashboard", component: Dashboard, name: "dashboard" },
];
