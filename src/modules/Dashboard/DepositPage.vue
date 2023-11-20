<template>
  <div class="tw-bg-white tw-p-6 tw-rounded-lg">
    <!-- <div>
      <label for="">Select Wallet</label>
      <select name="" id="" class="select">
        <option value="" v-for="item in currencies" :key="item">
          {{ item }}
        </option>
      </select>
    </div> -->
    <!-- <div class="tw-flex tw-justify-center tw-mt-4" v-if="loading">
      <span><i-icon icon="eos-icons:bubble-loading" width="80px" /></span>
    </div> -->
    <div>
      <div class="tw-text-center">
        <div class="">
          <v-qr :text="wallet_address" class="tw-bg-gray4" :width="300" />
        </div>
      </div>
      <p class="tw-text-center">
        Only send <b>RNGN</b> and <b>RAAF</b> to this address.
        Sending any other asset to this address may result in the loss of your
        deposit!
      </p>
      <!-- <p class="tw-text-center">
        Only send <b>BNB</b>, <b>USDT</b> and <b>SZCB</b> to this address.
        Sending any other asset to this address may result in the loss of your
        deposit!
      </p> -->
      <p class="tw-text-center tw-text-red-500">
        Please note, <b>minimum deposit</b> is <b>100 RNGN</b> and
        <b>1000 RAAF</b>
      </p>
      <!-- <p class="tw-text-center tw-text-red-500">
        Please note, <b>minimum deposit</b> is <b>0.02BNB</b>, <b>1 USDT</b> and
        <b>1 SZCB</b>
      </p> -->
      <div class="tw-flex tw-justify-center">
        <div>
          <span class="tw-text-danger tw-text-xs">
            Note: We Only Support BEP20
          </span>
          <div
            class="tw-flex align-items-center tw-px-3 tw-py-3 tw-space-x-2 tw-bg-gray6 tw-w-fit tw-rounded-lg"
          >
            <span class="wallet-address-input tw-break-all tw-w-full">{{
              wallet_address
            }}</span>
          </div>
          <div class="tw-text-center tw-mt-2">
            <button
          class="primary-btn"
          role="button"
          v-clipboard:copy="wallet_address"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          copy
        </button>
          </div>
          
        </div>
      </div>
      <div class="tw-mt-3 text-center tw-flex tw-items-center tw-gap-3">
        
        <button class="outline-btn" @click="$router.go(-1)">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    wallet_address(){
      // return this.$store.getters['auth/getWalletAddress']
      return "xtheyushih2it57375"
    }
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
