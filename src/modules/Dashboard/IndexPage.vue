<template>
  <div>
    <!-- <div class="">
     <div class="tw-flex tw-gap-2">
      <span
        class="user-icon tw-h-[60px] tw-bg-gray4 tw-w-[60px] tw-rounded-[50%] tw-flex align-items-center tw-justify-center"
      >
        <i-icon icon="gridicons:user" width="80px" />
      </span>
      <h5 class="tw-mb-0 tw-font-bold tw-text-md tw-capitalize">
        {{ user.username }}
      </h5>
     </div>
      <span class="tw-text-xs">{{ user.user_email }}</span>
    </div> -->
    <!-- Wallets  -->
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <div class="tw-flex lg:tw-flex-row md:tw-flex-row tw-flex-col tw-gap-3">
          <div
            class="md:tw-w-3/5 lg:tw-w-3/5 tw-py-3 tw-rounded-lg tw-w-full tw-bg-light tw-rounded-lg tw-p-4"
          >
            <b-skeleton width="85%"></b-skeleton>
            <b-skeleton width="55%"></b-skeleton>
            <b-skeleton width="70%"></b-skeleton>
          </div>
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
          </div>
        </div>
      </template>

      <div class="tw-flex lg:tw-flex-row md:tw-flex-row tw-flex-col tw-gap-3">
        <div
          class="tw-px-4 md:tw-w-3/5 lg:tw-w-3/5 tw-py-3 tw-rounded-lg wallet tw-w-full"
        >
          <div class="tw-flex tw-justify-between tw-items-center">
            <div>
              <div class="tw-mb-2">
                <h6
                  class="tw-text-[12px] tw-mb-0 tw-font-semibold tw-uppercase tw-text-white"
                >
                  ROI Balance
                </h6>
                <span
                  class="tw-text-xs tw-text-gray-300 tw-block tw-text-[9.5px]"
                  >*This is updated daily</span
                >
              </div>
              <span class="tw-flex align-items-center tw-space-x-1">
                <h4 class="tw-font-bold tw-text-white tw-text-[25px] tw-mb-0">
                  {{
                    viewAmount ? wallet.wallet_balance_raw + " USDT" : "****"
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
            <!-- <div>
              <img src="@/assets/img/wallet.svg" width="100" alt="" />
            </div> -->
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
                class="tw-text-[12px] tw-font-semibold tw-uppercase tw-text-white"
              >
                {{ changeName(item.wallet_id) }}
              </h6>
              <span class="tw-flex align-items-center tw-space-x-1">
                <h4
                  class="tw-font-semibold tw-text-white tw-text-[25px] tw-mb-0"
                >
                  {{ item.wallet_balance_raw }}
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
        @click="command(item)"
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

    <div>
      <h6 class="tw-mb-3 tw-text-sm">Other Services</h6>
      <div class="tw-flex tw-items-start tw-gap-1">
        <button class="primary-btn">Apply for loan</button>
        <span
          class="tw-bg-red-100 tw-font-semibold tw-px-3 tw-py-1 tw-text-red-600 tw-rounded-md tw-text-xs tw-block tw-w-fit"
        >
          coming soon
        </span>
      </div>
    </div>

    <!-- Download App -->
    <div class="tw-mt-4 tw-bg-white tw-p-6">
      <h5 class="tw-font-bold tw-text-center">Download Our Android App</h5>
      <hr class="tw-my-2">
      <div class="tw-flex lg:tw-flex-row md:tw-flex-row tw-flex-col tw-justify-center tw-gap-4 tw-items-center">
        <button class="primary-btn">
          <a href="https://turaai.com/app.apk" target="_blank" class="tw-text-white tw-no-underline">
            Click to Download
          </a>
        </button>
        <h4 class="tw-font-bold">OR</h4>
        <div class="tw-text-center">
          <v-qr
            text="https://turaai.com/app.apk"
            class="tw-bg-gray4 tw-border tw-border-primary tw-rounded-xl"
            :width="140"
          />
          <span
            class="tw-bg-primary tw-mx-auto tw-block tw-px-3 tw-rounded-[4px] tw-w-max tw-py-1 tw-text-xs tw-text-white"
            >Scan code to download</span
          >
        </div>
        
      </div>
    </div>

    <!-- Wallet Actions Modals  -->
    <!-- Deposit Funds -->
    <deposit-funds v-if="action === 'deposit'" @close="closeModal" />

    <!-- Withdraw Funds  -->
    <withdraw-funds v-if="action === 'withdraw'" @close="closeModal" />

    <!-- Swap Currency -->
    <swap-funds v-if="action === 'swap'" @close="closeModal" />
  </div>
</template>

<script>
// import { pick } from "lodash";
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
      actions: [
        {
          title: "deposit",
          icon: "teenyicons:send-up-solid",
          href: "deposit",
          link: false,
        },
        {
          title: "swap",
          icon: "mi:repeat",
          href: "swap",
          link: false,
        },
        {
          title: "invest",
          icon: "eva:lock-outline",
          href: "/invest",
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
      balances: [],
      loading: false,
      action: null,
      emailAddress: "",
    };
  },

  methods: {
    getBalances() {
      this.loading = true;
      this.appDomain
        .getWallets(this.user.user_id, "usdt_interest")
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

    changeName(value) {
      if (value === "usdt") {
        return "main balance";
      }
      if (value === "usdt_locked") {
        return "locked capital";
      }
      if (value === "usdt_referral_bonus") {
        return "referral bonus";
      }
      return;
    },

    getStakingBalances() {
      this.appDomain
        .getWallets(this.user.user_id, "usdt,usdt_locked,usdt_referral_bonus")
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
      this.getBalances();
      this.getStakingBalances();
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

  watch: {
    "user.user_email": {
      handler(val) {
        let emailInfo = val.split("@");
        let mainEmail = emailInfo[0].split("");
        let spacing = mainEmail.length;
        let hideInfo = mainEmail.fill("*", "2", spacing);
        this.emailAddress = `${hideInfo.join("")}@${emailInfo[1]}`;
      },
      immediate: true,
    },
  },
};
</script>

<style>
.wallet {
  background: url("@/assets/img/walletbg.jpg");
  background-color: var(--primary-dark);
  background-blend-mode: overlay;
  background-size: 10%;
}

.other-wallets {
  /* background: url("@/assets/img/walletbg.jpg"); */
  background-color: var(--primary-dark);
  background-blend-mode: overlay;
}
</style>
