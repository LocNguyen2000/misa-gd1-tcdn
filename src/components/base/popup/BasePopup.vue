<template>
  <div class="m-shadow-box" >
    <div class="m-popup">
      <div class="m-popup-body">
        <div class="popup-content flex">
          <!-- POPUP XÁC NHẬN -->
          <div class="flex" v-if="this.type == misaEnum.popupEnum.confirm">
            <div class="m-icon icon--avatar-48 icon--confirm-exclamation"></div>
          </div>
          <!-- POPUP CẢNH BÁO -->
          <div class="flex" v-else-if="this.type == misaEnum.popupEnum.warning">
            <div class="m-icon icon--avatar-48 icon--confirm-exclamation"></div>
          </div>
          <!-- POPUP BÁO LỖI -->
          <div class="flex" v-else-if="this.type == misaEnum.popupEnum.alert">
            <div class="m-icon icon--avatar-48 icon--alert-exclamation"></div>
          </div>
          <!-- POPUP HIỆN KHI ĐÓNG FORM -->
          <div class="flex" v-else-if="this.type == misaEnum.popupEnum.question">
            <div class="m-icon icon--avatar-48 icon--question-mark"></div>
          </div>

          <!-- NỘI DUNG POPUP -->
          <div class="m-popup-text">{{ this.content }}</div>

        </div>
        <div class="popup-line"></div>
        <div class="m-popup-footer">
          <!-- POPUP XÁC NHẬN -->
          <div
            class="flex space-between"
            v-if="this.type == misaEnum.popupEnum.confirm"
          >
            <button
              class="m-btn btn-size-default m-btn-secondary"
              @click="closePopup"
            >
              Không
            </button>
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="confirmBtnHandler"
            >
              Có
            </button>
          </div>
          <!-- POPUP CẢNH BÁO -->
          <div
            class="flex justify-center"
            v-else-if="this.type == misaEnum.popupEnum.warning"
          >
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="closePopup"
            >
              Đóng
            </button>
          </div>
          <!-- POPUP BÁO LỖI -->
          <div
            class="flex flex-align-center justify-center"
            v-else-if="this.type == misaEnum.popupEnum.alert"
          >
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="closePopup"
            >
              Đóng
            </button>
          </div>
          <!-- POPUP HIỆN KHI ĐÓNG FORM -->
          <div class="flex" v-else-if="this.type == misaEnum.popupEnum.question">
            <button
              class="m-btn btn-size-default m-btn-secondary"
              @click="closePopup"
            >
              Huỷ
            </button>
            <div class="flex-grow"></div>
            <button
              class="m-btn btn-size-default m-btn-secondary"
              style="margin-right: 8px"
              @click="declineBtnHandler"
            >
              Không
            </button>
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="confirmBtnHandler"
            >
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popup-dialog",

  props: ["content", "type"],
  /**
   * Mô tả : Cài đặt type của popup dựa theo id trong popup.css (Warn-Delete-Notify)
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 12:02 31/03/2022
   */

  methods: {
    /**
     * Mô tả : đóng popup và không confirm >> emit lên component cha
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:33 31/03/2022
     */
    closePopup() {
      this.$emit("closePopup", false);
    },
    /**
     * Mô tả : Confirm sự kiện và emit lên cha
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 15:26 31/03/2022
     */
    confirmBtnHandler() {
      this.confirmMsg = true;
      this.$emit("confirmCallback");
      this.$emit("closePopup", false, this.confirmMsg);
    },

    declineBtnHandler(){
      this.confirmMsg = false;
      this.$emit("declineCallback");
      this.$emit("closePopup", false, this.confirmMsg);
    }
  },
  data() {
    return {
      confirmMsg: false,
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/popup.css");
@import url("@/css/components/dialog.css");
</style>