<template>
  <div class="m-app">
    <TheSidebar />
    <div class="m-content-wrapper">
      <TheNavbar />
      <TheContent />
    </div>
  </div>
</template>

<script>
import TheContent from "@/components/layout/TheContent.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheSidebar from "@/components/layout/TheSidebar.vue";

export default {
  name: "App",
  components: {
    TheContent,
    TheNavbar,
    TheSidebar,
  },
};
</script>

<style>
@import url("@/css/main.css");
@import url("@/css/common.css");
@import url("@/css/components/icon.css");
@import url("@/css/common/width.css");
@import url("@/css/common/padding.css");

</style>
