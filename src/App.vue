<template>
  <Sidebar ref="sidebar" @names-changed="updateData($event)" />
  <router-view v-show="visible"></router-view>
</template>

<script>
import Sidebar from "./pages/includes/Sidebar.vue";
import { computed } from "vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
  provide: function () {
    return {
      executeSettings: function (baseApp) {
        baseApp.$refs.sidebar.sidebarExecuted();
      },
      baseApp: this,
      firstItem: computed(() => this.firstItemName),
      secondItem: computed(() => this.secondItemName),
      thirdItem: computed(() => this.thirdItemName),
    };
  },
  data() {
    return {
      firstItemName: "Tree",
      secondItemName: "Products",
      thirdItemName: "Products Tree",
      visible: true,
    };
  },
  methods: {
    updateData: async function (settings) {
      this.firstItemName = settings.firstItem;
      this.secondItemName = settings.secondItem;

      this.visible = false;
      await this.$nextTick();
      this.visible = true;
    },
  },
  head: {
    link: [
      {
        rel: "icon",
        href: require("./assets/logo.png"),
      },
    ],
  },
};
</script>

<style lang="scss"></style>
