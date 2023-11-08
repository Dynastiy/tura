<template>
    <div>
        <!-- <h5 class="tw-text-md tw-font-semibold">Transactions History</h5> -->
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <div class="tw-flex tw-flex-col tw-gap-4">
            <div
              class="tw-bg-gray-100 tw-px-4 tw-py-5 tw-w-full"
              v-for="item in 10"
              :key="item"
            >
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
            </div>
          </div>
        </template>
        <div>
          <div v-if="items.length > 0">
            <div class="tw-flex tw-flex-col tw-gap-4">
              <div
                v-for="(item, idx) in items"
                :key="idx"
                class="tw-bg-gray-100 tw-p-3 tw-flex tw-justify-between"
              >
                <div class="tw-flex tw-gap-2">
                  <span
                    class="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-font-weight-bold tw-rounded"
                    :class="[
                      item.txn_type === 'CREDIT'
                        ? 'tw-bg-green-100'
                        : 'tw-bg-red-100',
                    ]"
                  >
                    <i-icon
                      :icon="
                        item.txn_type === 'CREDIT'
                          ? 'carbon:arrow-down'
                          : 'iconoir:arrow-tr'
                      "
                    />
                  </span>
                  <span class="tw-flex tw-flex-col">
                    <span class="tw-font-semibold tw-text-sm">
                      {{
                        `${item.txn_type} #${item.transaction_id}` +
                        (item.note !== "" ? `~ ${item.note}` : "")
                      }}
                    </span>
                    <span class="tw-text-xs" v-html="item.post_date"> </span>
                  </span>
                </div>
                <div class="tw-flex tw-flex-col tw-items-end">
                  <span class="tw-text-sm tw-font-semibold">
                    {{ item.amount + " " + item.wallet_symbol }}
                  </span>
                  <span class="tw-text-xs">{{ item.wallet_id }}</span>
                </div>
              </div>
            </div>
            <div class="tw-flex tw-justify-between tw-mt-3">
              <button
                v-if="page > 1"
                class="primary-btn"
                @click="changePage('prev')"
              >
                previous {{ +page - 1 }}
              </button>
              <div class="tw-self-end">
                <button class="primary-btn" @click="changePage('next')">
                  next {{ +page + 1 }}
                </button>
              </div>
            </div>
          </div>
          <div v-else class="tw-flex tw-flex-col tw-items-center">
            <i-icon icon="system-uicons:box-open" width="200" />
            <h6 class="tw-mt-3 tw-text-red-600">No Transactions Found</h6>
          </div>
        </div>
      </b-skeleton-wrapper>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [],
        loading: false,
        page: 1,
      };
    },
  
    methods: {
      getTransactions() {
        this.loading = true;
        this.appDomain.getTransactions(this.user.user_id, this.page)
        // this.$request
        //   .get(`/transactions?user_id=${this.user.user_id}&pageno=${this.page}`)
          .then((res) => {
            this.loading = false;
            console.log(res);
            this.items = res;
          })
          .catch((err) => {
            console.log(err);
            this.items = [];
            this.loading = false;
          });
      },
  
      changePage(value) {
        if (value === "prev") {
          this.page--;
        } else {
          this.page++;
        }
      },
    },
  
    watch: {
      page(oldVal, newVal) {
        if (oldVal !== newVal) {
          this.getTransactions();
        }
      },
    },
  
    beforeMount() {
      this.getTransactions();
    },
  
    computed: {
      user() {
        return this.$store.getters["auth/getUser"];
      },
  
      noTrxns() {
        return typeof this.items === "object";
      },
    },
  };
  </script>
  
  <style></style>
  