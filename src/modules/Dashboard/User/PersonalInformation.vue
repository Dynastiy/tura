<template>
    <div>
      <div class="tw-flex tw-flex-col tw-space-y-3 tw-items-center">
        <span
          class="tw-w-20 tw-uppercase tw-h-20 tw-flex tw-items-center tw-justify-center tw-bg-gray4 tw-text-3xl tw-font-bold tw-rounded-full"
        >
          {{ user.username.charAt(0) }}
        </span>
        <div>
          <div class="tw-flex tw-gap-2 tw-justify-center">
            <h4 class="tw-mb-0 tw-font-bold tw-text-center tw-capitalize">
              {{ user.username }}
            </h4>
            <span
              class="tw-flex tw-items-center tw-space-x-1"
              :class="
                userMeta.nll_user_email_address_verified === null
                  ? 'tw-text-red-600'
                  : 'tw-text-green-600'
              "
            >
              <i-icon
                :icon="
                  userMeta.nll_user_email_address_verified === null
                    ? 'ic:baseline-circle'
                    : 'solar:verified-check-bold'
                "
                width="12px"
              />
              <span class="tw-text-xs">{{
                userMeta.nll_user_email_address_verified === null
                  ? "unverified"
                  : "verified"
              }}</span>
            </span>
          </div>
          <h6 class="tw-font-normal tw-text-center tw-text-sm tw-mb-0">
            {{ user.user_email }}
          </h6>
          <h6 class="tw-font-normal tw-text-center tw-text-sm tw-mb-0">
            {{ userMeta.phone_number }}
          </h6>
          <h6 class="tw-font-normal tw-text-center tw-text-sm tw-mb-0">
            Referred by: {{ userMeta.rimplenet_referrer_sponsor || "No referrer found" }}
          </h6>
          <!-- <h6 class="tw-font-normal tw-text-center tw-text-sm tw-mb-0">
            Registered as community member: <span class="status" :class="userMeta.registered_as_community_member === null ? 'not-registered' : 'registered'">
              {{ userMeta.registered_as_community_member === null ? "Not registered" : "registered" }}
            </span>
          </h6> -->
          
          <h6 class="tw-font-normal tw-text-center tw-text-sm tw-mb-0">
            Logged in at: {{ (new Date(user.time_of_login * 1000.0)) | formatDate }}
          </h6>
        </div>
      </div>
      <div class="text-center tw-mt-8 tw-flex tw-gap-3 tw-justify-center">
        <button
          v-if="userMeta.nll_user_email_address_verified === null"
          class="primary-btn tw-w-fit"
          @click="verify"
        >
          Verify Email
        </button>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
      };
    },
    methods: {
      changePassword() {
        this.$router.push("/change-user-password");
      },
  
      verify() {
        this.$router.push("/email-verification");
      },
    },
  
    beforeMount() {},
  
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
  
  <style></style>
  