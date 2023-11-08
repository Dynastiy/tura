<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-6 tw-text-center">
        <h3 class="tw-font-bold mb-0">Verify Email</h3>
        <span class="tw-text-sm"
          >Enter token sent to your email to verify email
        </span>
      </div>
      <div class="tw-mb-3">
        <input
          type="text"
          v-model="credentials.token"
          id="token"
          placeholder="Token"
        />
      </div>

      <div class="tw-mb-3">
        <button
          @click="verify"
          class="primary-btn w-100"
          :class="loading ? 'bg-secondary' : disabled ? 'bg-secondary' : ''"
          :disabled="loading || disabled"
        >
          <span v-if="busy"
            ><i-icon
              icon="eos-icons:bubble-loading"
              width="20px"
              class="text-white"
            />
          </span>
          <span v-else>Verify</span>
        </button>
      </div>

      <div class="tw-mb-3">
        <button
          @click="sendVerifyToken"
          class="primary-btn w-100"
          :class="busy ? 'bg-secondary' : ''"
        >
          <span v-if="loading"
            ><i-icon
              icon="eos-icons:bubble-loading"
              width="20px"
              class="text-white"
            />
          </span>
          <span v-else>resend</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        token: "",
      },
      typePassword: true,
      disabled: true,
      loading: false,
      busy: false,
    };
  },
  methods: {
    verify() {
      let payload = {
        token_to_verify_email_address: this.credentials.token,
        email_address: this.$route.query.email,
      };
      this.appDomain
        .verifyToken(payload)
        .then((res) => {
          this.$swal.fire(
            "Completed!",
            "Email Verification Complete.",
            "success"
          );
          this.$router.push("/sign-in");
          return res;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.open({
            message: `${err.data.message}`,
            type: "error",
            position: "top",
            // all of other options may go here
          });
        });
    },

    sendVerifyToken() {
      let email_address = this.$route.query.email;
      this.appDomain
        .sendToken(email_address)
        .then((res) => {
          this.$toast.open({
            message: `${res.message}`,
            type: "success",
            position: "top",
          });
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {},

  watch: {
    credentials: {
      handler(val) {
        if (val.token != "") {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {},
};
</script>

<style></style>
