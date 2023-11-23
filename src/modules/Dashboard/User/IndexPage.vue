<template>
  <div>
    <!-- <div class="tw-flex tw-gap-3">
      <span
        v-for="(item, idx) in menu"
        :key="idx"
        class="menu--item"
        role="button"
        :class="[
          item.parent === routeParent ? 'tw-bg-primary tw-text-white' : 'tw-bg-gray-200',
        ]"
        @click="$router.push(item?.href).catch(() => {})"
        >{{ item?.title }}</span
      >
    </div>

    <div class="tw-bg-white tw-p-8 tw-rounded-lg tw-mt-4">
      <router-view />
    </div> -->

    <div class="">
      <div class="tw-flex lg;tw-flex-row md:tw-flex-row tw-flex-col-reverse tw-gap-4">
        <div class="tw-w-full tw-bg-white  lg:tw-p-8 md:tw-p-8 tw-p-5">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="User Profile" name="profile">
              <div>
                <div class="tw-mb-3">
                  <label for="">Username</label>
                  <input
                    type="email"
                    v-model="user.username"
                    id="email"
                    readonly
                    placeholder="Enter email"
                    disabled
                  />
                </div>
                <div class="tw-mb-3">
                  <label for="">Email</label>
                  <input
                    type="email"
                    v-model="email"
                    id="email"
                    readonly
                    placeholder="Enter email"
                    disabled
                  />
                </div>
                <div class="tw-mb-3">
                  <label for="">Referred By:</label>
                  <input
                    type="email"
                    v-model="referrer"
                    id="email"
                    readonly
                    placeholder="Enter email"
                    disabled
                  />
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="Change Password" name="password">
              <div>
                <div class="">
                  <h5 class="tw-font-bold mb-0">Change Password?</h5>
                  <span class="tw-text-xs">
                    Send change password instructions to the email you used
                    while creating your account.
                  </span>
                </div>
                <form action="" @submit.prevent="login">
                  <span v-if="error" class="mb-3 error-alert">{{ error }}</span>

                  <div class="tw-mb-7">
                    <label for="">Email</label>
                    <input
                      type="email"
                      v-model="email"
                      id="email"
                      readonly
                      placeholder="Enter email"
                      disabled
                    />
                  </div>

                  <div class="">
                    <button
                      @click="sendChangeToken"
                      class="primary-btn tw-w-fit"
                      :class="loading ? 'bg-secondary' : ''"
                      :disabled="loading"
                    >
                      <span v-if="loading"
                        ><i-icon
                          icon="eos-icons:bubble-loading"
                          width="20px"
                          class="text-white"
                        />
                      </span>
                      <span v-else>Send token</span>
                    </button>
                  </div>
                </form>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="tw-flex tw-flex-col tw-bg-white lg:tw-w-5/12 md:tw-w-5/12 tw-w-full lg:tw-p-8 md:tw-p-8 tw-p-5">
          
          <span
            class="tw-w-20 tw-uppercase tw-h-20 tw-flex tw-items-center tw-justify-center tw-bg-gray4 tw-text-3xl tw-font-bold tw-rounded-full"
          >
            {{ user.username.charAt(0) }}
          </span>
          <h5 class="tw-capitalize tw-font-semibold tw-mb-0">{{ user.username }}</h5>
          <span
            class="tw-flex tw-items-center"
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
          <div>
            <h6 class="tw-font-normal tw-text-sm tw-mb-0">
              Logged in at:
              {{ new Date(user.time_of_login * 1000.0) | formatDate }}
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "Personal Information",
          href: "/personal-information",
          parent: "personal-information",
        },
        {
          title: "Security",
          href: "/personal-information/security",
          parent: "security",
        },
      ],
      activeName: "profile",
      credentials: {
        email: "",
      },
      loading: false,
      error: "",
      referrer: "",
    };
  },

  methods: {
    sendChangeToken() {
      this.$request
        .get(`/change-password?email_address=${this.email}&fire_email=true`)
        .then((res) => {
          this.$router.push(`/change-password?email=${this.email}`);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch: {
    userMeta: {
      handler(val) {
        this.referrer = val.rimplenet_referrer_sponsor || "No referrer found";
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    routeParent() {
      return this.$route.meta.subParent;
    },
    email() {
      return this.$store.getters["auth/getUser"].user_email;
    },
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
.menu--item {
  padding: 5px 15px;
  font-size: 12px;
  border-radius: 5px;
}
</style>
