<template>
  <div class="">
    <app-header :menu="menu" class="md:tw-sticky tw-top-0 sm:tw-z-0"/>
    <div class="lg:tw-block md:tw-block tw-hidden">
      <app-drawer :menu="menu"/>
    </div>
    <div id="main" class="lg:tw-ml-[250px] md:tw-ml-[250px]">
      <div class="tw-py-6 tw-px-5" >
        <div  v-if="routeParent !== 'dashboard'" class="tw-mb-8">
          <div class="tw-flex tw-justify-between tw-align-items-center">
          <span role="button" @click="$router.go(-1)" >
            <i-icon icon="ic:twotone-arrow-back" width="20px" />
          </span>
          <div class="tw-w-full tw-text-center">
            <h5 class="tw-capitalize tw-font-semibold tw-text-xl tw-font-semibold">{{ routeParent.split('-').join(" ") }}</h5>
          </div>
        </div>
        </div>
       
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AppDrawer from "@/components/Navigation/AppDrawer.vue";
import AppHeader from "@/components/Navigation/AppHeader.vue";
export default {
  components: { AppDrawer, AppHeader },
  name: "DashboardLayout",
  data(){
    return {
      menu: [
        {
          id: 1,
          title: "Dashboard",
          sub_title: "Overview of your SamzugaGPT",
          icon: "ic:outline-dashboard",
          url: "/",
          header: false,
          parent: "dashboard",
        },

        // {
        //   id: 2,
        //   title: "Deposit",
        //   sub_title: "Fund your SamzugaGPT",
        //   icon: "streamline:money-atm-card-2-deposit-money-payment-finance-atm-withdraw",
        //   url: "/deposit",
        //   hasChildren: false,
        //   parent: "deposit",
        // },

        // {
        //   id: 3,
        //   title: "Staking",
        //   sub_title: "Earn rewards by staking funds",
        //   icon: "bx:lock",
        //   url: "/staking",
        //   hasChildren: false,
        //   parent: "staking",
        // },

        // {
        //   id: 4,
        //   title: "Withdrawal",
        //   sub_title: "Send out your staking rewards",
        //   icon: "uil:money-withdrawal",
        //   url: "/withdrawal",
        //   hasChildren: false,
        //   parent: "withdrawal",
        // },

        // {
        //   id: 5,
        //   title: "Swap",
        //   sub_title: "Swap your currencies",
        //   icon: "mi:repeat",
        //   url: "/swap",
        //   hasChildren: false,
        //   parent: "swap",
        // },

        {
          id: 8,
          title: "Refer and Earn",
          sub_title: "Earn amazing bonuses",
          icon: "ri:share-line",
          url: "/referral",
          hasChildren: false,
          parent: "referral",
        },

        {
          id: 7,
          title: "Transaction History",
          sub_title: "See transactions you've made",
          icon: "ep:list",
          url: "/transaction-history",
          hasChildren: false,
          parent: "transaction-history",
        },

        {
          id: 6,
          title: "Personal Information",
          sub_title: "Your profile settings",
          icon: "solar:user-linear",
          url: "/personal-information",
          hasChildren: false,
          parent: "personal-information",
        },

        {
          id: 9,
          title: "Help & Support",
          sub_title: "Make Enquiries/resolve issues",
          icon: "charm:help",
          url: "/help-and-support",
          hasChildren: false,
          parent: "help-and-support",
        },

        {
          id: 10,
          title: "Sign Out",
          sub_title: "Sign Out",
          icon: "fe:logout",
          url: "/login",
          hasChildren: false,
          parent: "sign-out",
        },
      ],
    }
  },
  beforeMount(){
    this.$store.dispatch('auth/generateWalletAddress', this.user.user_id)
  },
  computed: {
    routeParent() {
      return this.$route.meta.header;
    },
    user() {
      return this.$store.getters["auth/getUser"];
    },
  },
};
</script>

<style></style>
