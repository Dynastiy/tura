const Dashboard = () => import("@/modules/Dashboard/IndexPage.vue");
const Referral = () => import("@/modules/Dashboard/ReferralPage.vue")
const TxnHistory = () => import("@/modules/Dashboard/TxnHistory.vue")

const UserProfile = () => import("@/modules/Dashboard/User/IndexPage.vue")
const PersonalInformation = () => import("@/modules/Dashboard/User/PersonalInformation.vue")
const Security = () => import("@/modules/Dashboard/User/SecurityPage.vue")


const HelpAndSupport = () => import("@/modules/Dashboard/HelpAndSupport.vue")
const Staking = () => import("@/modules/Dashboard/StakingPage.vue")
const Swap = () => import("@/modules/Dashboard/SwapPage.vue")
const Deposit = () => import("@/modules/Dashboard/DepositPage.vue")
const Withdraw = () => import("@/modules/Dashboard/WithdrawalPage.vue")


const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: {
      layout: "DashboardLayout",
      parent: 'dashboard',
      header: "dashboard",
      requiresAuth: true
    },
  },

  {
    path: "/referral",
    name: "referral",
    component: Referral,
    meta: {
      layout: "DashboardLayout",
      parent: 'referral',
      header: "referral",
      requiresAuth: true
    },
  },

  {
    path: "/transaction-history",
    name: "transaction-history",
    component: TxnHistory,
    meta: {
      layout: "DashboardLayout",
      parent: 'transaction-history',
      header: "transaction-history",
      requiresAuth: true
    },
  },

  {
    path: "/user-profile",
    name: "user-profile",
    component: UserProfile, 
    redirect: '/personal-information',
    meta: {
      layout: "DashboardLayout",
      parent: 'personal-information',
      header: "personal-information",
      requiresAuth: true
    },
    children: [
      {
        path: "/personal-information",
        name: "personal-information",
        component: PersonalInformation,
        meta: {
          layout: "DashboardLayout",
          parent: 'personal-information',
          header: "personal-information",
          subParent: 'personal-information',
          requiresAuth: true
        },
      },
      {
        path: "/personal-information/security",
        name: "security",
        component: Security,
        meta: {
          layout: "DashboardLayout",
          parent: 'personal-information',
          header: "security",
          subParent: 'security',
          requiresAuth: true
        },
      },
    ]
  },

  {
    path: "/help-and-support",
    name: "help-and-support",
    component: HelpAndSupport,
    meta: {
      layout: "DashboardLayout",
      parent: 'help-and-support',
      header: "help-and-support",
      requiresAuth: true
    },
  },

  {
    path: "/swap",
    name: "swap",
    component: Swap,
    meta: {
      layout: "DashboardLayout",
      parent: 'dashboard',
      header: "swap",
      requiresAuth: true
    },
  },

  {
    path: "/deposit",
    name: "deposit",
    component: Deposit,
    meta: {
      layout: "DashboardLayout",
      parent: 'dashboard',
      header: "deposit",
      requiresAuth: true
    },
  },

  {
    path: "/withdraw",
    name: "withdraw",
    component: Withdraw,
    meta: {
      layout: "DashboardLayout",
      parent: 'dashboard',
      header: "withdraw",
      requiresAuth: true
    },
  },

  {
    path: "/invest",
    name: "invest",
    component: Staking,
    meta: {
      layout: "DashboardLayout",
      parent: 'dashboard',
      header: "invest",
      requiresAuth: true
    },
  },
  
];

// function checkLoggedIn(to, from, next) {
//   var isAuthenticated = false;
//   if (store.getters["auth/isLoggedIn"]) isAuthenticated = true;
//   else isAuthenticated = false;
//   if (!isAuthenticated) {
//     next();
//   } else {
//     next({
//       query: { redirectFrom: to.fullPath },
//     });
//   }
// }

export default routes;
