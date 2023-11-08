<template>
  <div>
    <div class="tw-flex tw-gap-3">
      <span
        v-for="(item, idx) in menu"
        :key="idx"
        class="menu--item"
        role="button"
        :class="[
          item.parent === routeParent ? 'tw-bg-primary tw-text-white' : 'tw-bg-gray-200',
        ]"
        @click="$router.push(item?.href).catch(() => {})"
        >{{ item?.title }}</span
      >
    </div>

    <div class="tw-bg-white tw-p-8 tw-rounded-lg tw-mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "Personal Information",
          href: "/personal-information",
          parent: "personal-information",
        },
        {
          title: "Security",
          href: "/personal-information/security",
          parent: "security",
        },
      ],
    };
  },

  computed: {
    routeParent() {
      return this.$route.meta.subParent;
    },
  },
};
</script>

<style>
.menu--item {
  padding: 5px 15px;
  font-size: 12px;
  border-radius: 5px;
}
</style>
