import $request from "@/https/middleware";

const middleware = {
  // Stake
  async stake(formData) {
    return $request.post("stake", formData).then((response) => response.data);
  },

};

export default middleware;
