/* eslint-disable no-undef */
import Vue from "vue";
import $request from "@/https/axios";
// import config from "@/https//config.js";

import axios from "axios";

import router from "@/router";

// Vue.use(require("vue-moment"));

const getDefaultState = () => {
  return {
    loading: false,
    error: false,
    success: false,
    regError: false,
    regSuccess: false,
    validationErrors: {},
    user: {},
    userMeta: {},
    wallet_address: {},
    loggedIn: false,
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    isLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getUserMeta: (state) => state.userMeta,
    getWalletAddress: (state) => state.wallet_address,
  },

  mutations: {
    SET_LOADING(state) {
      state.loading = true;
      state.error = false;
      state.success = false;
      state.regError = false;
      state.regSuccess = false;
      state.validationErrors = {};
    },

    SET_ERROR(state, message) {
      state.error = message;
      state.success = false;
      state.loading = false;
      state.validationErrors = {};
    },

    SET_SUCCESS(state, message) {
      state.success = message;
      state.error = false;
      state.validationErrors = {};
      state.loading = false;
    },

    SET_VALIDATION_ERRORS(state, payload) {
      state.loading = false;
      state.validationErrors = payload;
    },

    REMOVE_ERROR_SUCCESS(state) {
      state.error = false;
      state.success = false;
      state.regError = false;
      state.regSuccess = false;
      state.validationErrors = {};
      state.loading = false;
    },

    LOGIN(state) {
      state.loading = false;
      state.loggedIn = true;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },

    SET_USER_META(state, payload) {
      state.userMeta = payload;
    },

    SET_WALLET_ADDRESS(state, payload) {
      state.wallet_address = payload;
    },

    async LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("vuex");
      localStorage.clear();
    },
    RESET(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], null);
      });
    },
  },
  actions: {
    // Login request
    async loginUser({ commit }, payload) {
      commit("SET_LOADING", true);
      try {
        let res = await $request.post(`users/login`, payload);
        let responsePayload = res.data;
        console.log(responsePayload);
        localStorage.setItem("tura_token", responsePayload.access_token);
        Vue.$toast.open({
          message: `${responsePayload.message}`,
          type: "success",
          position: "top",
          // all of other options may go here
        });
        commit("LOGIN", {
          accessToken: responsePayload.access_token,
        });
        commit("SET_USER", responsePayload.data);
        // Check redirect URL
        const url = window.location.search;
        const params = new URLSearchParams(url);
        const d = params.get("redirectFrom");

        // dispatch("getUserMeta", responsePayload.data.user_id);

        router.push(d || "/");
        return res;
      } catch (error) {
        console.log(error);
        Vue.$toast.open({
          message: `Error!`,
          type: "error",
          position: "top",
          // all of other options may go here
        });
        if (error) {
          let errorPayload = error.data;
          if (errorPayload.message) {
            commit("SET_ERROR", errorPayload.message);
            if (errorPayload.error) {
              console.log(errorPayload.error);
              commit("SET_VALIDATION_ERRORS", errorPayload.error);
            }
            return;
          }
        }
        commit("SET_ERROR", "Internal connection error, please try again.");
        return error;
      }
    },

    getUserMeta({ commit }, payload) {
      axios
        .get(
          `https://goodymarketplace.com/tura/wp-json/nellalink/v1/smart-meta-manager/user?user_id=${payload}&meta_key=nll_user_email_address_verified,phone_number,rimplenet_referrer_sponsor,registered_as_community_member`
        )
        .then((res) => {
          commit("SET_USER_META", res.data.data);
          console.log(res.data.data);
        });
    },

    generateWalletAddress({ commit }, payload) {
      axios
        .get(`${process.env.VUE_APP_MIDDLEWARE_API_URL}address/${payload}`)
        .then((res) => {
          let resPayload = res.data.data;
          commit("SET_WALLET_ADDRESS", resPayload.addr);
          return res;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          return err;
        });
    },

    // Request request
    async registerUser({ commit }, payload) {
      commit("SET_LOADING", true);
      try {
        let res = await $request.post(`users/`, payload);
        commit("SET_SUCCESS", "User Registered");
        let responsePayload = res.data;
        Vue.$toast.open({
          message: `${responsePayload.message}`,
          type: "success",
          position: "top",
          // all of other options may go here
        });
        return res;
      } catch (error) {
        console.log(error);
        Vue.$toast.open({
          message: `Error!`,
          type: "error",
          position: "top",
          // all of other options may go here
        });
        if (error.data) {
          let errorPayload = error.data;
          if (errorPayload.message) {
            commit("SET_ERROR", errorPayload.message);
            if (errorPayload.error) {
              console.log(errorPayload.error);
              commit("SET_VALIDATION_ERRORS", errorPayload.error);
            }
            return;
          }
        }
        commit("SET_ERROR", "Internal connection error, please try again.");
        return error.data;
      }
    },
  },
};
