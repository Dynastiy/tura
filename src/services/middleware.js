import $request from "@/https/middleware";

const middleware = {
 

   // stake
   async stake(formData) {
    return $request.post("stake", formData).then((response) => response.data)
  },

   // Swap
   async swap(formData) {
    return $request.post("swap", formData).then((response) => response.data)
  },

  // Swap Rate
  async getStakeRate(payload) {
    return $request.get(`conversion-rate?from=${payload.from}&to=${payload.to}`).then((response) => response.data)
  }

  

};

export default middleware;
