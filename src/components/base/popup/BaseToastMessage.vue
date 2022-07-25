<template>
  <!-- 4 LOẠI TOAST : WARN - SUCCESS - ERROR - INFO -->
  <div class="m-toast-frame" v-if="modelValue">
    <div class="m-toast" :class="type">
      <div class="m-toast-messenger">
        <div class="toast-img"></div>
        <div class="toast-text">{{ this.content }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-toast-message",
  props: {
    // Biến hiện toast
    modelValue: {
      type: Boolean,
      default: false,
    },
    // Loại toast (warning - error - info- success)
    type: {
      type: String,
      default: "",
    },
    // Nội dung toast
    content: {
      type: String,
      default: "",
    },
  },
  /**
   * Mô tả : khi toast hiện > set loại toast dựa theo id và css,
   * đóng toast sau 1-2 giây
   * Alert - Warn - Success - Notify
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 20:40 23/04/2022
   */
  watch: {
    modelValue: function(newValue){
      if (newValue){
        setTimeout(() => {
          this.closeToast();
        }, 1000);
      }
    }
  },
  methods: {
    /**
     * Mô tả : event emit lên cha để đóng toast
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 20:37 01/04/2022
     */
    closeToast() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>
<style scoped>
@import url("@/css/components/toast.css");
</style>