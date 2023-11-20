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
<<<<<<< HEAD
          <div class="tw-w-full tw-flex tw-gap-3">
            <div
              class="tw-w-full tw-bg-light tw-rounded-lg tw-p-4"
              v-for="item in 3"
              :key="item"
            >
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
            </div>
=======
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
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
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
<<<<<<< HEAD

=======
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
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
<<<<<<< HEAD
        @click="command(item)"
=======
        @click="$router.push(item.href)"
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
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
<<<<<<< HEAD

    <!-- Wallet Actions Modals  -->

    <!-- Deposit Funds -->
    <deposit-funds v-if="action === 'deposit'" @close="closeModal" />

    <!-- Withdraw Funds  -->
    <withdraw-funds v-if="action === 'withdraw'" @close="closeModal" />

    <!-- Swap Currency -->
    <swap-funds v-if="action === 'swap'" @close="closeModal" />
=======
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
  </div>
</template>

<script>
<<<<<<< HEAD
import DepositFunds from "@/components/Dashboard/DepositFunds.vue";
import WithdrawFunds from "@/components/Dashboard/WithdrawFunds.vue";
import SwapFunds from "@/components/Dashboard/SwapFunds.vue";
export default {
  components: { DepositFunds, WithdrawFunds, SwapFunds },
  data() {
    return {
      // wallet: {
      //       "wallet_id": "raaf",
      //       "wallet_balance_raw": 0,
      //       "wallet_balance_formatted": "RAAF0.000000000",
      //       "wallet_name": "RAAF",
      //       "wallet_symbol": "RAAF",
      //       "wallet_symbol_position": "left",
      //       "wallet_decimal": "9",
      //       "wallet_note": "RAAF",
      //       "wallet_type": "crypto"

      // },
      viewAmount: true,
      dialogVisible: true,
=======
export default {
  data() {
    return {
      wallet: {},
      viewAmount: true,
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
      actions: [
        {
          title: "deposit",
          icon: "teenyicons:send-up-solid",
<<<<<<< HEAD
          href: "deposit",
          link: false,
        },
        {
          title: "swap",
          icon: "mi:repeat",
          href: "swap",
          link: false,
=======
          href: "/deposit",
        },
        {
          title: "withdraw",
          icon: "teenyicons:send-down-solid",
          href: "/withdraw",
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
        },
        {
          title: "staking",
          icon: "eva:lock-outline",
          href: "/staking",
<<<<<<< HEAD
          link: true,
        },
        {
          title: "withdraw",
          icon: "teenyicons:send-down-solid",
          href: "withdraw",
          link: false,
        },
      ],
      wallet: {},
      // balances: [
      // {
      //       "wallet_id": "raaf",
      //       "wallet_balance_raw": 0,
      //       "wallet_balance_formatted": "RAAF0.000000000",
      //       "wallet_name": "RAAF",
      //       "wallet_symbol": "RAAF",
      //       "wallet_symbol_position": "left",
      //       "wallet_decimal": "9",
      //       "wallet_note": "RAAF",
      //       "wallet_type": "crypto"
      //   },
      //   {
      //       "wallet_id": "ngn",
      //       "wallet_balance_raw": 0,
      //       "wallet_balance_formatted": "\u20a60.00",
      //       "wallet_name": "ngn",
      //       "wallet_symbol": "\u20a6",
      //       "wallet_symbol_position": "left",
      //       "wallet_decimal": "2",
      //       "wallet_note": "Nigerian Naira",
      //       "wallet_type": "fiat"
      //   },
      //   {
      //       "wallet_id": "raaf",
      //       "wallet_balance_raw": 0,
      //       "wallet_balance_formatted": "RAAF0.000000000",
      //       "wallet_name": "RAAF",
      //       "wallet_symbol": "RAAF",
      //       "wallet_symbol_position": "left",
      //       "wallet_decimal": "9",
      //       "wallet_note": "RAAF",
      //       "wallet_type": "crypto"
      //   },
      // ],
      balances: [],
      loading: false,
      action: null,
=======
        },
        {
          title: "swap",
          icon: "mi:repeat",
          href: "/swap",
        },
      ],
      balances: [],
      loading: false,
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
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
<<<<<<< HEAD
      this.appDomain
        .getWallets(
          this.user.user_id,
          "usdt_interest,usdt_locked,usdt_referral_bonus"
        )
        .then((res) => {
          console.log(res);
          this.balances = res.data;
        });
    },

    command(value) {
      if (value.link) {
        this.$router.push(value.href);
      } else {
        this.action = value.href;
      }
    },

    closeModal() {
      this.action = null;
=======
      this.appDomain.getWallets(this.user.user_id, "usdt_interest,usdt_locked,usdt_referral_bonus").then((res) => {
        console.log(res);
        this.balances = res.data;
      });
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
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
<<<<<<< HEAD
  background-size: 10%;
=======
>>>>>>> a0fe648703822a2e725b0be9b040f61d45c4abd2
}

.other-wallets {
  /* background: url("@/assets/img/walletbg.jpg"); */
  background-color: var(--primary-dark);
  background-blend-mode: overlay;
}
</style>
