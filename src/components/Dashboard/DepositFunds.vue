<template>
  <modal-wrapper @close="$emit('close')">
    <template #header>
      <h5 class="tw-mb-0 tw-text-white tw-font-semibold">Deposit Funds</h5>
    </template>
    <template #body>
      <div class="">
        <div>
          <p
            class="tw-text-center tw-text-[13px] tw-bg-white tw-p-2 tw-font-medium tw-rounded-lg"
          >
            Only send <b>USDT</b> (BEP20) to this address. other asset to this
            address will be lost forever!
          </p>
          <div class="tw-text-center">
            <div
              class="tw-shadow tw-bg-white tw-mx-auto tw-mb-3 tw-rounded-xl tw-w-fit tw-p-1"
            >
              <div>
                <v-qr :text="wallet_address" class="tw-bg-gray4" :width="300" />
              </div>
              <!-- <hr clas="tw-my-1"> -->
              <span class="tw-break-all tw-w-full tw-mb-3 tw-block tw-px-4">
                {{ wallet_address }}
              </span>
            </div>
            <p class="tw-text-center tw-text-white tw-font-normal tw-text-sm">
              <b>Minimum deposit</b>: <b>1 USDT</b>
            </p>
          </div>
          <div class="tw-flex tw-justify-center">
            <div>
             
              <div class="tw-text-center">
                <span
                  class="tw-bg-white tw-p-1 tw-rounded tw-block tw-w-fit"
                  role="button"
                  v-clipboard:copy="wallet_address"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <i-icon icon="tabler:copy" width="20px" />
                </span>
              </div>
            </div>
          </div>
        </div>
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
  },

  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
    wallet_address() {
      return this.$store.getters['auth/getWalletAddress']
    //   return "xtheyushih2it57375";
    },
  },

  beforeMount() {
    // this.generateWalletAddress();
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
