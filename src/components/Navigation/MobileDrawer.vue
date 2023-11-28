<template>
  <div id="app-drawer" class="tw-bg-gray7 tw-h-screen tw-flex tw-flex-col tw-justify-between tw-pt-6">
    <div>
      <div>
    </div>
    <div class="text-center tw-mb-4">
      <div class="text-center">
        <span
          class="tw-mb-3 user-icon tw-h-[60px] tw-mx-auto tw-bg-gray4 tw-w-[60px] tw-rounded-[50%] tw-flex align-items-center tw-justify-center"
        >
          <i-icon icon="gridicons:user" width="80px" />
        </span>
        <h5 class="tw-mb-0 tw-font-bold tw-text-md">{{ user.username }}</h5>
        <span class="tw-text-sm">{{ user.user_email }}</span>
      </div>
      <hr />
    </div>
    <ul>
      <li v-for="item in menu" :key="item.id">
        <div class="menu-item tw-px-4">
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
                <span :class="item.header ? 'menu-title-header' : 'menu-title'">
                  {{ item.title }}
                </span>
                <span class="tw-text-xs tw-text-gray4">
                  {{ item.sub_title }}
                </span>
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
          <!-- <div
                class="sub-menu"
                :class="{ 'sub-menu-open': subMenu === item.id }"
              >
                <span
                  role="button"
                  class="sub-menu-items tw-flex tw-space-x-2"
                  v-for="subMenu in item.children"
                  :key="subMenu.id"
                  @click="$router.push(subMenu.url)"
                  :class="{ 'active-sub-menu': subMenu.subItem === routeName }"
                >
                  <i-icon :icon="subMenu.icon" class="menu-item-icon" />
                  <span class="sub-menu-title"> {{ subMenu.title }} </span>
                </span>
              </div> -->
        </div>
        <hr class="my-2">
      </li>
    </ul>
    </div>

    
  </div>
</template>

<script>
//   import { mapState } from "vuex";
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
     
    };
  },

  methods: {
    goToLink(item) {
      if(item.parent === 'sign-out') {
        this.logout()
      }
      else {
        this.$router.push(item.url).catch(() => {});
      }
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
    //   openSubMenu(item) {
    //     let value = this.subMenu === item.id ? null : item.id;
    //     this.$store.commit("drawer/SET_SUB_MENU", value);
    //   },

    collapseAppDrawer() {
      this.$store.dispatch("drawer/setCollapseState");
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
    //   ...mapState("drawer", {
    //     isCollapsed: (state) => state.collapsed,
    //     subMenu: (state) => state.subMenu,
    //   }),
  },
};
</script>

<style>
#app-drawer li {
  list-style: none;
}

/* When Menu is collapsed */
#app-drawer.collapsible {
  width: 120px;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .menu-item-link .menu-title {
  display: none;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .sub-menu .sub-menu-items .sub-menu-title {
  display: none;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .menu-item-link .menu-title-header {
  font-size: 11px;
}

#app-drawer.collapsible ul li .menu-item-link,
#app-drawer ul li .menu-icon {
  padding: 1rem 1.3rem;
}

#app-drawer ul li .menu-item-link {
  color: var(--gray-900);
  font-weight: 500;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  gap: 10px;
  font-size: 14px;
  padding: 0.6rem;
  justify-content: space-between;
  align-items: center;
}

#app-drawer ul li .menu-item-link:hover {
  background-color: var(--secondary-color);
  color: var(--gray-100);
  transition: all 0.3s;
}

#app-drawer .menu-icon {
  background-color: var(--white-50);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 30px;
}

#app-drawer ul li .menu-item-link.active-link {
  background-color: var(--primary-color);
  color: var(--white-50);
  font-weight: 500;
}

#app-drawer ul li .menu-item-link .menu-item-icon,
#app-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  background: var(--tertiary-color);
  color: var(--primary-color);
  padding: 4px;
  border-radius: 50%;
}

#app-drawer.collapsible ul li .sub-menu .sub-menu-items {
  padding: 1em 0 1em 1.8rem;
}

#app-drawer ul li .sub-menu .sub-menu-items {
  color: var(--primary-100);
  font-weight: 500;
  font-size: 14px;
  padding: 1.3em 0 1em 2.5rem;
}

#app-drawer ul li .sub-menu .sub-menu-items.active-sub-menu {
  background-color: var(--primary-color);
  color: var(--gray-800);
}

.sub-menu {
  height: 0;
  overflow-y: hidden;
  transition: all 3s;
}
.sub-menu-open {
  height: auto;
  transition: all 3s;
}
</style>
