import $request from "@/https/axios";

const appDomain = {
  // Auth
  async register(credentials) {
    return $request
      .post("users", credentials)
      .then((response) => response.data);
  },

  async sendToken(params) {
    return $request
      .get(`/verify-email-address?email_address=${params}&fire_email=false`)
      .then((response) => response.data);
  },

  async verifyToken(credentials) {
    return $request
      .post("/verify-email-address", credentials)
      .then((response) => response.data);
  },

  //   Get Wallets
  async getWallets(params, body) {
    return $request
      .get(
        `user-wallet-balance/multi?wallet_id=${body}&formatted=yes&user_id=${params}`
      )
      .then((response) => response.data);
  },

  //   get Transactions

  async getTransactions(params, page) {
    return $request
      .get(`/transactions?user_id=${params}&pageno=${page}`)
      .then((response) => response.data);
  },
};

export default appDomain;
