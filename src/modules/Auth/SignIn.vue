<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-8">
        <!-- <span>TURA</span> -->
        <h3 class="tw-font-semibold tw-text-gray3 tw-text-[30px] tw-mb-0">Welcome Back</h3>
        <span
          class="tw-text-xs tw-block lg:tw-w-3/5 md:tw-w-3/5 tw-tracking-wide tw-leading-6 md:tw-w-62"
        >
          Welcome back! Please, enter your details.
        </span>
      </div>
      <validation-observer v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(login)">
          <span v-if="error" class="mb-3 error-alert">{{ errors }}</span>
          <div class="tw-mb-3">
            <validation-provider
              name="email"
              rules="required|email"
              v-slot="{ dirty, valid, invalid, errors }"
            >
              <label for="">Email</label>
              <input
                type="email"
                v-model="credentials.email"
                id="email"
                class="auth-input"
                placeholder="Email"
                v-bind:class="{
                  'tw-text-success': dirty && valid,
                  'tw-text-danger': dirty && invalid,
                }"
              />
              <small
                class="tw-text-danger tw-text-xs"
                v-for="item in errors"
                :key="item.id"
              >
                <span v-for="error in item.user_email" :key="error">
                  * {{ error }}
                </span>
              </small>
              <span class=" tw-block tw-text-danger tw-text-xs" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
          </div>

          <div class="tw-mb-6">
            <validation-provider
              name="password"
              rules="required"
              v-slot="{ dirty, valid, invalid, errors }"
            >
              <div class="tw-flex tw-justify-between">
                <label for="">Password</label>
                <span class="tw-text-[12px] tw-font-semibold"
                  ><router-link to="/forgot-password" class="tw-text-primary"
                    >Forgot Password?</router-link
                  >
                </span>
              </div>
              <div class="input-field auth-input-field">
                <input
                  :type="typePassword ? 'password' : 'text'"
                  v-model="credentials.password"
                  id="password"
                  placeholder="xxxxxxxx"
                  class=""
                  v-bind:class="{
                    'tw-text-success': dirty && valid,
                    'tw-text-danger': dirty && invalid,
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
              <span class="tw-block tw-text-danger tw-text-xs" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
          </div>

          <div class="tw-mb-3 tw-text-right"></div>

          <div class="tw-mb-3">
            <button
              class="primary-btn w-100"
              v-bind:disabled="invalid"
              v-bind:class="{ 'tw-bg-gray4': invalid }"
            >
              <span v-if="loading"
                ><i-icon
                  icon="eos-icons:bubble-loading"
                  width="20px"
                  class="text-white"
                />
              </span>
              <span v-else>Login</span>
            </button>
          </div>

          <div class="tw-text-center">
            <span class="tw-text-sm tw-font-semibold"
              >Don't have an account?
              <router-link to="/sign-up" class="tw-text-primary"
                >Sign Up</router-link
              >
            </span>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        email: "",
        password: "",
      },
      typePassword: true,
      disabled: true
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    login() {
      let credentials = {
        user_email: this.credentials.email,
        user_password: this.credentials.password,
      };
      this.loginUser(credentials);
    },
  },

  mounted() {
    this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
  },

  computed: {
    ...mapState("auth", {
      loading: (state) => state.loading,
      error: (state) => state.error,
      errors: (state) => state.validationErrors,
      user: (state) => state.user,
    }),
  },
};
</script>

<style></style>
