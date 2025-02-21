<template>
  <div class="wrapper">
    <header-view></header-view>
    <sidebar-view></sidebar-view>
    <RouterView
        v-if="((authorized&&$store.state.user.user) || $route.name=='login')"
        class=""/>
    <footer-view></footer-view>
  </div>
</template>

<script>
import {useHead} from "@vueuse/head";
import HeaderView from "./Elements/HeaderView.vue";
import FooterView from "./Elements/FooterView.vue";
import SidebarView from "./Elements/SidebarView.vue";
import $ from "jquery";
import "jquery-ui";

export default {
  name: "AdminMainView",
  components: {HeaderView, SidebarView, FooterView},
  setup() {
    useHead({
      title: "AdminPage",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback",
        },
        {
          rel: "stylesheet",
          href: "/plugins/fontawesome-free/css/all.min.css",
        },
        {
          rel: "stylesheet",
          href: "/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
        },
        {
          rel: "stylesheet",
          href: "/dist/css/adminlte.min.css",
        },
      ],
    });
  },
  computed: {
    authorized() {
      return this.$store.state.auth.authorized;
    },
  },
  mounted() {
    document.body.classList.add('sidebar-mini');
    document.body.classList.add('layout-fixed');
    window.$ = window.jQuery = $;
    this.loadScript("/plugins/bootstrap/js/bootstrap.bundle.min.js");
    this.loadScript("/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js");
    this.loadScript("/dist/js/adminlte.js");
  },
  methods: {
    loadScript(src, callback) {
      let script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        if (callback) callback();
      };
      document.body.appendChild(script);
    },
  },
};
</script>
<style scoped>

</style>
