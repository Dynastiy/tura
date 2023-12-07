<template>
  <modal-wrapper @close="$emit('close')">
    <template #header>
      <h5 class="tw-mb-0 tw-text-white tw-font-semibold">Swap</h5>
    </template>
    <template #body>
      <div class="">
        <div class="">
          <span class="tw-block tw-my-4" v-if="loading"
            ><i-icon icon="eos-icons:bubble-loading" width="20px"
          /></span>
          <div v-else>
            <div class="tw-my-5 tw-flex tw-gap-2 tw-justify-center">
              <span
                class="tw-bg-gray-100 tw-text-light tw-px-4 tw-py-1 tw-text-xs tw-font-semibold tw-block lg:tw-w-max md:tw-w-max tw-w-full tw-text-center tw-rounded"
                role="button"
                v-for="item in percentages"
                :key="item"
                @click="getAmountByPercentage(item)"
                >{{ item + "%" }}</span
              >
            </div>
            <div class="swap-content tw-mb-4 tw-bg-white tw-p-6 tw-rounded-lg">
              <div class="">
                <label for="">From</label>
                <div class="tw-grid tw-grid-cols-4 tw-gap-3">
                  <div class="">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        <span class="tw-flex tw-items-center tw-gap-2 tw-text-sm">
                          <!-- <img
                          class="tw-w-[20px] tw-h-[20px]"
                          :src="icon(selected.wallet_id)"
                          alt=""
                        /> -->
                          <span class="tw-text-xs">
                            {{ selected.wallet_name }}
                          </span>
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="item in wallets"
                          :key="item.id"
                        >
                          <span
                            class="tw-flex tw-space-x-2 tw-items-center tw-w-full"
                            @click="selectWallet(item)"
                          >
                            <!-- <img
                            class="tw-w-[20px] tw-h-[20px]"
                            :src="icon(item.wallet_id)"
                            alt=""
                          /> -->
                            <span>
                              {{ item.wallet_name }}
                            </span>
                          </span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="tw-col-span-3">
                    <div class="tw-flex tw-justify-between tw-items-center">
                      <input
                        type="tel"
                        placeholder="Enter Amount"
                        class="tw-bg-transparent input-amount tw-text-center"
                        v-model="amount"
                      />
                      <span
                        role="button"
                        @click="getAmountByPercentage('100')"
                        class="tw-bg-primary tw-text-white tw-px-3 tw-py-2 tw-text-xs tw-font-semibold tw-block tw-w-max tw-text-center tw-rounded"
                      >
                        max
                      </span>
                    </div>
                    <span
                      class="tw-block tw-text-right tw-text-xs tw-font-semibold tw-text-light"
                    >
                      Balance:
                      {{
                        selected.wallet_symbol +
                        " " +
                        selected.wallet_balance_raw
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="tw-relative">
                <hr class="tw-my-3" />
                <span
                  class="tw-absolute -tw-top-4 tw-right-4 tw-flex tw-h-[30px] tw-w-[30px] tw-text-white tw-bg-primary tw-items-center tw-justify-center tw-rounded-lg"
                >
                  <i-icon icon="iconamoon:playlist-repeat-list-bold" />
                </span>
              </div>

              <div>
                <label for="">To</label>
                <div class="tw-grid tw-grid-cols-4 tw-gap-2">
                  <div class="">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        <span class="tw-flex tw-items-center tw-space-x-2">
                          <!-- <img
                          class="tw-w-[20px] tw-h-[20px]"
                          :src="icon(selected2.wallet_id)"
                          alt=""
                        /> -->
                          <span class="tw-text-xs">
                            {{ wallet.wallet_name }}
                          </span>
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                        >
                          <span
                            class="tw-flex tw-space-x-2 tw-items-center tw-w-full"
                            @click="selectWallet2(item)"
                          >
                            <!-- <img
                            class="tw-w-[20px] tw-h-[20px]"
                            :src="icon(item.wallet_id)"
                            alt=""
                          /> -->
                            <span>
                              {{ wallet.wallet_name }}
                            </span>
                          </span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="tw-col-span-3">
                    <input
                      type="tel"
                      readonly
                      v-model="swapAmount"
                      placeholder="Amount"
                      class="tw-bg-transparent input-amount tw-text-center"
                    />
                    <span
                      class="tw-block tw-mt-3 tw-text-xs tw-text-right tw-font-semibold tw-text-light"
                    >
                      Balance:
                      {{
                        wallet.wallet_symbol +
                        " " +
                        wallet.wallet_balance_raw
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="swap-details tw-mb-4 tw-bg-gray6 tw-p-6 tw-rounded-lg"
          v-if="swapConfirmed"
        >
          <div class="tw-flex tw-justify-between tw-items-center tw-mb-3">
            <span>Price</span>
            <span>Price</span>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center">
            <span>Fee</span>
            <span>$2</span>
          </div>
        </div>

        <div class="tw-text-center">
          <button
            @click="swapAction"
            class="outline-btn w-100"
            :class="busy ? 'bg-secondary' : ''"
            :disabled="busy"
          >
            <span v-if="busy"
              ><i-icon
                icon="eos-icons:bubble-loading"
                width="20px"
                class="text-white"
              />
            </span>
            <span v-else>{{ "confirm swap" }}</span>
          </button>
        </div>
      </div>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "../ModalWrapper.vue";
export default {
  components: {
    ModalWrapper,
  },
  data() {
    return {
      amount: "",
      wallets: [],
      wallet: {},
      isSelected: false,
      isSelected2: false,
      selectedWallet: {},
      selectedWallet2: {},
      loading: false,
      requestId: null,
      busy: false,
      swapConfirmed: false,
      rate: "",
      swapAmount: "",
      percentages: ["25", "50", "75", "100"],
    };
  },

  methods: {
    // getBalances() {
    //   this.loading = true;
    //   this.$request
    //     .get(
    //       `user-wallet-balance/multi?wallet_id=rngn,raaf,ngn&formatted=yes&user_id=${this.user.user_id}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       this.wallets = res.data.data;
    //       this.swapRate();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },

    getBalances() {
      this.loading = true;
      this.appDomain
        .getWallets(
          this.user.user_id,
          "usdt,usdt_interest,usdt_referral_bonus"
        )
        .then((res) => {
          console.log(res);
          let resData = res.data;
          this.wallets = res.data.filter((item) => item.wallet_id !== "usdt");
          let resPayload = resData.find((item) => item.wallet_id === "usdt");
          this.wallet = resPayload;
          this.loading = false;
          this.swapRate();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    swapAction() {
      this.swap();
    },

    selectWallet(e) {
      this.selectedWallet = e;
      this.isSelected = true;
      this.swapRate();
    },

    selectWallet2(e) {
      this.selectedWallet2 = e;
      this.isSelected2 = true;
      this.swapRate();
    },

    swapRate() {
      var data = {
        from: this.selected.wallet_id,
        to: this.selected2.wallet_id,
      };
      this.middleware.getStakeRate(data)
        .then((res) => {
          console.log(res, "ommo");
          let resPayload = res.data;
          this.rate = resPayload.rate;
          this.swapAmount = this.rate * this.amount;
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAmountByPercentage(value) {
      this.amount = this.selected.wallet_balance_raw * (value / 100);
    },

    swap() {
      this.busy = true;
      var formData = {
        user_id: this.user.user_id,
        from: this.selected.wallet_id,
        to: this.selected2.wallet_id,
        amount_to_swap: this.amount,
        request_id: this.requestId,
      };
      this.middleware.swap(formData)
      // this.$axios
      //   .post(`${process.env.VUE_APP_MIDDLEWARE_API_URL}swap`, formData)
        .then((res) => {
          console.log(res);
          this.busy = false;
          var responsePayload = res;
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
          this.busy = false;
          var responsePayload = err.data;
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
  },

  watch: {
    amount: {
      handler(val) {
        this.swapAmount = this.rate * val;
      },
    },
  },

  beforeMount() {
    this.getBalances();
    var result = Math.round(+new Date() / 1000);
    this.requestId = `${result}`;
  },

  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },

    selected() {
      var selectedValue = {};
      if (!this.isSelected) {
        selectedValue = this.wallets[0];
      } else {
        selectedValue = this.selectedWallet;
      }
      return selectedValue;
    },

    selected2() {
      var selectedValue = {};
      selectedValue = this.wallet;
      return selectedValue;
    },
  },
};
</script>

<style scoepd>
.input-amount {
  border: 0 !important;
}
</style>
