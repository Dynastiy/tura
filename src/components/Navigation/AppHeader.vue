<template>
  <div class="" id="mobile-drawer">
    <div
      class="tw-p-6 tw-bg-white tw-shadow-sm md:tw-relative lg:tw-relative tw-z-auto lg:tw-z-10 md:tw-z-10"
    >
      <div class="tw-flex tw-justify-between align-items-center">
        <span class="tw-font-bold" role="button" @click="$router.push('/')"
          >Tura AI</span
        >

        <div class="tw-flex tw-gap-3 tw-items-center">
          <div class="tw-flex tw-items-center tw-gap-1">
            <span
              class="tw-uppercase tw-bg-gray-300 tw-h-[30px] tw-w-[30px] tw-flex tw-items-center tw-justify-center tw-font-bold tw-rounded-full"
            >
              {{ user.username.charAt(0) }}
            </span>
            <div class="lg:tw-block md:tw-block tw-hidden">
              <!-- <h5 class="tw-mb-0 tw-font-bold tw-text-md">Welcome</h5> -->
              <span
                class="tw-text-sm tw-capitalize tw-font-semibold tw-block"
                >{{ "Hi, " + user.username }}</span
              >
              <span class="tw-text-xs tw-block">{{ user.user_email }}</span>
            </div>
            <div>
              <!-- <span role="button">
                  <i-icon icon="prime:angle-down" width="28px" />
                </span> -->

              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i-icon icon="prime:angle-down" width="20px" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    ><span @click="$router.push('/personal-information')">
                      View Profile
                    </span></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <span @click="logout"> Logout </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <span
            role="button"
            class="lg:tw-hidden md:tw-hidden"
            @click="drawer = !drawer"
          >
            <i-icon icon="grommet-icons:menu" width="28px" />
          </span>
        </div>
      </div>
    </div>
    <div class="">
      <el-drawer
        :with-header="false"
        :visible.sync="drawer"
        direction="rtl"
        size="80%"
      >
        <div class="tw-mt-8">
          <div class="text-center">
            <span
              class="tw-mb-3 user-icon tw-h-[60px] tw-mx-auto tw-bg-gray4 tw-w-[60px] tw-rounded-[50%] tw-flex align-items-center tw-justify-center"
            >
              <i-icon icon="gridicons:user" width="80px" />
            </span>
            <h5 class="tw-mb-0 tw-font-bold tw-text-md tw-capitalize">
              {{ user.username }}
            </h5>
            <span class="tw-text-xs">{{ user.user_email }}</span>
          </div>
          <ul class="tw-p-0 tw-flex tw-flex-col tw-gap-2 tw-mt-4">
            <li v-for="item in menu" :key="item.id">
              <div class="menu-item tw-px-3">
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
                        :class="
                          item.header ? 'menu-title-header' : 'menu-title'
                        "
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

  methods: {
    goToLink(item) {
      this.$router.push(item.url).catch(() => {});
    },

    logout() {
      this.$swal
        .fire({
          title: "Uhhhh! 😔",
          text: "Are you sure you want to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, logout!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.userLogout();
          }
        });
    },

    userLogout() {
      this.$store.dispatch("auth/logout");
      this.$swal
        .fire({
          title: "Woo hoo 😫",
          text: "Logged out succesfully",
          icon: "success",
          confirmButtonText: "Ok!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.$router.go();
          }
        });
    },
  },

  computed: {
    routeName() {
      return this.$route.meta.name;
    },
    routeParent() {
      return this.$route.meta.parent;
    },
    user() {
      return this.$store.getters["auth/getUser"];
    },
    userMeta() {
      return this.$store.getters["auth/getUserMeta"];
    },
  },
};
</script>

<style>
#mobile-drawer ul li .menu-item-link {
  color: var(--gray-900);
  font-weight: 500;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  gap: 8px;
  font-size: 13px;
  padding: 0.6rem;
  justify-content: space-between;
  align-items: center;
}

#mobile-drawer ul li .menu-item-link:hover {
  /* background-color: var(--secondary-color); */
  color: var(--primary-color);
  transition: all 0.3s;
}

#mobile-drawer .menu-icon {
  background-color: var(--white-50);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* margin-bottom: 30px; */
}

#mobile-drawer ul li .menu-item-link.active-link {
  background-color: var(--primary-color);
  color: var(--white-50);
  font-weight: 500;
  border-radius: 6px;
}

#mobile-drawer ul li .menu-item-link .menu-item-icon,
#mobile-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  background: #fff;
  color: var(--primary-color);
  padding: 5px;
  border-radius: 50%;
}

#mobile-drawer.collapsible ul li .sub-menu .sub-menu-items {
  padding: 1em 0 1em 1.8rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items {
  color: var(--primary-100);
  font-weight: 500;
  font-size: 14px;
  padding: 1.3em 0 1em 2.5rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items.active-sub-menu {
  background-color: var(--primary-color);
  color: var(--gray-800);
}
</style>
