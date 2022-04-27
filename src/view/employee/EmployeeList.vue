<template>
  <div class="m-employee-container">
    <div class="m-title">
      <div class="m-row">
        <div class="title-text">Nhân viên</div>
        <div class="title-btn">
          <button class="m-btn m-btn-primary" @click="btnAddOnClick">
            Thêm mới nhân viên
          </button>
        </div>
      </div>
    </div>
    <div class="layout-employee-list">
      <!-- THANH TOOLBAR NẰM TRƯỚC TABLE -->
      <div class="m-toolbar">
        <!-- THANH DROP DOWN THỰC HIỆN HÀNG LOẠT -->
        <div class="m-dropdown">
          <button
            class="m-btn-dropdown"
            @click="isShowDropdown = !isShowDropdown"
            :disabled="checkedEmployees.length <= 0"
          >
            <span> Thực hiện hàng loạt </span>
            <div class="m-icon icon--arrowup"></div>
          </button>
          <div class="m-dropdown-list" v-if="isShowDropdown & checkedEmployees.length > 0">
            <div class="m-dropdown-item" @click.prevent="deleteManyHandler">
              Xóa hàng loạt
            </div>
          </div>
        </div>

        <div class="flex-grow"></div>

        <!-- THANH TÌM KIẾM, LOAD DỮ LIỆU, XUẤT FILE   -->
        <base-input
          placeholder="Tìm theo mã, tên nhân viên"
          iconName="search"
          :canFocus="true"
          v-model="this.currentEmployeeFilter"
          @input="delaySearch"
        />
        <div class="toolbar-btn-wrapper">
          <div
            class="m-icon icon--refresh"
            title="Lấy lại dữ liệu"
            @click="loadPagingData"
          ></div>
          <div
            class="m-icon icon--excel"
            title="Xuất ra Excel"
            @click="exportFile"
          ></div>
        </div>
      </div>
      <div class="table-data-control">
        <!-- Table cho nhân viên - hiện nếu có dữ liệu -->
        <table class="m-table">
          <!-- HEADER -->
          <thead class="m-thead">
            <tr class="m-tr">
              <th class="space sticky-col left"></th>

              <th class="m-th sticky-col" style="left: 16px">
                <BaseCheckbox
                  @click.prevent="setSelectedRowAll"
                  :checked="
                    checkedEmployees.length > 0 &&
                    checkedEmployees.length == employeesData.length
                  "
                />
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 148px; width: 148px"
              >
                MÃ NHÂN VIÊN
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 140px; width: 140px"
              >
                TÊN NHÂN VIÊN
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 64px; width: 64px"
              >
                GIỚI TÍNH
              </th>
              <th
                class="m-th text-align-center"
                style="min-width: 150px; width: 150px"
              >
                NGÀY SINH
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 130px; width: 130px"
              >
                CHỨC DANH
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 124px; width: 124px"
              >
                MÃ ĐƠN VỊ
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 188px; width: 188px"
              >
                TÊN ĐƠN VỊ
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 326px; width: 326px"
              >
                ĐỊA CHỈ
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 150px; width: 150px"
              >
                ĐT DI ĐỘNG
              </th>
              <th class="m-th text-align-left" style="min-width: 165px">
                EMAIL
              </th>
              <th
                class="m-th text-align-center"
                style="width: 120px; min-width: 120px; right: 16px"
              >
                CHỨC NĂNG
              </th>
              <th class="space sticky-col right"></th>
            </tr>
          </thead>
          <!-- TRANG BODY CỦA TABLE -->
          <tbody class="m-tbody" v-if="!isLoadingTable">
            <tr
              v-for="(employee, index) of employeesData"
              :key="index"
              class="m-tr"
              @dblclick="rowOnDblClick(employee)"
              :class="{
                'm-row-selected':
                  checkedEmployees.includes(employee.EmployeeId)
                  | (rowIdSelected == employee.EmployeeId),
              }"
            >
              <td class="space static-col left"></td>
              <td class="m-td static-col" style="left: 16px">
                <BaseCheckbox
                  @click.prevent="rowOnClick(employee, $event)"
                  :checked="checkedEmployees.includes(employee.EmployeeId)"
                />
              </td>
              <td
                class="m-td text-align-left"
                name="eCode"
                style="min-width: 148px; width: 148px"
              >
                {{ employee.EmployeeCode }}
              </td>
              <td
                class="m-td text-align-left"
                name="eName"
                style="min-width: 140px; width: 140px"
              >
                {{ employee.FullName }}
              </td>
              <td
                class="m-td text-align-left"
                name="eGender"
                style="min-width: 64px; width: 64px"
              >
                {{ employee.GenderName }}
              </td>
              <td
                class="m-td text-align-center"
                name="eDob"
                style="min-width: 150px; width: 150px"
              >
                {{ formatDate(employee.DateOfBirth) }}
              </td>
              <td
                class="m-td text-align-left"
                name="ePos"
                style="min-width: 130px; width: 130px"
              >
                {{ employee.PositionName }}
              </td>
              <td
                class="m-td text-align-left"
                name="eDepCode"
                style="min-width: 124px; width: 124px"
              >
                {{ employee.DepartmentCode }}
              </td>
              <td
                class="m-td text-align-left"
                name="eDepName"
                style="min-width: 188px; width: 188px"
              >
                {{ employee.DepartmentName }}
              </td>
              <td
                class="m-td text-align-left"
                name="eAddress"
                style="min-width: 326px; width: 326px"
              >
                {{ employee.ContactAddress }}
              </td>
              <td
                class="m-td text-align-left"
                name="ePhone"
                style="min-width: 150px; width: 150px"
              >
                {{ employee.PhoneNumber }}
              </td>
              <td
                class="m-td text-align-left"
                name="eMail"
                style="min-width: 165px"
              >
                {{ employee.Email }}
              </td>
              <td
                class="m-td static-col flex flex-align-center justify-center"
                style="width: 120px; min-width: 120px; right: 16px"
              >
                <div
                  class="btn-edit-data pd-r-6"
                  @click="
                    setShowDialog(true, employee, this.misaEnum.formMode.Edit)
                  "
                >
                  Sửa
                </div>
                <div
                  class="m-icon icon--arrowup-bg-blue"
                  v-on:click.stop="
                    setShowPopover(true, employee, index, $event)
                  "
                ></div>
              </td>
              <td class="space static-col right"></td>
            </tr>
          </tbody>
          <!--  hiện loading nếu KHÔNG có dữ liệu -->

          <tbody class="m-tbody" v-else>
            <tr class="m-tr" v-for="index in 9" :key="index">
              <td class="space static-col left"></td>
              <td class="m-td static-col" style="left: 16px">
                <div class="loading-1"></div>
              </td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td"><div class="loading-1"></div></td>
              <td class="m-td static-col" style="right: 16px">
                <div class="loading-1"></div>
              </td>
              <td class="space static-col right"></td>
            </tr>
          </tbody>
        </table>
        <!-- component paging phân trang -->
        <div class="m-paging">
          <div class="paging-left flex flex-align-center">
            <div class="total-data">
              Tổng số: <b>{{ this.totalRecords }}</b> bản ghi
            </div>
          </div>
          <div class="flex-grow"></div>
          <combo-box
            class="mr-4 ml-4"
            propTxt="text"
            propValue="value"
            :defaultData="paginateList"
            v-model="this.currentPageSize"
            disabled="disabled"
          />
          <base-paging
            v-model="this.currentPageIndex"
            :totalPage="this.totalPage"
            :pageSize="this.currentPageSize"
            @selectPage="selectedPaging"
          />
        </div>
      </div>
    </div>
    <!-- Popover chức năng Xóa, sửa, nhân bản -->
    <ul
      class="m-popover"
      id="basePopover"
      v-if="isShowPopover"
      :style="{ top: popOverY + 'px', left: popOverX + 'px' }"
    >
      <li class="popover-list" @click.prevent="onDeleteClick">Xóa</li>
      <li class="popover-list">Nhân bản</li>
      <li class="popover-list">Ngừng</li>
    </ul>
    <!-- FORM CHI TIẾT NHÂN VIÊN -->
    <transition>
      <employee-detail
        v-if="isShowDialog"
        :formMode="formMode"
        :empSelected="employeeSelected"
        @setShowDialog="setShowDialog"
        @setShowPopup="setShowPopup"
        @setShowToast="setShowToast"
      />
    </transition>
    <!-- HIỆN POPUP THÔNG BÁO, CẢNH BÁO, XÁC NHẬN -->
    <transition name="fast">
      <base-popup
        v-if="isShowPopup"
        :type="popupType"
        :content="popupContent"
        @closePopup="setShowPopup"
        @confirmCallback="callbackFunc"
        @declineCallback="declineCallbackFunc"
      />
    </transition>
    <!-- HIỆN TOAST BÁO THÀNH CÔNG, LỖI -->
    <transition name="fast">
      <toast-message
        v-model="isShowToastMsg"
        :content="toastContent"
        :type="toastType"
      />
    </transition>
  </div>
</template>
<script>
import axios from "axios";
import FileSaver from "file-saver";

import EmployeeDetail from "@/view/employee/EmployeeDetail.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import ComboBox from "@/components/base/ComboBox.vue";
import BasePopup from "@/components/base/popup/BasePopup.vue";
import ToastMessage from "@/components/base/popup/ToastMessage.vue";
import BasePaging from "@/components/base/paging/BasePaging.vue";
import BaseCheckbox from "@/components/base/checkbox/BaseCheckbox.vue";

import { formatDate } from "@/js/utils";

export default {
  name: "employee-list",
  components: {
    BaseInput,
    ComboBox,
    EmployeeDetail,
    BasePopup,
    BasePaging,
    ToastMessage,
    BaseCheckbox,
  },
  /**
   * Mô tả : Lấy dữ liệu từ API khi mới khởi tạo component danh sách nhân viên
   * Created by: NHLOC - MF1099
   * Created date: 18:20 17/04/2022
   */
  async created() {
    await this.loadPagingData();
  },
  /**
   * Mô tả : Theo dõi các trạng thái của data
   * Created by: NHLOC - MF1099
   * Created date: 14:34 21/04/2022
   */
  watch: {
    currentPageSize: function (newValue, oldValue) {
      if (newValue != oldValue) {
        console.log(this.currentPageSize);
        this.currentPageIndex = 1;
        this.setShowPopover(false);

        this.$nextTick(async () => {
          await this.loadPagingData();
        });
      }
    },
  },
  methods: {
    // CÁC SỰ KIỆN CLICK EVENT
    /**
     * Mô tả : Xử lý sụ kiện xóa nhân viên
     * Created by: NHLOC - MF1099
     * Created date: 13:54 18/04/2022
     */
    async onDeleteClick() {
      // Nếu đã chọn 1 dòng >> Thực hiện xóa nhân viên
      if (this.rowIdSelected) {
        try {
          // Hiện popup xác nhận xóa mã nhân viên
          const empCode = this.employeeSelected.EmployeeCode;

          this.setShowPopup(
            true,
            false,
            this.popupEnum.confirm,
            this.popupMsg.confirmDeleteEmpMsg(empCode),
            // Chạy hàm callback xóa dữ liệu nếu xác nhận đồng ý
            this.deleteData
          );
        } catch (error) {
          console.error(error);
        }
      // Chưa chọn dòng >> Báo lỗi toast "chưa chọn nhân viên để xóa"
      } else {
        this.setShowToast(
          true,
          this.toastMsg.empNotSelectedMsg,
          this.misaEnum.toastEnum.warning
        );
      }
    },
    /**
     * Mô tả : Hiển thị form thêm mới nhân viên (Add - 0)
     * Created by: NHLOC - MF1099
     * Created date: 11:20 16/04/2022
     */
    async btnAddOnClick() {
      // Ẩn dòng được chọn
      this.rowIdSelected = null;

      // 1. lấy mã nhân viên mới
      const localAPI = this.misaApi.getNewEmployeeCode;
      const response = await axios.get(localAPI);

      let newCode = `NV-${response.data}`;

      // 2. thêm mã mới vào dữ liệu nhân viên
      this.employeeSelected = { EmployeeCode: newCode };

      // 3. Hiển thị Dialog (true, dữ liệu nhân viên, trạng thái thêm mới)
      this.setShowDialog(
        true,
        this.employeeSelected,
        this.misaEnum.formMode.Add
      );
    },
    /**
     * Mô tả : Sự kiện double click ở 1 dòng trong danh sách
     * @param _employee: nhân viên được chọn
     * Created by: NHLOC - MF1099
     * Created date: 11:20 16/04/2022
     */
    async rowOnDblClick(_employee) {
      // 1. lấy dữ liệu nhân viên
      this.rowIdSelected = _employee.EmployeeId;

      // gọi api
      const resultEmployee = await this.getById(this.rowIdSelected);

      // 2. Hiển thị Dialog (true, dữ liệu nhân viên được chọn, chỉnh sửa) và đóng các popup lại
      this.setShowDialog(true, resultEmployee, this.misaEnum.formMode.Edit);
    },
    /**
     * Mô tả : Sự kiện click 1 lần vào 1 dòng trong danh sách
     * >> Highlight dòng
     * Created by: NHLOC - MF1099
     * Created date: 17:12 19/04/2022
     */
    rowOnClick(_employee) {
      // Nếu dòng đã được chọn >> xóa khỏi danh sách checkbox
      if (
        _employee.EmployeeId &&
        this.checkedEmployees.includes(_employee.EmployeeId)
      ) {
        // Tìm vị trí employee được được xóa khỏi danh sách
        const index = this.checkedEmployees.findIndex((empId) => {
          return empId === _employee.EmployeeId;
        });
        // Xóa khỏi danh sách checkbox
        this.checkedEmployees.splice(index, 1);
      }
      // chưa được chọn thì thêm vào danh sách checkbox
      else {
        this.checkedEmployees.push(_employee.EmployeeId);
      }
    },

    // SET SHOW CÁC COMPONENT KHÁC
    /**
     * Mô tả : Select dòng bằng 1 lần click
     * @param _employeeId: dữ liệu dòng nhân viên được chọn
     * Created by: NHLOC - MF1099
     * Created date: 11:31 16/04/2022
     */
    setSelectedRow(_employeeId) {
      if (this.rowIdSelected && this.rowIdSelected == _employeeId) {
        this.rowIdSelected = null;
      } else {
        this.rowIdSelected = _employeeId;
      }
    },
    /**
     * Mô tả : Chọn hết tất cả các dòng
     * Created by: NHLOC - MF1099
     * Created date: 09:24 27/04/2022
     */
    setSelectedRowAll() {
      // Hủy chọn hết
      if (this.checkedEmployees.length == this.employeesData.length) {
        this.checkedEmployees = [];
      }
      // Chọn hết
      else {
        this.checkedEmployees = [];
        this.employeesData.map((emp) => {
          this.checkedEmployees.push(emp.EmployeeId);
        });
      }
    },
    /**
     * Mô tả : Ẩn và hiện popup
     * @param _isPopup: bool ẩn và hiện component PopupBox
     * @param _isConfirm: bool xác nhận của component PopupBox
     * @param _popupType: các loại của component PopupBox
     * @param _popupContent: nội dung của component PopupBox
     * @param _callbackFunc: chạy hàm callback của component PopupBox
     * @param _declineCallback: chạy hàm callback của nếu chọn không xác nhận
     * Created by: NHLOC - MF1099
     * Created date: 10:28 31/03/2022
     */
    setShowPopup(
      _isPopup,
      _isConfirm,
      _popupType = null,
      _popupContent = null,
      _callback = null,
      _declineCallback = null
    ) {
      this.popupType = _popupType;
      this.popupContent = _popupContent;
      this.isShowPopup = _isPopup;
      this.isConfirm = _isConfirm;
      this.callbackFunc = _callback;
      this.declineCallbackFunc = _declineCallback;
    },
    /**
     * Mô tả : ẩn và hiện form detail của nhân viên
     * @param _isShow: hiện show form
     * @param _employeeData: dữ liệu nhân viên được hiện
     * @param _formMode: trạng thái của form
     * Created by: NHLOC - MF1099
     * Created date: 11:20 16/04/2022
     */
    async setShowDialog(_isShow, _employeeData = null, _formMode = null) {
      // đóng popover
      this.setShowPopover(false);

      // Load lại trang nếu đóng form
      if (!_isShow) {
        this.loadPagingData();
      }

      // set các trường cho components
      this.employeeSelected = _employeeData;
      this.formMode = _formMode;
      this.isShowDialog = _isShow;
    },
    /**
     * Mô tả : ẩn hiện popover
     * @param _isShow: bool ẩn hiện popover
     * @param _popOverData: dữ liệu nhân viên
     * @param _index: vị trí dòng trong danh sách
     * @param _event: con trỏ
     * Created by: NHLOC - MF1099
     * Created date: 11:35 18/04/2022
     */
    setShowPopover(_isShow, _popOverData = null, _index = null, _event = null) {
      // Nếu dòng được chọn không bị trùng >> chưa được chọn >> hiện popover
      if (this.popOverIndex != _index) {
        // Set vị trí của popover, 
        // dữ liệu được chọn,
        // dòng được chọn
        if (_event) {
          this.popOverX = _event.clientX - 20;
          this.popOverY = _event.clientY + 10;
          this.employeeSelected = _popOverData;
          this.popOverIndex = _index;
        }
        // Hiện popover
        this.isShowPopover = _isShow;
        // highlight dòng được chọn
        this.setSelectedRow(_popOverData.EmployeeId);
      } else {
        // reset các trạng thái + đóng popover
        this.employeeSelected = null;
        this.popOverIndex = null;
        this.isShowPopover = false;
        // ẩn highlight dòng được chọn

        this.setSelectedRow(null);
      }
    },
    /**
     * Mô tả : Ẩn và hiện toast
     * @param isShowToast: bool ẩn và hiện của Toast
     * @param toastContent: nội dụng của Toast
     * @param toastType: loại của Toast
     * Created by: NHLOC - MF1099
     * Created date: 19:32 01/04/2022
     */
    setShowToast(_isShowToast, _toastContent = null, _toastType = null) {
      // set các trạng thái của toast
      this.toastContent = _toastContent;
      this.toastType = _toastType;
      this.isShowToastMsg = _isShowToast;
    },

    /**
     * Mô tả : nhận thông tin phân trang từ component paging
     * @param {*} currentIndex thông tin để phân trang và filter
     * @param {*} pageSize số nhân viên/trang
     * Created by: NHLOC - MF1099
     * Created date: 22:28 21/04/2022
     */
    selectedPaging(currentIndex, pageSize) {
      // set các trạng thái được truyền về từ component
      try {
        this.currentPageIndex = currentIndex;
        this.currentPageSize = pageSize;

        // set đóng các component trong danh sách
        this.setShowPopover(false, null, this.popOverIndex);

        // load lại dữ liệu
        this.loadPagingData();
      } catch (error) {
        console.log(error);
      }
    },
    deleteManyHandler() {
      this.setShowPopup(
        true,
        false,
        this.misaEnum.popupEnum.confirm,
        this.popupMsg.confirmDeleteManyMsg,
        this.deleteMany
      );
    },
    // API FUNCTION
    /**
     * Mô tả : Load dữ liệu theo paging và filter
     * Created by: NHLOC - MF1099
     * Created date: 18:15 21/04/2022
     */
    async loadPagingData() {
      // load màn hình
      this.isLoadingTable = true;

      try {
        const pageIndex = this.currentPageIndex;
        const pageSize = this.currentPageSize;
        const employeeFilter = this.currentEmployeeFilter;

        let localAPI = `${this.misaApi.filter}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
        if (employeeFilter) {
          localAPI += `&employeeFilter=${employeeFilter}`;
        }

        const response = await axios.get(localAPI);

        console.log(response.data);

        const { data, totalRecord, totalPage } = response.data;

        this.employeesData = data;
        this.totalRecords = totalRecord;
        this.totalPage = totalPage;

        // ngừng load màn hình
        setTimeout(() => {
          this.isLoadingTable = false;
        }, 200);

        // reset các biến
        this.rowIdSelected = null;
        this.checkedEmployees = [];
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Mô tả : Xóa 1 nhân viên bằng API
     * Created by: NHLOC - MF1099
     * Created date: 17:04 19/04/2022
     */
    async deleteData() {
      try {
        // Lấy API xóa + id dòng được chọn 
        const localAPI = `${this.misaApi.deleteEmployee}/${this.rowIdSelected}`;
        await axios.delete(localAPI);

        // Xóa nhân viên khỏi danh sách nhân viên
        const index = this.employeesData.findIndex((emp) => {
          return emp.EmployeeId === this.rowIdSelected;
        });

        this.employeesData.splice(index, 1);
        
        // Reset lại id dòng được chọn + đóng popover hiện tại đang mở
        this.rowIdSelected = null;
        this.setShowPopover(false, null, this.popOverIndex);

        // Hiện toast báo "xóa 1 nhân viên thành công"
        this.setShowToast(
          true,
          this.toastMsg.deleteEmpSuccessMsg,
          this.misaEnum.toastEnum.success
        );

        // Load lại trang
        this.loadPagingData();
      } catch (error) {
        // Báo lỗi >> của Axios trả về
        if (error.response) {
          
          console.log("Lỗi", error.response);
          const errorData = error.response.data;
          let errMsg = errorData.UserMsg;

          console.log(errMsg);
        } 
        // Báo lỗi >> của chung trả về
        else {
          console.log("Lỗi", error.message);
        }
      }
    },
    /**
    * Mô tả : Xóa nhiều dữ liệu
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 21:48 27/04/2022
    */
    async deleteMany() {
      try {
        if (this.checkedEmployees.length < 1) {
          this.setShowToast(
            true,
            this.toastMsg.empNotSelectedMsg,
            this.misaEnum.toastEnum.warning
          );
          return;
        }

        await axios.delete(this.misaApi.deleteMultiEmployee, {
          data: this.checkedEmployees,
        });

        this.loadPagingData();

        this.setShowToast(
          true,
          this.toastMsg.deleteSuccessEmpMany(this.checkedEmployees.length),
          this.misaEnum.toastEnum.success
        );
      } catch (error) {
        if (error.response) {
          console.log("Lỗi", error.response);
          const errorData = error.response.data;
          let errMsg = errorData.UserMsg;

          console.log(errMsg);
        } else {
          console.log("Lỗi", error.message);
        }
      }
    },
    /**
     * Mô tả : Lấy dữ liệu nhân viên theo id
     * @param _employeeId: khóa chính ID của nhân viên
     * @return dữ liệu nhân viên theo ID
     * Created by: NHLOC - MF1099
     * Created date: 08:50 25/04/2022
     */
    async getById(_employeeId) {
      try {
        if (!_employeeId) return;

        const response = await axios.get(
          `${this.misaApi.getById}/${_employeeId}`
        );

        const employee = response.data;

        if (employee == null) return;

        return employee;
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Mô tả : Chạy api export dữ liệu nhân viên
     * Created by: NHLOC - MF1099
     * Created date: 10:41 26/04/2022
     */
    async exportFile() {
      try {
        const localAPI = `${this.misaApi.export}`;
        const response = await axios.get(localAPI, { responseType: "blob" });

        FileSaver.saveAs(response.data, "Danh_sach_nhan_vien.xlsx");
      } catch (error) {
        console.error(error);
      }
    },

    // sử dụng hàm tiện ích
    formatDate,
    displayLoadingTable() {
      this.isLoadingTable = true;
      setTimeout(() => {
        this.isLoadingTable = false;
      }, 500);
    },
    // Delay input
    async delaySearch() {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.currentPageIndex = 1;
        this.loadPagingData();
      }, 1000);
    },
  },
  data() {
    return {
      // 1. biến của danh sách nhân viên
      // Danh sách dữ liệu nhân viên
      employeesData: [],

      // Danh sách nhân viên được chọn bằng checkbox
      checkedEmployees: [],

      // Biến lưu id của nhân viên khi được chọn row
      rowIdSelected: null,

      // Biến hiện trang loading của bảng
      isLoadingTable: true,

      // biến giúp delay input khi search nhân viên
      delayTimer: null,

      // 2. Thuộc tính của paging
      // Tổng số bản ghi
      totalRecords: null,

      // tổng số trang
      totalPage: null,

      // filter tên, sđt, mã nhân viên
      currentEmployeeFilter: null,

      // trang hiện tại
      currentPageIndex: 1,

      // kích thước trang
      currentPageSize: 10,

      // danh sách chọn trong kích thước trang
      paginateList: [
        {
          value: 10,
          text: "10 bản ghi trên 1 trang",
        },
        {
          value: 20,
          text: "20 bản ghi trên 1 trang",
        },
        {
          value: 30,
          text: "30 bản ghi trên 1 trang",
        },
        {
          value: 50,
          text: "50 bản ghi trên 1 trang",
        },
        {
          value: 100,
          text: "100 bản ghi trên 1 trang",
        },
      ],

      // 3. thuộc tính của popup
      // Biến hiện popup
      isShowPopup: false,

      // biến thuộc tính popup để xác nhận hay không
      isConfirmPopup: false,

      // Nội dung popup
      popupContent: null,

      // Các loại popup
      popupType: null, // Delete - Warn - Notify

      // Hàm callback chạy khi bấm nút xác nhận (Có - Đồng ý)
      callbackFunc: null,

      // Hàm callback khi bấm nút ko xác nhận (Không)
      declineCallbackFunc: null,

      // 4. Thuộc tính của Popover (Component thực hiện chức năng Xóa-nhân bảng-ngừng sử dụng)
      // Biến hiện popover
      isShowPopover: false,

      // Vị trí thứ tự hiện của popover
      popOverIndex: null,

      // tọa độ x, y trong màn hình
      popOverX: null,
      popOverY: null,

      // 5. Thuộc tính của ToastMsg
      // Biến hiện toast
      isShowToastMsg: false,

      // Nội dung của toast
      toastContent: null,

      // Loại của toast
      toastType: null,

      // 6. Thuộc tính của Form nhân viên
      // biến hiện form nhân viên
      isShowDialog: false,

      // formMode: 0 - thêm, 1 - sửa, 2 - xóa
      formMode: null,

      // Dữ liệu nhân viên được chọn
      employeeSelected: {},

      // 7. Thuộc tính của dropdown thực hiện hàng loạt
      // biến ẩn hiện danh sách thực hiện hàng loạt
      isShowDropdown: false,
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/title.css");
@import url("@/css/components/toolbar.css");
@import url("@/css/components/dropdown.css");
@import url("@/css/components/table.css");
@import url("@/css/components/button.css");
@import url("@/css/common/animation.css");
@import url("@/css/components/loading.css");
@import url("@/css/components/checkbox.css");
@import url("@/css/components/popover.css");
@import url("@/css/components/paging.css");

.m-employee-container .bread-crumb {
  cursor: pointer;
}
.m-employee-container .bread-crumb .m-icon {
  width: 16px;
  height: 16px;
}

.m-employee-container .bread-crumb a {
  font-size: 13px;
  color: #0075c0;
  text-decoration-color: none;
}

.m-employee-container .layout-employee-list {
  height: calc(100% - 91px);
  background-color: #fff;
  margin-top: 20px;
  margin-right: 30px;
}
</style>