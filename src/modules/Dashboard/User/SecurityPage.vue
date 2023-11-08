<template>
  <div class="auth-content">
    <div class="tw-mb-6">
      <h3 class="tw-font-bold mb-0">Change Password?</h3>
      <span class="tw-text-xs">
        Send change password instructions to the email you used while creating your account.
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
          placeholder="Enter email"
          readonly
        />
      </div>

      <div class="">
        <button
          @click="sendChangeToken"
          class="primary-btn w-100"
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
          <span v-else>Send</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
//   import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        email: "",
      },
      loading: false,
      error: "",
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

  mounted() {
    //   this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
  },

  computed: {
    email() {
      return this.$store.getters["auth/getUser"].user_email;
    },

    //   ...mapState("auth", {
    //     loading: (state) => state.loading,
    //     error: (state) => state.error,
    //     errors: (state) => state.validationErrors,
    //     user: (state) => state.user,
    //   }),
  },
};
</script>

<style></style>
