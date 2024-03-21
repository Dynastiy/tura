import $request from "axios";
const baseURL = "https://middleware-flash.turaai.com/"

const middleware = {
   // stake
   async stake(formData) {
    return $request.post(baseURL+"stake", formData).then((response) => response.data)
  },

   // Swap
   async swap(formData) {
    return $request.post(baseURL+"swap", formData).then((response) => response.data)
  },

  // Swap Rate
  async getStakeRate(payload) {
    return $request.get(`${baseURL}conversion-rate?from=${payload.from}&to=${payload.to}`).then((response) => response.data)
  }
};

export default middleware;
