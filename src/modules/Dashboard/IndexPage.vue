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
        <span class="tw-text-sm">John</span>
      </div>
    </div>

    <!-- Wallet  -->
    <div
      class="tw-px-4 tw-py-5 tw-mb-4 tw-rounded-lg wallet tw-mt-4 md:tw-w-[300px] lg:tw-w-[300px] tw-w-full"
    >
     <div class="tw-flex tw-justify-between tw-items-center">
        <div>
            <h6
        class="tw-text-[11px] tw-font-normal tw-uppercase tw-text-white"
      >
        Total Balance
      </h6>
      <span
        class="tw-flex align-items-center tw-space-x-1"
      >
        <h4
          class="tw-font-bold  tw-text-white tw-text-[25px] tw-mb-0"
        >
          {{ viewAmount ? (amount | formatMoney) : "******" }}
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
            <img src="@/assets/img/wallet.svg" width="100" alt="">
        </div>
     </div>
    </div>

    <!-- Wallet Actions  -->
    <div
      class="tw-flex tw-gap-8 lg:tw-justify-start md:tw-justify-start tw-justify-between"
    >
      <span v-for="(item, idx) in actions" :key="idx" role="button">
        <span
          class="tw-flex tw-items-center tw-shadow-lg tw-p-4 tw-w-fit tw-rounded-full"
        >
          <i-icon :icon="item.icon" class="tw-text-primary tw-text-xl" />
        </span>
        <span class="tw-text-sm tw-capitalize">{{ item.title }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 150000,
      viewAmount: true,
      actions: [
        {
          title: "deposit",
          icon: "teenyicons:send-up-solid",
        },
        {
          title: "withdraw",
          icon: "teenyicons:send-down-solid",
        },
        {
          title: "swap",
          icon: "mi:repeat",
        },
      ],
    };
  },
};
</script>

<style>

.wallet{
    background: url("@/assets/img/walletbg.jpg");
    background-color: var(--primary-dark);
    background-blend-mode: overlay;
}
</style>
