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
      menuItemList: [
        {
          icon: "icon--overview",
          title: "Tổng quan",
        },
        {
          icon: "icon--cash",
          title: "Tiền mặt",
        },
        {
          icon: "icon--bank",
          title: "Tiền gửi",
        },
        {
          icon: "icon--buy",
          title: "Mua hàng",
        },
        {
          icon: "icon--sell",
          title: "Bán hàng",
        },
        {
          icon: "icon--invoice",
          title: "Quản lý hóa đơn",
        },
        {
          icon: "icon--stock",
          title: "Kho",
        },
        {
          icon: "icon--tools",
          title: "Công cụ dụng cụ",
        },
        {
          icon: "icon--asset",
          title: "Tài sản cố định",
        },
        {
          icon: "icon--tax",
          title: "Thuế",
        },
        {
          icon: "icon--price",
          title: "Giá thành",
        },
        {
          icon: "icon--general",
          title: "Tổng hợp",
        },
        {
          icon: "icon--budget",
          title: "Ngân sách",
        },
        {
          icon: "icon--report",
          title: "Báo cáo",
        },
        {
          icon: "icon--finance",
          title: "Phân tích tài chính",
        },
      ],
    };
  },
};
</script>
<style scoped>
@import url("@/css/layout/sidebar.css");
@import url("@/css/components/tooltip.css");
</style>