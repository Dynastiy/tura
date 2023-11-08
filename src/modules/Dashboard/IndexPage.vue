<template>
  <div>
    <div class="tw-flex tw-space-x-3 align-items-center">
      <span
        class="user-icon tw-h-[40px] tw-bg-gray4 tw-w-[40px] tw-rounded-[50%] tw-flex align-items-center tw-justify-center"
      >
        <i-icon icon="gridicons:user" width="30px" />
      </span>
      <div>
        <h5 class="tw-mb-0 tw-font-bold tw-text-md">Welcome</h5>
        <span class="tw-text-sm">John Doe</span>
      </div>
    </div>

    <!-- Wallets  -->
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <div
          class="tw-flex lg:tw-flex-row md:tw-flex-row tw-flex-col tw-gap-3 tw-mt-4"
        >
          <div
            class="md:tw-w-3/5 lg:tw-w-3/5 tw-py-3 tw-rounded-lg tw-w-full tw-bg-light tw-rounded-lg tw-p-4"
          >
            <b-skeleton width="85%"></b-skeleton>
            <b-skeleton width="55%"></b-skeleton>
            <b-skeleton width="70%"></b-skeleton>
          </div>
          <div class="tw-w-full tw-flex tw-gap-3 ">
            <div
            class="tw-w-full tw-bg-light tw-rounded-lg tw-p-4"
            v-for="item in 3"
            :key="item"
          >
            <b-skeleton width="85%"></b-skeleton>
            <b-skeleton width="55%"></b-skeleton>
            <b-skeleton width="70%"></b-skeleton>
          </div>
          </div>
        </div>
      </template>

      <div
        class="tw-flex lg:tw-flex-row md:tw-flex-row tw-flex-col tw-gap-3 tw-mt-4"
      >
        <div
          class="tw-px-4 md:tw-w-3/5 lg:tw-w-3/5 tw-py-3 tw-rounded-lg wallet tw-w-full"
        >
          <div class="tw-flex tw-justify-between tw-items-center">
            <div>
              <h6
                class="tw-text-[11px] tw-font-normal tw-uppercase tw-text-white"
              >
                staking interest
              </h6>
              <span class="tw-flex align-items-center tw-space-x-1">
                <h4 class="tw-font-bold tw-text-white tw-text-[25px] tw-mb-0">
                  {{
                    viewAmount
                      ? wallet.wallet_balance_raw + " " + wallet.wallet_symbol
                      : "****"
                  }}
                </h4>
                <span role="button" @click="viewAmount = !viewAmount">
                  <i-icon
                    :icon="viewAmount ? 'tabler:eye' : 'gridicons:not-visible'"
                    class="form-icon tw-text-white"
                    width="22px"
                  />
                </span>
              </span>
            </div>
            <div>
              <img src="@/assets/img/wallet.svg" width="100" alt="" />
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-flex tw-gap-3">
          <div
            v-for="(item, idx) in balances"
            :key="idx"
            class="tw-px-4 tw-py-3 tw-rounded-lg other-wallets tw-w-full"
          >
            <div class="tw-flex tw-flex-col tw-justify-center tw-h-full">
              <h6
                class="tw-text-[10px] tw-font-normal tw-uppercase tw-text-white"
              >
                {{ item.wallet_name.slice(5) }}
              </h6>
              <span class="tw-flex align-items-center tw-space-x-1">
                <h4
                  class="tw-font-semibold tw-text-white tw-text-[25px] tw-mb-0"
                >
                  {{ item.wallet_balance_raw | formatMoney }}
                </h4>
                <!-- <span class="tw-text-white tw-">
                {{ item.wallet_symbol }}
              </span> -->
              </span>
            </div>
          </div>
        </div>
      </div>
    </b-skeleton-wrapper>
    <!-- Wallet Actions  -->
    <hr class="tw-my-3" />
    <h6 class="tw-mb-3 tw-text-sm">Quick Actions</h6>
    <div
      class="tw-flex tw-gap-8 lg:tw-justify-start md:tw-justify-start tw-justify-between"
    >
      <span
        v-for="(item, idx) in actions"
        :key="idx"
        role="button"
        class="tw-flex tw-justify-center tw-flex-col"
        @click="$router.push(item.href)"
      >
        <span
          class="tw-flex tw-items-center tw-bg-white tw-shadow-lg tw-p-4 tw-w-fit tw-rounded-full"
        >
          <i-icon :icon="item.icon" class="tw-text-primary tw-text-xl" />
        </span>
        <span class="tw-text-xs tw-mt-2 tw-font-semibold tw-capitalize">{{
          item.title
        }}</span>
      </span>
    </div>
    <hr class="tw-my-3" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      wallet: {},
      viewAmount: true,
      actions: [
        {
          title: "deposit",
          icon: "teenyicons:send-up-solid",
          href: "/deposit",
        },
        {
          title: "withdraw",
          icon: "teenyicons:send-down-solid",
          href: "/withdraw",
        },
        {
          title: "staking",
          icon: "eva:lock-outline",
          href: "/staking",
        },
        {
          title: "swap",
          icon: "mi:repeat",
          href: "/swap",
        },
      ],
      balances: [],
      loading: false,
    };
  },

  methods: {
    getBalances() {
      this.loading = true;
      this.appDomain
        .getWallets(this.user.user_id, "usdt")
        .then((res) => {
          console.log(res);
          this.wallet = res.data[0];
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    getStakingBalances() {
      this.appDomain.getWallets(this.user.user_id, "usdt_interest,usdt_locked,usdt_referral_bonus").then((res) => {
        console.log(res);
        this.balances = res.data;
      });
    },
  },

  beforeMount() {
    this.getBalances();
    this.getStakingBalances();
  },

  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
  },
};
</script>

<style>
.wallet {
  background: url("@/assets/img/walletbg.jpg");
  background-color: var(--primary-dark);
  background-blend-mode: overlay;
}

.other-wallets {
  /* background: url("@/assets/img/walletbg.jpg"); */
  background-color: var(--primary-dark);
  background-blend-mode: overlay;
}
</style>
