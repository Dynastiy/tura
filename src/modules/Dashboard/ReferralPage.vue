<template>
  <div>
    <div>
      <h5 class="tw-text-md tw-font-semibold">Referral Bonus Balances</h5>
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <div class="tw-mt-4">
            <div
              class="lg:tw-w-2/5 md:tw-w-2/5 tw-w-full tw-bg-gray6 tw-rounded-lg tw-p-4"
            >
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
            </div>
          </div>
        </template>

        <div class="tw-my-4">
          <div
            v-for="item in balances"
            :key="item.id"
            class="tw-bg-gray6 lg:tw-w-2/5 md:tw-w-2/5 tw-w-full tw-p-3 tw-rounded-lg"
          >
            <div
              class="lg:tw-flex md:tw-flex tw-justify-between tw-hidden tw-mb-3"
            >
              <span class="tw-uppercase tw-text-[12px]">{{
                item.wallet_name
              }}</span>
              <i-icon icon="cib:marketo" class="tw-text-primary tw-text-sm" />
            </div>
            <h6
              v-text="item.wallet_id.split('_').join(' ')"
              class="tw-font-bold tw-uppercase lg:tw-text-left md:tw-text-left sm:tw-text-center tw-mb-0"
            ></h6>
            <h6
              v-text="item.wallet_balance_raw"
              class="tw-text-sm lg:tw-text-left md:tw-text-left sm:tw-text-center tw-mb-0"
            ></h6>
          </div>
        </div>
      </b-skeleton-wrapper>
    </div>
    <div class="tw-flex tw-justify-center">
      <img src="@/assets/img/referral.svg" alt="" />
    </div>
    <h6 class="tw-text-center tw-my-4">
      You are entitled to earn
      <b>10%</b> on the first deposit of the person you referred. Your referral
      link is shown below:
    </h6>
    <h6 class="tw-text-center tw-my-4">
      A rebate of <b>$500</b> bonus is paid for every <b>50</b> active
      downlines.
    </h6>
    <h6  class="tw-text-center tw-my-4">A <b>1000</b> active downline activates a <b>$5000</b> Crypto grant</h6>
    <div class="tw-flex tw-justify-center">
      <div
        class="tw-flex align-items-center tw-px-3 tw-py-3 tw-space-x-2 tw-bg-gray6 tw-w-fit tw-rounded-lg"
      >
        <span class="wallet-address-input tw-break-all tw-w-full">{{
          referral_code
        }}</span>
      </div>
    </div>
    <div class="tw-text-center tw-mt-4">
      <button
        class="primary-btn"
        role="button"
        v-clipboard:copy="copy_text"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        copy
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "@/https/config";
export default {
  data() {
    return {
      config,
      balances: [],
      loading: false,
    };
  },
  methods: {
    onCopy: function (value) {
      this.$toast.open({
        message: `Referral link Copied`,
        type: "success",
        position: "top",
      });
      console.log(value);
    },

    onError: function () {
      alert("Failed to copy texts");
    },

    getBalances() {
      this.loading = true;
      this.appDomain
        .getWallets(this.user.user_id, "usdt_referral_bonus")
        .then((res) => {
          console.log(res);
          this.balances = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },

  beforeMount() {
    this.getBalances();
  },

  computed: {
    ...mapState("auth", {
      user: (state) => state.user,
    }),
    referral_code() {
      let url = config.appDomain;
      let user = this.user.username;
      return url + "sign-up?ref=" + user;
    },
    copy_text() {
      // let text = `Check out this recently launched Tura powered by AI, it pays you staking rewards  when you stake cryptocurrency on the platform, you can register through my link ${this.referral_code} to earn staking rewards.`;
      let text = `${this.referral_code}`;
      return text;
    },
  },
};
</script>

<style></style>
