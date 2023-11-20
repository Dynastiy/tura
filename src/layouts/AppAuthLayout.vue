<template>
  <div>
    <div class="tw-h-screen tw-py-8 tw-flex tw-justify-center tw-items-center tw-overflow-auto">
      <div
        class="lg:tw-w-4/12 md:tw-w-6/12 tw-w-10/12 tw-shadow-lg tw-bg-white tw-p-6 tw-rounded-lg"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppAuthLayout",
};
</script>

<style></style>
