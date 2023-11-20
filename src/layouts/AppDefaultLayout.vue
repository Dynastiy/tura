<template>
  <div class="">
    <app-header class="md:tw-sticky tw-top-0 sm:tw-z-0" />
    <div id="main" class="">
      <div class="tw-p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/Navigation/AppHeader.vue";
export default {
  components: { AppHeader },
  name: "AppDefaultLayout",
  computed: {
    routeParent() {
      return this.$route.meta.header;
    },
  },
};
</script>

<style></style>
