const SignIn = () => import("@/modules/Auth/SignIn.vue");
const SignUp = () => import("@/modules/Auth/SignUp.vue");
const VerifyEmail = () => import("@/modules/Auth/VerifyEmail.vue");


const routes = [
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn,
    meta: {
      layout: "AppAuthLayout",
      parent: 'sign-in',
      header: "sign-in",
      requiresAuth: false
    },
  },

  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
    meta: {
      layout: "AppAuthLayout",
      parent: 'sign-up',
      header: "sign-up",
      requiresAuth: false
    },
  },

  {
    path: "/verify-email",
    name: "verify-email",
    component: VerifyEmail,
    meta: {
      layout: "AppAuthLayout",
      parent: 'verify-email',
      header: "verify-email",
      requiresAuth: false
    },
  },
];


export default routes;
