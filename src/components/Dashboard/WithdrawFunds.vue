<template>
  <modal-wrapper @close="$emit('close')">
    <template #header>
      <h5 class="tw-mb-0 tw-text-white tw-font-semibold">Withdraw Funds</h5>
    </template>
    <template #body>
      <div v-if="busy">
        <i-icon icon="eos-icons:loading" class="tw-text-white tw-text-[50px]"/>
      </div>
      <div class="" v-else>
        <div class="tw-flex tw-flex tw-justify-end tw-mb-2">
          <h6 class="tw-text-white tw-bg-red-600 tw-w-fit tw-px-2 tw-py-1 tw-rounded-xl tw-text-xs">
            * Minimum Withdrawal: 5 TUSD
          </h6>
        </div>
        <validation-observer v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(withdraw)">
            <validation-provider
              name="Wallet"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="tw-mb-4">
                <v-select
                  v-model="wallet"
                  :options="balances"
                  label="wallet_symbol"
                  placeholder="Select Wallet"
                >
                  <template #option="{ wallet_symbol, wallet_name }">
                    <h6 class="tw-mb-0 tw-text-sm">{{ wallet_symbol }}</h6>
                    <h6 class="tw-text-light tw-text-sm">
                      {{ `${wallet_name}` }}
                    </h6>
                  </template>
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                      <i-icon icon="prime:angle-down" width="30px" />
                    </span>
                  </template>
                </v-select>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>

            <validation-provider
              name="wallet address"
              rules="required"
              class="tw-mb-5 tw-block"
              v-slot="{ errors }"
            >
              <div>
                <div class="input-field tw-px-2">
                  <input
                    type="text"
                    v-model="address_to"
                    class="tw-text-white"
                    placeholder="Enter wallet Address"
                  />
                  <span
                    role="button"
                    @click="pasteAddress"
                    class="primary-btn tw-bg-white tw-text-primary tw-py-2"
                  >
                    paste
                  </span>
                </div>
              </div>
              <span class="tw-text-xs tw-text-red-100" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>

            <validation-provider
              name="amount"
              rules="required|min_value:5"
              class="tw-mb-5 tw-block"
              v-slot="{ errors }"
            >
              <div>
                <span
                  v-if="insuffientBalance"
                  class="tw-block tw-text-right tw-text-xs tw-font-semibold tw-text-red-600"
                  >* Insuffient balance in
                  {{ getBalance(wallet).wallet_symbol }} wallet
                </span>
                <div class="input-field tw-px-2">
                  <input
                    type="tel"
                    v-model="amount"
                    class="tw-text-white"
                    placeholder="Enter Amount"
                    :disabled="wallet === null"
                  />
                  <span
                    @click="getMax"
                    role="button"
                    class="primary-btn tw-bg-white tw-text-primary tw-py-2"
                  >
                    max
                  </span>
                </div>
                <div v-if="wallet !== null" class="tw-flex tw-gap-1 tw-text-sm">
                  <span class="tw-text-white">Wallet Balance:</span>
                  <span
                    class="tw-font-semibold"
                    :class="[
                      getBalance(wallet).wallet_balance_raw <= 0
                        ? 'tw-text-red-200'
                        : 'tw-text-green-200',
                    ]"
                    >{{
                      getBalance(wallet).wallet_symbol +
                      " " +
                      getBalance(wallet).wallet_balance_raw
                    }}</span
                  >
                </div>
              </div>
              <span class="tw-text-xs tw-text-red-100" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>

            <div class="tw-text-center">
              <button
                class="outline-btn w-100"
                :class="{ 'tw-bg-gray-400': invalid || loading }"
                :disabled="invalid || loading"
              >
                <span v-if="loading"
                  ><i-icon
                    icon="eos-icons:bubble-loading"
                    width="20px"
                    class="text-white"
                  />
                </span>
                <span v-else>withdraw</span>
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "../ModalWrapper.vue";
export default {
  components: { ModalWrapper },
  data() {
    return {
      color: {
        light: "#ffffff",
      },
      currencies: ["USDT", "RAAF"],
      loading: false,
      address_to: "",
      amount: null,
      requestId: "",
      balances: [],
      wallet: {},
      insuffientBalance: false,
      busy: false
    };
  },

  methods: {
    onCopy: function (value) {
      this.$toast.open({
        message: `Wallet address copied`,
        type: "success",
        position: "top",
      });
      console.log(value);
    },

    onError: function () {
      alert("Failed to copy texts");
    },

    pasteAddress() {
      navigator.clipboard.readText().then((cliptext) => {
        this.address_to = cliptext;
        (err) => alert(err);
      });
    },

    getBalance(value) {
      var res = {};
      var result = this.balances.find(
        (item) => item.wallet_id === value.wallet_id
      );
      res = result;
      this.balance = res;
      return res;
    },

    getMax() {
      this.amount = this.balance.wallet_balance_raw;
    },

    getBalances() {
      this.busy = true;
      this.appDomain
        .getWallets(this.user.user_id, "tusd")
        .then((res) => {
          console.log(res);
          this.balances = res.data;
          this.wallet = res.data[0];
          this.busy = false;
        })
        .catch((err) => {
          this.busy = false;
          console.log(err);
        });
    },

    withdraw() {
      // this.$swal
      //   .fire({
      //     title: "Oh oh 😫",
      //     text: "Withdrawal Module revamp ongoing, you will be notified when its revamp is complete!",
      //     icon: "error",
      //     confirmButtonText: "Ok!",
      //   })
      this.loading = true;
      const payload = {
        wallet_id: "tusd",
        user_id: +(this.user.user_id),
        withdrawal_amount: this.amount,
        withdrawal_address_to: this.address_to,
        request_id: this.requestId,
      };
      const accessToken = localStorage.getItem('tura_token');
      const headers = {
        "Authorization": `Bearer ${accessToken}`
      }
      this.withdrawal
        .requestWithdrawal(payload, headers)
        .then((res) => {
          console.log(res);
          this.getBalances();
          var responsePayload = res;
          this.$toast.open({
            message: `${responsePayload.message}`,
            type: "success",
            position: "top",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$toast.open({
            message: `${err.response.data.message}`,
            type: "error",
            position: "top",
            // all of other options may go here
          });
        });
    },
  },

  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
    wallet_address() {
      return this.$store.getters["auth/getWalletAddress"];
    },
  },

  beforeMount() {
    this.getBalances();
  },

  mounted() {
    var result = Math.round(+new Date() / 1000);
    this.requestId = `${result}`;
  },
};
</script>

<style scoped>
.wallet-address-input {
  background: transparent;
  border: none;
  font-size: 17px;
  font-weight: 600;
  color: var(--gray-600);
}
</style>
