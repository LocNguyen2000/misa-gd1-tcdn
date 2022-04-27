<template>
  <div class="m-sidebar">
    <div class="m-logo-container">
      <div class="menu-container"></div>
      <div class="logo-icon"></div>
    </div>
    <div class="m-menu-item-list">
      <div
        class="m-menu-item"
        :class="{ 'active': selectRowItem == item.icon }"
        v-for="(item, index) of menuItemList"
        :key="index"
        @click="clickMenuItem(item)"
        :title="item.title"
      >
      
        <div class="m-icon" :class="item.icon"></div>
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "the-sidebar",
  mounted(){
    this.menuItemList = this.misaResource.SideBarList
  },
  methods: {
      /**
      * Mô tả : sự kiện click item trong danh sách menu navbar
      * Created by: Nguyễn Hữu Lộc - MF1099
      * Created date: 14:49 04/04/2022
      */
     clickMenuItem(item){
        this.selectRowItem = item.title
     }
  },
  data() {
    return {
      selectRowItem: null,
      menuItemList: [],
    };
  },
};
</script>
<style scoped>
@import url("@/css/layout/sidebar.css");
@import url("@/css/components/tooltip.css");
</style>