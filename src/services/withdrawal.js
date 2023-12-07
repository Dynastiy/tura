import $request from "@/https/withdrawal";

const withdrawal = {
  // Request Withdrawal
  async requestWithdrawal(formData) {
    return $request.post("request-withdrawal", formData).then((response) => response.data)
  },

};

export default withdrawal;
