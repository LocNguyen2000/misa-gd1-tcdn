<template>
  <div class="m-shadow-box" v-if="isShowDialog">
    <div
      class="m-dialog"
      style="min-width: 900px; max-width: 900px; width: 900px"
    >
      <div class="m-dialog-header flex">
        <div class="header-title">Thông tin nhân viên</div>
        <div class="flex-grow"></div>
        <div class="header-btn-close flex">
          <div class="m-icon icon--help mg-r-6"></div>
          <div class="m-icon icon--close"></div>
        </div>
      </div>
      <div class="m-dialog-content">
        <div class="content-container flex">
          <div class="container-left">
            <div class="row-input flex">
              <div class="pd-r-6 w-40">
                <label class="m-label">
                  Mã
                  <span class="required">*</span>
                </label>
                <BaseInput />
              </div>
              <div class="w-60">
                <label class="m-label">
                  Tên
                  <span class="required">*</span>
                </label>
                <BaseInput />
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-full">
                <label class="m-label">
                  Đơn vị <span class="required">*</span>
                </label>
                <BaseInput />
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-full">
                <label class="m-label"> Chức danh </label>
                <BaseInput />
              </div>
            </div>
          </div>
          <div class="container-right">
            <div class="row-input flex">
              <div class="w-40 pd-r-6">
                <label class="m-label"> Ngày sinh </label>
                <BaseInput />
              </div>
              <div class="w-60">
                <label class="m-label"> Giới tính </label>
                <BaseInput />
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-60 pd-r-6">
                <label class="m-label"> Số CMND </label>
                <BaseInput />
              </div>
              <div class="w-40">
                <label class="m-label">Ngày cấp </label>
                <BaseInput />
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-full">
                <label class="m-label">Nơi cấp </label>
                <BaseInput />
              </div>
            </div>
          </div>
        </div>
        <div class="row-input flex">
          <div class="w-full">
            <label class="m-label"> Địa chỉ </label>
            <BaseInput />
          </div>
        </div>
        <div class="row-input flex">
          <div class="w-25 pd-r-6">
            <label class="m-label"> ĐT di động </label>
            <BaseInput />
          </div>
          <div class="w-25 pd-r-6">
            <label class="m-label"> ĐT cố định </label>
            <BaseInput />
          </div>
          <div class="w-25 pd-r-6">
            <label class="m-label"> Email </label>
            <BaseInput />
          </div>
          <div class="w-25"></div>
        </div>
        <div class="row-input flex">
          <div class="w-25 pd-r-6">
            <label class="m-label"> ĐT di động </label>
            <BaseInput />
          </div>
          <div class="w-25 pd-r-6">
            <label class="m-label"> ĐT cố định </label>
            <BaseInput />
          </div>
          <div class="w-25 pd-r-6">
            <label class="m-label"> Email </label>
            <BaseInput />
          </div>
          <div class="w-25"></div>
        </div>
        <div class="content-footer">
          <div class="divider"></div>
          <div class="footer-btn-group flex">
            <button>Hủy</button>
            <div class="flex-grow"></div>
            <button>Cất</button>
            <button>Thêm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";
export default {
  name: "employee-detail",
  components: {
    BaseInput,
  },
  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style scoped>
@import url("@/css/components/dialog.css");
</style>