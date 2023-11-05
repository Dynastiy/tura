<template>
  <div class="">
    <div
      class="tw-p-6 tw-bg-white tw-shadow-sm md:tw-relative lg:tw-relative tw-z-auto lg:tw-z-10 md:tw-z-10"
    >
      <div class="tw-flex tw-justify-between align-items-center">
        <span
          role="button"
          class="lg:tw-hidden md:tw-hidden"
          @click="drawer = !drawer"
        >
          <i-icon icon="grommet-icons:menu" width="28px" />
        </span>
        <span
          class="tw-font-bold"
          role="button"
          @click="$router.push('/dashboard')"
          >TURA</span
        >
        <span role="button" class="lg:tw-block md:tw-block tw-hidden">
          <i-icon icon="ep:menu" width="25px" />
        </span>
      </div>
    </div>
    <div class="">
      <el-drawer
        :with-header="false"
        :visible.sync="drawer"
        direction="ltr"
        size="80%"
      >
        <div class="tw-mt-8">
          <div class="text-center">
          <span
            class="tw-mb-3 user-icon tw-h-[60px] tw-mx-auto tw-bg-gray4 tw-w-[60px] tw-rounded-[50%] tw-flex align-items-center tw-justify-center"
          >
            <i-icon icon="gridicons:user" width="80px" />
          </span>
          <h5 class="tw-mb-0 tw-font-bold tw-text-md">{{ "BossJohn" }}</h5>
          <span class="tw-text-sm">{{ "user.user_email" }}</span>
        </div>
        <ul class="tw-p-0 tw-flex tw-flex-col tw-gap-6 tw-mt-4">
          <li v-for="item in menu" :key="item.id">
            <div class="menu-item tw-px-6">
              <span
                class="menu-item-link"
                :role="item.header ? '' : 'button'"
                @click="item.hasChildren ? openSubMenu(item) : goToLink(item)"
                :class="{ 'active-link': item.parent === routeParent }"
              >
                <div class="d-flex align-items-center" style="gap: 10px">
                  <i-icon
                    :icon="item.icon"
                    v-if="item.icon"
                    class="menu-item-icon"
                  />
                  <span class="tw-flex flex-column">
                    <span
                    class="tw-text-sm"
                      :class="item.header ? 'menu-title-header' : 'menu-title'"
                    >
                      {{ item.title }}
                    </span>
                    <!-- <span class="tw-text-xs tw-text-gray4">
                      {{ item.sub_title }}
                    </span> -->
                  </span>
                </div>
                <!-- <span v-if="item.hasChildren">
                  <i-icon
                    :icon="
                      subMenu === item.id ? 'prime:angle-down' : 'prime:angle-right'
                    "
                    width="30px"
                  />
                </span> -->
              </span>
            </div>
          </li>
        </ul>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
// import AppDrawer from "./MobileDrawer.vue";
export default {
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style></style>
