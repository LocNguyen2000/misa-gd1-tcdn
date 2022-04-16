<template >
  <div class="m-combobox" :id="id" >
    <input
      type="text"
      class="m-input"
      :placeholder="placeholder"
      :value="selectedItem.displayValue"
    />
    <button
      class="m-combobox-btn m-icon icon--arrowup"
      @click="showComboBox = !showComboBox"
    ></button>
    <div class="m-combobox-data" v-if="showComboBox">
      <div
        class="m-combobox-item"
        v-for="cbxItem in comboBoxData"
        :key="cbxItem[this.propValue]"
        @click="cbxItemOnSelect($event, cbxItem)"
      >
        {{ cbxItem[this.propTxt] }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "base-combobox",
  components: {},
  /**
   *  Các thuộc tính của ComboBox
   *  propValue là giá trị cần lấy
   *  propTxt là giá trị hiển thị trên input
   *  placeholder...
   *  defaultValue: giá trị default khi double click vào nhân viên
   */
  props: ["id", "api", "propValue", "propTxt", "placeholder", "defaultValue", "defaultData"],

  /**
   * Mô tả : Gọi API theo thuộc tính props và lưu vào ComboBoxData để hiển thị danh sách
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 14:20 02/04/2022
   */
  async created() {
    // kiểm tra xem thiếu trường props

    if (this.defaultData && !this.api) {
      this.comboBoxData = this.defaultData;
      this.selectedItem.displayValue = this.defaultData[0][this.propTxt];
      this.selectedItem.trueValue = this.defaultData[0][this.propValue]
    } else if (!this.defaultData && this.api) {
      try {
        // không thiếu >> gọi API get để lấy dữ liệu data
        const response = await axios.get(this.api);

        // lưu vào data của combobox
        this.comboBoxData = response.data;

        // giá trị thực của item = default nếu có
        this.selectedItem.trueValue = this.defaultValue;

        // giá trị được hiển thị
        this.comboBoxData.filter((item) => {
          if (item[this.propValue] == this.defaultValue) {
            this.selectedItem.displayValue = item[this.propTxt];
            return;
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert('Thiếu trường cho Combobox')    
    }
  },

  /**
   * Mô tả : Chứa các hàm sự kiện của Cbx
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 11:19 29/03/2022
   */
  methods: {
    /**
     * Mô tả : Sự kiện chọn data item trong Cbx
     * @params
     *    cbxItem: item được select
     *    e: event con trỏ
     * @return
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 11:19 29/03/2022
     */
    cbxItemOnSelect(e, cbxItem) {
      try {
        e.preventDefault();

        // 1. Lưu giá trị item được select item
        // 1.1. Sau đó giá trị select sẽ được hiển thị trên input
        this.selectedItem.trueValue = cbxItem[this.propValue];
        this.selectedItem.displayValue = cbxItem[this.propTxt];

        // 1.2. emit dữ liệu lên cha
        // this.$emit("setValue", this.propValue, this.selectedItem.trueValue);

        // 2. Highlight item được chọn
        // 2.1. Xoá các item trong component chứa combobox-selected
        const cbxItems =
          e.target.parentElement.querySelectorAll(".m-combobox-item");
        for (const item of cbxItems) {
          item.classList.remove("combobox-selected");
        }

        // 2.2. Thêm class combobox-selected
        e.target.className += " combobox-selected";

        // 3. Ẩn cbx item hết
        setTimeout(() => {
          this.showComboBox = false;
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },
  },
  /**
   *  Dữ liệu Cbx
   *  showComboBox: ẩn và hiện comboBox
   *  comboBoxData: chứa dữ liệu item của Combobox
   *  selectedItem: Item được chọn trong select
   * >>  trueValue: dữ liệu được chọn (value)
   * >>  displayValue: dữ liệu được hiển thị (option display)
   */
  data() {
    return {
      showComboBox: false,
      comboBoxData: [],
      selectedItem: {
        displayValue: "",
        trueValue: null,
      },
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/combobox.css");
</style>