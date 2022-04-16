<template>
  <div class="m-employee-container">
    <div class="m-title">
      <div class="m-row">
        <div class="title-text">Nhân viên</div>
        <div class="title-btn">
          <DropdownBtn text="Tiện ích" :defaultData="utilitiesItem" />
          <div class="m-add-dropdown">
            <button class="m-btn-add" @click="setShowDialog(true)">Thêm</button>
            <div class="line"></div>
            <DropdownBtn :defaultData="addNewListItem" />
          </div>
        </div>
      </div>
      <div class="m-row bread-crumb" href="#">
        <div class="m-icon icon--arrowleft"></div>
        <a>Tất cả danh mục</a>
      </div>
    </div>
    <div class="layout-employee-list">
      <div class="m-toolbar">
        <DropdownBtn class="flex-grow" text="Thực hiện hàng loạt" />
        <BaseInput
          placeholder="Tìm theo mã, tên nhân viên"
          :hasIcon="true"
          :canFocus="true"
        />
        <div class="toolbar-btn-wrapper">
          <div class="m-icon icon--refresh"></div>
          <div class="m-icon icon--excel"></div>
          <div class="m-icon icon--setting-grey"></div>
        </div>
      </div>
      <div class="table-data-control">
        <table class="m-table">
          <thead class="m-thead">
            <tr class="m-tr">
              <th class="space sticky-col left"></th>
              <th class="m-th sticky-col" style="left: 16px"></th>
              <th
                class="m-th text-align-left"
                style="min-width: 148px; width: 148px"
              >
                MÃ NHÂN VIÊN
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 198px; width: 198px"
              >
                TÊN NHÂN VIÊN
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 144px; width: 144px"
              >
                GIỚI TÍNH
              </th>
              <th
                class="m-th text-align-center"
                style="min-width: 114px; width: 114px"
              >
                NGÀY SINH
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 205px; width: 205px"
              >
                SỐ CMND
              </th>
              <th
                class="m-th text-align-center"
                style="min-width: 199px; width: 199px"
              >
                NGÀY CẤP
              </th>
              <th
                class="m-th text-align-left"
                style="min-width: 168px; width: 168px"
              >
                NƠI CẤP
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
                style="min-width: 526px; width: 526px"
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
          <tbody class="m-tbody">
            <tr
              class="m-tr"
              v-for="(employee, index) of employeesData"
              :key="index"
            >
              <td class="space static-col left"></td>
              <td class="m-td static-col" style="left: 16px"></td>
              <td
                class="m-td text-align-left"
                name="eCode"
                style="min-width: 148px; width: 148px"
              >
                {{ employee.employeeCode }}
              </td>
              <td
                class="m-td text-align-left"
                name="eName"
                style="min-width: 198px; width: 198px"
              >
                {{ employee.fullName }}
              </td>
              <td
                class="m-td text-align-left"
                name="eGender"
                style="min-width: 144px; width: 144px"
              >
                {{ employee.genderName }}
              </td>
              <td
                class="m-td text-align-center"
                name="eDob"
                style="min-width: 114px; width: 114px"
              ></td>
              <td
                class="m-td text-align-left"
                name="eIden"
                style="min-width: 205px; width: 205px"
              >
                {{ employee.identityNumber }}
              </td>
              <td
                class="m-td text-align-center"
                name="eIdenDate"
                style="min-width: 199px; width: 199px"
              ></td>
              <td
                class="m-td text-align-left"
                name="eIdenPlace"
                style="min-width: 168px; width: 168px"
              ></td>
              <td
                class="m-td text-align-left"
                name="ePos"
                style="min-width: 130px; width: 130px"
              ></td>
              <td
                class="m-td text-align-left"
                name="eDepCode"
                style="min-width: 124px; width: 124px"
              ></td>
              <td
                class="m-td text-align-left"
                name="eDepName"
                style="min-width: 188px; width: 188px"
              >
                {{ employee.departmentName }}
              </td>
              <td
                class="m-td text-align-left"
                name="eAddress"
                style="min-width: 526px; width: 526px"
              ></td>
              <td
                class="m-td text-align-left"
                name="ePhone"
                style="min-width: 150px; width: 150px"
              >
                {{ employee.phoneNumber }}
              </td>
              <td
                class="m-td text-align-left"
                name="eMail"
                style="min-width: 165px"
              >
                {{ employee.email }}
              </td>
              <td
                class="m-td static-col text-align-center"
                style="width: 120px; min-width: 120px; right: 16px"
              ></td>
              <td class="space static-col right"></td>
            </tr>
          </tbody>
        </table>
        <div class="m-paging">
          <div class="space" style="padding: 0 10px"></div>
          <div class="left-pagniation">
            <div class="total-data">Tổng số: <b>91</b> bản ghi</div>
          </div>
          <div class="flex-grow"></div>
          <ComboBox
            class="mr-4 ml-4"
            propTxt="text"
            propValue="value"
            :defaultData="paginateList"
          />
          <div class="page-navigation">
            <div class="prevPage mr-4">Trước</div>
            <div class="page-index flex">
              <div class="page-num cur-pointer pl-2 pr-2 selected">1</div>
              <div class="page-num cur-pointer pl-2 pr-2">2</div>
              <div class="page-num cur-pointer pl-2 pr-2">3</div>
              <div class="page-num pl-2 pr-2">...</div>
              <div class="page-num cur-pointer pl-2 pr-2">5</div>
            </div>
            <div class="nextPage cur-pointer ml-4">Sau</div>
          </div>
          <div class="space" style="padding: 0 10px"></div>
        </div>
      </div>
    </div>
    <EmployeeDetail
      :isShowDialog="isShowForm"
      @setCloseDialog="setShowDialog"
    />
  </div>
</template>
<script>
// import axios from 'axios';
import DropdownBtn from "@/components/base/DropdownBtn.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import ComboBox from "@/components/base/ComboBox.vue";
import EmployeeDetail from "@/view/employee/EmployeeDetail.vue";

export default {
  name: "employee-list",
  components: {
    DropdownBtn,
    BaseInput,
    ComboBox,
    EmployeeDetail,
  },
  async created() {
    try {
      // const localAPI = "http://localhost:5205/api/v1/Employee"
      // const response = await axios.get(localAPI);

      // console.log(response.data);
      // this.employeesData = response.data;
      this.employeesData = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ];
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    // ẩn và hiện form detail của nhân viên
    setShowDialog(isShow) {
      this.isShowForm = isShow;
    },
  },
  data() {
    return {
      isShowForm: false,
      utilitiesItem: ["Đồng bộ với AMIS hệ thống"],
      addNewListItem: ["Nhập từ Excel"],
      employeesData: [],
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
      ],
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/title.css");
@import url("@/css/components/toolbar.css");
@import url("@/css/components/table.css");
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
  height: calc(100% - 124px);
  background-color: #fff;
  margin-top: 20px;
  margin-right: 30px;
}
</style>