<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-6 tw-text-center">
        <h3 class="tw-font-bold mb-0 tw-text-3xl">Create Account</h3>
        <span class="tw-text-sm"
          >Already have an account?
          <router-link to="/" class="tw-text-primary">Login</router-link>
        </span>
      </div>
      <validation-observer v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(register)">
          <span v-if="error" class="mb-3 error-alert">{{ error }}</span>
          <div class="lg:tw-flex md:tw-flex tw-gap-3">
            <div class="mb-3 tw-w-full">
              <validation-provider
                name="First Name"
                rules="required"
                v-slot="{ dirty, invalid, errors }"
              >
                <input
                  type="text"
                  :class="{
                    error: dirty && invalid,
                  }"
                  v-model="credentials.first_name"
                  id="first_name"
                  placeholder="First Name"
                />
                <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                  errors[0]
                }}</span>
              </validation-provider>
            </div>

            <div class="mb-3 tw-w-full">
              <validation-provider
                name="Last Name"
                rules="required"
                v-slot="{ dirty, invalid, errors }"
              >
                <input
                  type="text"
                  :class="{
                    error: dirty && invalid,
                  }"
                  v-model="credentials.last_name"
                  id="last_name"
                  placeholder="Last Name"
                />
                <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                  errors[0]
                }}</span>
              </validation-provider>
            </div>
          </div>

          <div class="mb-3">
            <validation-provider
              name="Email"
              rules="required|email"
              v-slot="{ dirty, invalid, errors }"
            >
              <input
                type="email"
                v-model="credentials.user_email"
                id="email"
                placeholder="Email"
                :class="{
                  error: dirty && invalid,
                }"
              />
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
            <small
              class="tw-text-danger tw-text-xs"
              v-for="item in errors"
              :key="item.id"
            >
              <span v-for="error in item.user_email" :key="error">
                * {{ error }}
              </span>
            </small>
          </div>

          <div class="mb-3">
            <validation-provider
              name="Username"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <input
                type="text"
                v-model="credentials.username"
                id="username"
                placeholder="Username"
                :class="{
                  error: dirty && invalid,
                }"
              />
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
            <small
              class="tw-text-danger tw-text-xs"
              v-for="item in errors"
              :key="item.id"
            >
              <li v-for="error in item.user_login" :key="error">
                * {{ error }}
              </li>
            </small>
          </div>

          <div>
            <div class="mb-3">
              <validation-provider
                name="Phone Number"
                rules="required|numeric"
                v-slot="{ dirty, invalid, errors }"
              >
                <input
                  type="tel"
                  v-model="credentials.phone_number"
                  id="phone_number"
                  placeholder="Phone Number"
                  :class="{
                    error: dirty && invalid,
                  }"
                />
                <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                  errors[0]
                }}</span>
              </validation-provider>
            </div>
            <div class="mb-3">
              <input
                type="text"
                v-model="credentials.rimplenet_referrer_sponsor"
                id="refferer"
                placeholder="Referrer"
              />
            </div>
          </div>

          <div class="tw-mb-3">
            <validation-provider
              name="Password"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <div class="input-field">
                <input
                  :type="typePassword ? 'password' : 'text'"
                  v-model="credentials.user_password"
                  id="password"
                  placeholder="Password"
                  :class="{
                    error: dirty && invalid,
                  }"
                />
                <span role="button" @click="typePassword = !typePassword">
                  <i-icon
                    :icon="
                      typePassword ? 'tabler:eye' : 'gridicons:not-visible'
                    "
                    class="form-icon"
                  />
                </span>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
            <small
              class="tw-text-danger tw-text-xs"
              v-for="item in errors"
              :key="item.id"
            >
              <li v-for="error in item.user_pass" :key="error">
                * {{ error }}
              </li>
            </small>
          </div>

          <div class="tw-mb-4 tw-flex align-center tw-space-x-2">
            <validation-provider
              name="Privacy check"
              rules="required|isBool"
              v-slot="{ errors }"
            >
              <input
                type="checkbox"
                v-model="credentials.privacy"
                name=""
                id=""
              />
              <span class="tw-text-[12px]">
                I agree to Tura
                <a
                  href="https://samzuga.com/term-of-service"
                  target="_blank"
                  class="tw-text-primary"
                  >Terms of service</a
                >
                and
                <a
                  href="https://samzuga.com/privacy-policy"
                  target="_blank"
                  class="tw-text-primary"
                  >Privacy policy</a
                >
              </span>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
          </div>

          <div class="tw-mb-3">
            <button
              class="primary-btn w-100"
              :class="{ 'tw-bg-gray-400': invalid }"
              :disabled="invalid"
            >
              <span v-if="loading"
                ><i-icon
                  icon="eos-icons:bubble-loading"
                  width="20px"
                  class="text-white"
                />
              </span>
              <span v-else>create account</span>
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        first_name: "",
        last_name: "",
        user_email: "",
        user_password: "",
        username: "",
        rimplenet_referrer_sponsor: "",
        phone_number: "",
        privacy: null,
      },
      typePassword: true,
      error: "",
      errors: "",
      loading: false,
    };
  },
  methods: {
    // ...mapActions("auth", ["registerUser"]),

    sendVerifyToken(value) {
      this.appDomain
        .sendToken(value.email_address)
        .then((res) => {
          this.$router.push(`/verify-email?email=${value.email_address}`);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async register() {
      this.loading = true;
      var credentials = {
        first_name: this.credentials.first_name,
        last_name: this.credentials.last_name,
        user_email: this.credentials.user_email,
        user_password: this.credentials.user_password,
        username: this.credentials.username,
        // rimplenet_referrer_sponsor:
        //   this.credentials.rimplenet_referrer_sponsor === ""
        //     ? "samzuga"
        //     : this.credentials.rimplenet_referrer_sponsor,
        rimplenet_referrer_sponsor: this.credentials.rimplenet_referrer_sponsor,
        phone_number: this.credentials.phone_number,
      };
      try {
        let res = await this.appDomain.register(credentials);
        let responsePayload = res;
        var payload = {
          email_address: this.credentials.user_email,
          fire_email: false,
        };
        this.sendVerifyToken(payload);
        this.$toast.open({
          message: `${responsePayload.message}`,
          type: "success",
          position: "top",
        });
        return res;
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.$toast.open({
          message: `Error!`,
          type: "error",
          position: "top",
        });
        if (error.data) {
          let errorPayload = error.data;
          if (errorPayload.message) {
            this.error = errorPayload.message;
            if (errorPayload.error) {
              console.log(errorPayload.error);
              this.errors = errorPayload.error;
            }
            return;
          }
        }
        this.error = "Internal connection error, please try again.";
        return error.data;
      }
    },
  },

  mounted() {
    this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
  },

  watch: {
    "$route.query": {
      handler(val) {
        if (Object.keys(val).length > 0) {
          console.log(val);
          this.credentials.rimplenet_referrer_sponsor = val.ref;
        }
      },
      immediate: true,
    },
  },

  computed: {},
};
</script>

<style></style>
