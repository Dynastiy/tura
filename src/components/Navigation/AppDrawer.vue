<template>
  <div
    id="app-drawer"
    class=" tw-bg-white tw-pt-6 tw-pb-24 lg:tw-z-2 md:tw-z-2 lg:tw-fixed tw-shadow-lg md:tw-fixed tw-absolute lg:tw-left-0 md:tw-left-0 tw-top-22 tw-h-screen tw-overflow-auto tw-w-[250px]"
  >
    <!-- <div>
      {{ userMeta }}
    </div> -->
    <ul class="tw-p-0 tw-flex tw-flex-col tw-gap-3">
      <li v-for="(item, idx) in menu" :key="idx">
        <div class="menu-item tw-px-3">
          <span
            class="menu-item-link"
            :role="item.header ? '' : 'button'"
            @click="item.hasChildren ? openSubMenu(item) : goToLink(item)"
            :class="{ 'active-link': item.parent === routeParent }"
          >
            <div class="tw-flex  tw-gap-3 tw-items-center">
              <i-icon
                :icon="item.icon"
                v-if="item.icon"
                class="menu-item-icon"
              />
              <span class="tw-flex flex-column">
                <span :class="item.header ? 'menu-title-header' : 'menu-title'">
                  {{ item.title }}
                </span>
                <!-- <span class="tw-text-xs tw-text-gray4">
                  {{ item.sub_title }}
                </span> -->
              </span>
            </div>
          </span>
        </div>
      </li>
    </ul>
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
    userMeta() {
      return this.$store.getters["auth/getUserMeta"];
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
  gap: 8px;
  font-size: 13px;
  padding: 0.6rem;
  justify-content: space-between;
  align-items: center;
}

#app-drawer ul li .menu-item-link:hover {
  /* background-color: var(--secondary-color); */
  color: var(--primary-color);
  transition: all 0.3s;
}

#app-drawer .menu-icon {
  background-color: var(--white-50);
  width: 60px;
  height:60px;
  border-radius: 50%;
  /* margin-bottom: 30px; */
}

#app-drawer ul li .menu-item-link.active-link {
  background-color: var(--primary-color);
  color: var(--white-50);
  font-weight: 500;
  border-radius: 6px;
}

#app-drawer ul li .menu-item-link .menu-item-icon,
#app-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  background: #fff;
  color: var(--primary-color);
  padding: 5px;
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
