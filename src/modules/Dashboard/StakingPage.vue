<template>
    <div>
      <div class="tw-mt-4">
        
        <b-skeleton-wrapper :loading="busy">
          <template #loading>
            <div class="tw-flex tw-space-x-4 tw-mt-4">
              <div
                class="tw-w-full tw-bg-gray6 tw-rounded-lg tw-p-4"
                v-for="item in 3"
                :key="item"
              >
                <b-skeleton width="85%"></b-skeleton>
                <b-skeleton width="55%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
              </div>
            </div>
          </template>

        <div class="tw-bg-primary tw-p-4 lg:tw-w-6/12 md::tw-w-7/12 tw-w-full">
          <h6 class="tw-text-md tw-font-semibold tw-text-xs tw-uppercase tw-text-center tw-text-white">Staking Balances</h6>
          <div class="tw-flex tw-gap-4 tw-mt-4 tw-w-full">
            <div
              v-for="item in balances"
              :key="item.id"
              class=" tw-w-full first:tw-border-r first:tw-pr-4 tw-border-white"
            >
              <div
                class="lg:tw-flex md:tw-flex tw-justify-between tw-hidden tw-mb-3 "
              >
                <span class="tw-uppercase tw-text-[10px] tw-text-white">{{
                  item.wallet_name
                }}</span>
                <i-icon icon="cib:marketo" class="tw-text-white tw-text-sm" />
              </div>
              <h6
                v-text="item.wallet_id.split('_').join(' ')"
                class="tw-font-bold tw-uppercase tw-text-white lg:tw-text-left md:tw-text-left sm:tw-text-center tw-mb-0"
              ></h6>
              <h6
                v-text="item.wallet_balance_raw"
                class="tw-text-sm tw-text-white lg:tw-text-left md:tw-text-left sm:tw-text-center tw-mb-0"
              ></h6>
            </div>
          </div>
        </div>
        </b-skeleton-wrapper>
      </div>

      <div class="tw-bg-white tw-p-6 tw-rounded-lg tw-mt-4">
        <validation-observer v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(stake)">
            <validation-provider
              name="amount in usdt"
              rules="required|min_value:5"
              v-slot="{ errors }"
            >
              <div>
                <label for="">Enter Amount (in USDT)</label>
                <span
                  v-if="
                    main_wallet.wallet_balance_raw === 0 ||
                    main_wallet.wallet_balance_raw < 5
                  "
                  class="tw-block tw-text-right tw-text-xs tw-font-semibold tw-text-red-600"
                  >* Insuffient balance to stake in
                  {{ main_wallet.wallet_symbol }} wallet
                </span>
                <div class="input-field tw-px-2 tw-py-2 tw-mt-2">
                  <input
                    type="number"
                    v-model="amount"
                    placeholder="Enter Amount in usdt"
                  />
                  <span @click="getMax" role="button" class="primary-btn tw-py-2">
                    max
                  </span>
                </div>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>

            <div class="tw-text-center tw-mt-6">
              <button
                class="primary-btn w-100"
                :class="{
                  'bg-secondary':
                    loading || invalid || main_wallet.wallet_balance_raw < 5,
                }"
                :disabled="
                  loading || invalid || main_wallet.wallet_balance_raw < 5
                "
              >
                <span v-if="loading"
                  ><i-icon
                    icon="eos-icons:bubble-loading"
                    width="20px"
                    class="text-white"
                  />
                </span>
                <span v-else>stake</span>
              </button>
            </div>
          </form>
        </validation-observer>
      </div>

      <div class="tw-bg-white tw-mt-4 tw-p-6 tw-rounded-lg">
        <h5 class="tw-font-bold tw-text-center">HOW TO STAKE</h5>
        <div class="how-to-stake">
          <ul class="tw-flex tw-flex-col tw-gap-3 tw-p-0">
            <li>
              Deposit USDT or SZCB to your account using your address on the
              <router-link to="/deposit">deposit page</router-link>
            </li>
            <li>
              If you deposited USDT, you will need to
              <router-link to="/swap">swap</router-link> your USDT to SZCB first,
              if you deposited SZCB, you will not need to swap
            </li>
            <li>
              You can then stake your SZCB on this page by clicking the Stake
              Button
            </li>
            <li>
              You will be paid your staking interest & rewards to your
              <b>USDT Interest Wallet every 7 days</b>.
            </li>
            <li>
              You can <router-link to="/swap">swap</router-link> your USDT
              Interest & rewards to SZCB for restaking or USDT which you can then
              withdraw.
            </li>
          </ul>
        </div>
      </div>

      <!-- <modal-wrapper v-if="dialogVisible">
        <template #body>
          <span
            class="tw-text-red-600 tw-block tw-bg-red-100/50 tw-w-full tw-p-1 tw-mb-2 tw-text-center tw-rounded-sm tw-text-sm"
            v-if="error"
            >{{ error }}</span
          >
          <h3 class="tw-text-center tw-font-bold">Uhhhh!😔</h3>
          <h5 class="tw-text-center tw-text-red-600 tw-text-[16px]">
            You are not registered as community member
          </h5>
          <p class="tw-text-center tw-text-sm tw-font-semibold">
            To access staking & receive staking rewards, authorize a ONE TIME
            PAYMENT of <b>5 SZCB</b> for your community membership?
          </p>
          <div>
            <div v-if="balances.length > 0">
              <span class="tw-font-semibold tw-text-sm">BALANCE:</span>
              <span class="tw-font-bold tw-text-sm">{{
                balances[0].wallet_balance_raw + " SZCB"
              }}</span>
            </div>
            <span class="tw-text-[10px] tw-text-red-600 tw-font-semibold tw-block"
              >(Your payments will be authorized & charged from your SZCB
              Wallet)</span
            >
            <div class="tw-flex tw-items-center  tw-my-3">
              <router-link class="tw-text-[12px] tw-text-primary tw-font-semibold tw-underline tw-px-2 tw-py-1 tw-rounded-md" to="/deposit"
                >Make Deposit Now</router-link
              >
              <el-divider direction="vertical"></el-divider>
              <router-link to="/swap" class="tw-text-[12px] tw-text-primary tw-font-semibold tw-underline tw-px-2 tw-py-1 tw-rounded-md">Go to Swap</router-link>
            </div>
          </div>
          <div class="tw-flex tw-justify-center tw-gap-4 tw-mt-6">
            <button class="primary-btn tw-bg-green-600" @click="authorize">
              Yes, Authorize
            </button>
            <button class="primary-btn tw-bg-red-600" @click="cancel">
              Cancel
            </button>
          </div>
        </template>
      </modal-wrapper> -->
    </div>
  </template>

  <script>
//   import ModalWrapper from "../ModalWrapper.vue";
  export default {
    components: {
    //   ModalWrapper,
    },

    data() {
      return {
        currencies: ["BNB", "USDT", "SZCB"],
        duration: ["3 Months", "6 Months", "9 Months", "1 Year"],
        amount: null,
        loading: false,
        requestId: "",
        balances: [],
        busy: false,
        main_wallet: {},
        dialogVisible: null,
        error: null,
      };
    },

    methods: {
      stake() {
        this.loading = true;
        var formData = {
          user: this.user.user_id,
          amount: this.amount,
          request_id: this.requestId,
        };
        this.middleware.stake(formData)
          .then((res) => {
            console.log(res);
            this.loading = false;
            var responsePayload = res.data;
            this.$toast.open({
              message: `${responsePayload.message}`,
              type: "success",
              position: "top",
              // all of other options may go here
            });
            this.amount = null;
            this.getBalances();
            return res;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            var responsePayload = err.response.data;
            console.log(responsePayload);
            this.$toast.open({
              message: `${responsePayload.message}`,
              type: "error",
              position: "top",
              // all of other options may go here
            });
            return err;
          });
      },

      getBalances() {
      this.loading = true;
      this.appDomain
        .getWallets(this.user.user_id, "usdt, usdt_locked")
        .then((res) => {
          console.log(res);
          this.balances = res.data;
          this.loading = false;
          this.main_wallet = this.balances.find(
              (item) => item.wallet_id === "usdt"
            );
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

      authorize() {
        let payload = {
          user_id: this.user.user_id,
        };
        this.$request
          .post(
            `${process.env.VUE_APP_MIDDLEWARE_API_URL}community-registration`,
            payload
          )
          .then((res) => {
            this.dialogVisible = false;
            this.$store.dispatch("auth/setUserMeta", this.user.user_id)
            this.$swal.fire("Payment Success!", "Proceed to Stake", "success");
            return res;
          })
          .catch((err) => {
            this.error = err.data.message;
            console.log(err);
          });
      },

      cancel() {
        this.$router.go(-1);
      },

      getMax() {
        this.amount = Number(this.main_wallet.wallet_balance_raw);
        // alert("Hello Worlds")
      },
    },

    // watch: {
    //   amount(val) {
    //     this.amount = +val
    //   }
    // },

    mounted() {
      var result = Math.round(+new Date() / 1000);
      this.requestId = `staking_${result}`;

      this.getBalances();
    //   this.$store.dispatch("auth/getUserMeta", this.user.user_id)

    //   if (this.userMeta.registered_as_community_member === null) {
    //     this.dialogVisible = true;
    //   } else {
    //     this.dialogVisible = false;
    //   }
    },

    computed: {
      user() {
        return this.$store.getters["auth/getUser"];
      },

      userMeta() {
        return this.$store.getters["auth/getUserMeta"];
      },
    },
  };
  </script>

  <style>
  .how-to-stake ul {
    margin-left: 30px;
    margin-bottom: 0;
  }

  .how-to-stake ul li {
    list-style: decimal !important;
    font-size: 14px;
  }
  </style>
