import $request from "@/https/middleware";

const middleware = {
  // Swap
  async swap(formData) {
    return $request.post("swap", formData).then((response) => response.data)
  },

  async getStakeRate(payload) {
    return $request.get(`conversion-rate?from=${payload.from}&to=${payload.to}`).then((response) => response.data)
  }

  

};

export default middleware;
