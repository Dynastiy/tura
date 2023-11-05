const SignIn = () => import("@/modules/Auth/SignIn.vue");
const SignUp = () => import("@/modules/Auth/SignUp.vue");


const routes = [
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn,
    meta: {
      layout: "AppAuthLayout",
      parent: 'sign-in',
      header: "sign-in"
    },
  },

  {
    path: "/sign-up",
    name: "dashboard",
    component: SignUp,
    meta: {
      layout: "AppAuthLayout",
      parent: 'sign-up',
      header: "sign-up"
    },
  },
];


export default routes;
