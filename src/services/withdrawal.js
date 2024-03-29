import $request from "axios";
const baseURL = "https://middleware-rimplenet-general.turaai.com/"

const withdrawal = {
  // Request Withdrawal
  async requestWithdrawal(formData, headers) {
    return $request.post(`${baseURL}withdrawal/request`, formData, { headers }).then((response) => response.data)
  },

};

export default withdrawal;
