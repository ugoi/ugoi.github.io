// routesConfig.ts

export const routes = [
  {
    name: "Portfolio",
    path: "/portfolio",
    component: "Portfolio", // You might not need this for the AppBar, but it's helpful for dynamic route rendering
  },
  {
    name: "Contact",
    path: "/contact",
    component: "Contact",
  },
  {
    name: "Chat",
    path: "/chat",
    component: "Chat",
  },
];

export default routes;
