<template>
  <div class="m-shadow-box">
    <!-- COMPONENT FORM CHI TIẾT NHÂN VIÊN -->
    <div
      class="m-dialog"
      id="popupEmployee"
      style="min-width: 900px; max-width: 900px; width: 900px"
    >
      <!-- HEADER CỦA FORM -->
      <div class="m-dialog-header flex">
        <div class="header-title">Thông tin nhân viên</div>
        <div class="flex flex-align-center">
          <div class="checkbox-wrapper flex flex-align-center pd-l-r">
            <div class="m-checkbox"></div>
            <label class="m-label-secondary"> Là khách hàng </label>
          </div>
          <div class="checkbox-wrapper flex flex-align-center pd-l-r">
            <div class="m-checkbox"></div>
            <label class="m-label-secondary"> Là nhà cung cấp </label>
          </div>
        </div>

        <div class="flex-grow"></div>
        <div class="header-btn-close flex">
          <div class="m-icon icon--help mg-r-6"></div>
          <!-- NÚT ĐÓNG FORM >> HIỆN POPUP NẾU THAY ĐỔI DỮ LIỆU -->
          <div
            class="m-icon icon--close"
            title="Đóng (ESC)"
            @click="
              setCloseDialog(
                !isMatch(this.currentEmployee, this.compareEmployee)
              )
            "
          ></div>
        </div>
      </div>
      <!-- NỘI DUNG CỦA FORM -->
      <div class="m-dialog-content">
        <div class="content-container flex">
          <div class="container-left">
            <div class="row-input flex">
              <div class="pd-r-6 w-40">
                <div class="m-label">
                  Mã
                  <span class="required">*</span>
                </div>
                <BaseInput
                  propName="EmployeeCode"
                  ref="EmployeeCode"
                  v-model="this.currentEmployee.EmployeeCode"
                  tabindex="1"
                />
              </div>
              <div class="w-60">
                <div class="m-label">
                  Tên
                  <span class="required">*</span>
                </div>
                <BaseInput
                  propName="FullName"
                  ref="FullName"
                  v-model="this.currentEmployee.FullName"
                />
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-full">
                <div class="m-label">
                  Đơn vị <span class="required">*</span>
                </div>
                <BaseComboBox
                  ref="DepartmentId"
                  :api="misaApi.getDepartment"
                  propTxt="DepartmentName"
                  propValue="DepartmentId"
                  v-model="this.currentEmployee.DepartmentId"
                />
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-full">
                <div class="m-label">Chức danh</div>
                <BaseInput
                  propName="PositionName"
                  v-model="this.currentEmployee.PositionName"
                />
              </div>
            </div>
          </div>
          <div class="container-right">
            <div class="row-input flex">
              <div class="w-40 pd-r-6">
                <div class="m-label">Ngày sinh</div>
                <!-- eslint-disable  -->
                <DatePicker
                  v-model:value="formatDOB"
                  :format="'DD/MM/YYYY'"
                  :placeholder="'DD/MM/YYYY'"
                  :lang="'vi'"
                  :clearable="false"
                  title-format="'DD/MM/YYYY'"
                  :disabled-date="afterToday"
                />
                <!-- eslint-enable  -->
              </div>
              <div class="w-60 pd-b-l">
                <div class="m-label">Giới tính</div>
                <div class="ratio-check-detail">
                  <label
                    class="m-radio"
                    v-for="(value, key, index) in this.misaResource.Gender"
                    :key="index"
                  >
                    <input
                      class="m-inner-ratio"
                      type="radio"
                      name="radio"
                      :value="value"
                      v-model="this.currentEmployee.Gender"
                    />
                    <span class="m-radio-name">{{ key }}</span>
                    <span class="m-radio-marked"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-60 pd-r-6">
                <div class="m-label" title="Số chứng minh nhân dân">Số CMND</div>
                <BaseInput
                  propName="IdentityNumber"
                  ref="IdentityNumber"
                  v-model="this.currentEmployee.IdentityNumber"
                />
              </div>
              <div class="w-40">
                <div class="m-label">Ngày cấp</div>
                <!-- eslint-disable  -->
                <DatePicker
                  v-model:value="formatIdentityDate"
                  :format="'DD/MM/YYYY'"
                  :placeholder="'DD/MM/YYYY'"
                  :lang="'vi'"
                  :clearable="false"
                  title-format="'DD/MM/YYYY'"
                  :disabled-date="afterToday"
                />
                <!-- eslint-enable  -->
              </div>
            </div>
            <div class="row-input flex">
              <div class="w-full">
                <div class="m-label">Nơi cấp</div>
                <BaseInput
                  propName="IdentityPlace"
                  v-model="this.currentEmployee.IdentityPlace"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row-input flex">
          <div class="w-full">
            <div class="m-label">Địa chỉ</div>
            <BaseInput
              propName="ContactAddress"
              v-model="this.currentEmployee.ContactAddress"
            />
          </div>
        </div>
        <div class="row-input flex">
          <div class="w-25 pd-r-6">
            <div class="m-label" title="Điện thoại di động">ĐT di động</div>
            <BaseInput
              propName="PhoneNumber"
              ref="PhoneNumber"
              v-model="this.currentEmployee.PhoneNumber"
            />
          </div>
          <div class="w-25 pd-r-6">
            <div class="m-label" title="Điện thoại cố định">ĐT cố định</div>
            <BaseInput
              propName="LandlineNumber"
              ref="LandlineNumber"
              v-model="this.currentEmployee.LandlineNumber"
            />
          </div>
          <div class="w-25 pd-r-6">
            <div class="m-label">Email</div>
            <BaseInput
              propName="Email"
              ref="Email"
              v-model="this.currentEmployee.Email"
            />
          </div>
          <div class="w-25"></div>
        </div>
        <div class="row-input flex">
          <div class="w-25 pd-r-6">
            <div class="m-label">Tài khoản ngân hàng</div>
            <BaseInput
              propName="BankAccount"
              v-model="this.currentEmployee.BankAccount"
            />
          </div>
          <div class="w-25 pd-r-6">
            <div class="m-label">Tên ngân hàng</div>
            <BaseInput
              propName="BankName"
              v-model="this.currentEmployee.BankName"
            />
          </div>
          <div class="w-25 pd-r-6">
            <div class="m-label">Chi nhánh</div>
            <BaseInput
              propName="BankBranch"
              v-model="this.currentEmployee.BankBranch"
            />
          </div>
          <div class="w-25"></div>
        </div>
        <!-- CHÂN FOOTER CỦA FORM -->
        <div class="content-footer">
          <div class="divider"></div>
          <div class="footer-btn-group flex">
            <!-- ĐÓNG FORM KHÔNG CHECK THAY ĐỔI -->
            <button
              class="m-btn btn-size-default m-btn-secondary"
              @click="setCloseDialog(false)"
            >
              Hủy
            </button>
            <div class="flex-grow"></div>
            <!-- LƯU DỮ LIỆU + ĐÓNG FORM -->
            <button
              class="m-btn btn-size-default m-btn-secondary mg-r-6"
              @click="saveEventHandler(true)"
            >
              Cất
            </button>
            <!-- LƯU DỮ LIỆU + RESET FORM  -->
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="saveEventHandler(false)"
              @blur="setFirstTabIndex"
            >
              Cất và Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

import BaseInput from "@/components/base/BaseInput.vue";
import BaseComboBox from "@/components/base/BaseComboBox.vue";
import { isValidateEmail, formatDateInForm, isMatch } from "@/js/utils";
import Helper from "@/js/helper";

export default {
  name: "employee-detail",
  components: {
    BaseInput,
    BaseComboBox,
    DatePicker,
  },
  props: {
    formMode: { type: Number },
    empSelected: { type: Object },
  },
  emits: ["setShowDialog", "setShowPopup", "setShowToast"],
  computed: {
    // Ngày cấp CCCD được format lại
    formatIdentityDate: {
      get() {
        if (!this.currentEmployee.IdentityDate) return;
        return new Date(this.currentEmployee.IdentityDate);
      },
      set(newValue) {
        console.log(newValue.toDateString());
        this.currentEmployee.IdentityDate = newValue.toDateString();
      },
    },
    // Ngày sinh được format lại
    formatDOB: {
      get() {
        if (!this.currentEmployee.DateOfBirth) return;
        return new Date(this.currentEmployee.DateOfBirth);
      },
      set(newValue) {
        console.log(newValue.toDateString());
        this.currentEmployee.DateOfBirth = newValue.toDateString();
      },
    },
  },
  mounted() {
    // Khi form được hiện lên (mounted vào DOM)
    // Gán dữ liệu nhân viên + focus vào ô mã nhân viên đầu tiên
    this.currentEmployee = this.empSelected;
    this.$refs.EmployeeCode.setFocus();

    // Gán đối tượng để khi đóng form >> so sánh xem có thay đổi
    Object.assign(this.compareEmployee, this.currentEmployee);

    // Class tiện ích kéo form nhân viên được = jquery
    Helper.draggable("popupEmployee");
  },
  methods: {
    /**
     * Mô tả : Đóng dialog bằng emit lên hàm cha
     * Created by: NHLOC - MF1099
     * Created date: 14:28 16/04/2022
     */
    setCloseDialog(_isChanged = false) {
      // Nếu check thay đổi
      if (_isChanged) {
        // Mở popup xác nhận form thay đổi
        this.setShowPopup(
          true,
          // Trạng thái của popup 
          this.misaEnum.popupEnum.question,
          // Text báo popup muốn xác nhận
          this.popupMsg.confirmChangeDataMsg,
          // Nếu xác nhận "Có" > Chạy hàm lưu dữ liệu
          this.saveEventHandler,
          // "Không" thì đóng form (không lưu)
          this.setCloseDialog
        );
        return;
      }
      // Đóng form nếu không check thay đổi
      this.$emit("setShowDialog", false);
    },
    /**
     * Mô tả : Ẩn và hiện popup bằng hàm emit lên cha
     * Created by: NHLOC - MF1099
     * Created date: 14:28 16/04/2022
     */
    async setShowPopup(
      _isPopup,
      _popupType = null,
      _popupContent = null,
      _callback = null,
      _declineCallback = null
    ) {
      await this.$emit(
        "setShowPopup",
        _isPopup,
        _popupType,
        _popupContent,
        _callback,
        _declineCallback
      );
    },
    /**
     * Mô tả : ẩn hiện toast bằng hàm emit lên cha
     * Created by: NHLOC - MF1099
     * Created date: 21:47 23/04/2022
     */
    setShowToast(_isShowToast, _toastContent = null, _toastType = null) {
      this.$emit("setShowToast", _isShowToast, _toastContent, _toastType);
    },

    /**
     * Mô tả : Sự kiện lưu dữ liệu
     * @param _isCloseForm: (true: cất) hoặc (false: cất và thêm)
     * Created by: NHLOC - MF1099
     * Created date: 14:28 16/04/2022
     */
    async saveEventHandler(_isCloseForm = true) {

      // khởi tạo biến check lỗi
      let isError = false;
      let contentError = "";
      let listError = [];

      // kiểm tra rỗng
      if (!this.currentEmployee.EmployeeCode) {
        // set lỗi
        isError = true;
        contentError = this.errorMsg.notEmptyEmpCode;
        listError.push(contentError);

        this.$refs.EmployeeCode.setError(contentError);
      }
      if (!this.currentEmployee.FullName) {
        // set lỗi

        isError = true;
        contentError = this.errorMsg.notEmptyFullname;
        listError.push(contentError);

        this.$refs.FullName.setError(contentError);
      }
      if (!this.currentEmployee.DepartmentId) {
        // set lỗi

        isError = true;
        contentError = this.errorMsg.notEmptyDepartment;
        listError.push(contentError);

        this.$refs.DepartmentId.setError(contentError);
      }
      // tồn tại email >> kiểm tra format EMAIL
      if (
        this.currentEmployee.Email &&
        !this.isValidateEmail(this.currentEmployee.Email)
      ) {
        // set lỗi
        isError = true;
        contentError = this.errorMsg.formatEmail;
        listError.push(contentError);

        this.$refs.Email.setError(contentError);
      }

      // Kiểm tra có lỗi (Không lỗi > check formMode > chạy api)
      if (isError) {
        // Lỗi > báo popup
        this.setShowPopup(
          true,
          this.misaEnum.popupEnum.alert,
          listError[0]
        );
      } else {
        try {
          if (this.formMode == this.misaEnum.formMode.Edit) {
            await this.editEmployeeFunc();
          } else if (this.formMode == this.misaEnum.formMode.Add) {
            await this.addNewEmployee();
          }
        } catch (error) {
          console.log(error);
          // Mở popup nếu báo lỗi
          this.setShowPopup(true, this.misaEnum.popupEnum.warning, error);

          // nếu có lỗi báo 
          isError = true;
        }
        // Nếu không lỗi sau khi validate ở Backend thì chạy code tiếp
        if (!isError) {
          // Cất
          if (_isCloseForm == true) {
            this.setCloseDialog();
          }
          // cất và thêm mới
          else {
            // Lấy mã mới + focus
            await this.getNewEmpCode();
            this.$refs.EmployeeCode.setFocus();

            // Gán đối tượng để khi đóng form >> so sánh xem có thay đổi
            this.compareEmployee = Object.assign({}, this.currentEmployee);
          }
        }
      }
    },
    // API
    /**
     * Mô tả : Hàm chạy API sửa dữ liệu
     * Created by: NHLOC - MF1099
     * Created date: 23:04 20/04/2022
     */
    async editEmployeeFunc() {
      // Lấy nhân viên hiện tại
      const employeeData = this.currentEmployee;

      // lấy api update từ resource
      const editEmployeeAPI = `${this.misaApi.updateEmployee}/${this.empSelected.EmployeeId}`;

      try {
        // chạy axios 
        const response = await axios.put(editEmployeeAPI, employeeData);

        console.log("Thành công", response.data);

        // Reset dữ liệu nhân viên
        this.currentEmployee = {};

        // báo toast
        this.setShowToast(
          true,
          // text báo "cập nhật thành công"
          this.toastMsg.updateSuccessMsg,
          // enum cho loại toast thành công
          this.misaEnum.toastEnum.success
        );
      } catch (error) {
        // Xử lý lỗi axios
        if (error.response) {
          console.log("Lỗi", error.response);

          const errorResponse = error.response.data.Data;
          console.log(errorResponse);
          console.log(errorResponse[Object.keys(errorResponse)[0]]);
          let errMsg = errorResponse[Object.keys(errorResponse)[0]];

          // ném lỗi lên cho hàm save bắt
          throw errMsg;
        } 
        // Xử lý lỗi chung
        else {
          console.log("Lỗi", error.message);

          // ném lỗi lên cho hàm save bắt
          throw this.errorMsg.common;
        }
      }
    },
    /**
     * Mô tả : API Thêm mới dữ liệu
     * Created by: NHLOC - MF1099
     * Created date: 09:35 23/04/2022
     */
    async addNewEmployee() {
      // Lấy nhân viên hiện tại
      const employeeData = this.currentEmployee;

      // lấy api thêm mới
      const addEmployeeAPI = `${this.misaApi.addEmployee}`;

      try {
        // chạy api
        const response = await axios.post(addEmployeeAPI, employeeData);

        console.log("Thành công", response.data);

        // Thành công thì reset nhân viên
        this.currentEmployee = {};

        // báo toast > thêm mới thành công > enum báo thành công
        this.setShowToast(
          true,
          this.toastMsg.addSuccessMsg,
          this.misaEnum.toastEnum.success
        );
      } catch (error) {
        // bắt lỗi của axios
        if (error.response) {
          console.log("Lỗi", error.response);

          const errorResponse = error.response.data.Data;
          let errMsg = errorResponse[Object.keys(errorResponse)[0]];

          // ném lỗi lên cho hàm save bắt
          throw errMsg;
        } else {
          console.log("Lỗi", error.message);

          // ném lỗi lên cho hàm save bắt
          throw this.errorMsg.common;
        }
      }
    },
    /**
     * Mô tả : reset form
     * Created by: NHLOC - MF1099
     * Created date: 09:33 23/04/2022
     */
    async getNewEmpCode() {
      try {
        // Lấy mã nhân viên mới
        const localAPI = this.misaApi.getNewEmployeeCode;

        // chạy api
        const response = await axios.get(localAPI);

        let newCode = `NV-${response.data}`;

        // cập nhật và trường của nhân viên trong form
        this.currentEmployee = { EmployeeCode: newCode };
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Hàm tiện ích
     * Created by: NHLOC - MF1099
     * Created date: 23:04 20/04/2022
     */
    isValidateEmail,
    formatDateInForm,
    isMatch,
    setFirstTabIndex(){
      this.$refs.EmployeeCode.setFocus()
    },
    afterToday(date) {
      return date > new Date();
    },
  },
  data() {
    return {
      isCloseForm: false,
      currentEmployee: {},
      compareEmployee: {},
      requiredField: ["EmployeeCode", "FullName", "DepartmentId"],
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/datepicker.css");
@import url("@/css/components/dialog.css");
@import url("@/css/components/radio.css");
@import url("@/css/components/label.css");

.movable {
  cursor: grabbing;
}
</style>