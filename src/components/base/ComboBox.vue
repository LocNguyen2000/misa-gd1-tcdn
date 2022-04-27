<template >
  <div class="m-combobox" ref="input">
    <input
      type="text"
      class="m-input"
      :placeholder="placeholder"
      :value="mappingValue"
      @focus="setFocus"
      @blur="removeFocus"
      :disabled="disabled"
    />
    <button
      class="m-combobox-btn m-icon icon--arrowup"
      v-on:click.prevent="displayListCbx"
    ></button>
    <div class="m-combobox-data" v-if="showComboBox" :style="positionStyle">
      <div
        class="m-combobox-item"
        v-for="cbxItem in comboBoxData"
        :class="{
          'combobox-selected':
            cbxItem[this.propValue] == selectedItem.trueValue,
        }"
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
  /**
   *  Các thuộc tính của ComboBox
   *  propValue là giá trị cần lấy
   *  propTxt là giá trị hiển thị trên input
   *  placeholder...
   */
  props: {
    // Cách để truyền API (qua api hoặc dữ liệu truyền vào)
    api: {
      type: String
    },
    defaultData: {
      type: Array
    },

    // Tên thuộc tính để lấy giá trị
    // PropValue: thuộc tính lấy giá trị thực 
    propValue: {
      type: String
    },
    // PropTxt: thuộc tính lấy giá trị hiển thị
    propTxt: {
      type: String
    },

    // Placeholder của input
    placeholder: {
      type: String
    },

    // giá trị thực của input
    modelValue: {
      type: [ String, Number ]
    },

    // thuộc tính disable input
    disabled: {
      type: String
    },
  },
  computed: {
    mappingValue() {
      let mappedValue = null;
      this.comboBoxData.filter((item) => {
        if (item[this.propValue] == this.modelValue) {
          mappedValue = item[this.propTxt];
        }
      });
      if (!mappedValue) return null;
      return mappedValue;
    },
  },

  /**
   * Mô tả : Gọi API theo thuộc tính props và lưu vào ComboBoxData để hiển thị danh sách
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 14:20 02/04/2022
   */
  async created() {
    // kiểm tra xem thiếu trường props

    if (this.defaultData) {
      this.comboBoxData = this.defaultData;
      this.selectedItem.trueValue = this.defaultData[0][this.propValue];
    } else if (this.api) {
      try {
        // không thiếu >> gọi API get để lấy dữ liệu data
        const response = await axios.get(this.api);

        // lưu vào data của combobox
        this.comboBoxData = response.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Thiếu trường cho Combobox");
    }
  },

  /**
   * Mô tả : Chứa các hàm sự kiện của Cbx
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 11:19 29/03/2022
   */
  methods: {
    // /**
    //  * Mô tả : Đặt focus cho combobox
    //  * Created by: Nguyễn Hữu Lộc - MF1099
    //  * Created date: 13:23 19/04/2022
    //  */
    setFocus() {
      try {
        this.$refs.input.style.outline = "1px solid #2ca01c";
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Mô tả : hủy focus
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 21:56 23/04/2022
     */
    removeFocus() {
      try {
        this.$refs.input.style = "";
        this.$refs.input.title = "";
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : Bỏ lỗi error theo style
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 13:59 20/04/2022
     */
    removeError() {
      try {
        this.$refs.input.style = "";
        this.$refs.input.title = "";
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Mô tả : thêm lỗi vào border và tooltip
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 14:00 20/04/2022
     */
    setError(_content) {
      try {
        this.$refs.input.style.outline = "1px solid red";
        this.$refs.input.title = _content;
        this.$refs.input.focus();
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Mô tả : Hiện danh sách combobox
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 21:08 18/04/2022
     */
    displayListCbx(e) {
      // ẩn hoặc hiện danh sách
      this.showComboBox = !this.showComboBox;

      let currentPosY = e.clientY + this.comboBoxData.length * 40;
      let viewHeight = e.view.innerHeight;

      if (currentPosY > viewHeight) {
        // đổi thuộc tính để style lại vị trí của danh sách
        delete this.positionStyle.top;
        this.positionStyle = {
          bottom: "32px",
        };
      } else {
        delete this.positionStyle.bottom;
        this.positionStyle = {
          top: "32px",
        };
      }
    },
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
        // this.selectedItem.displayValue = cbxItem[this.propTxt];

        // emit lên cha
        this.$emit("update:modelValue", this.selectedItem.trueValue);

        // 2. Highlight item được chọn
        // 2.0. Xóa lỗi
        this.removeError();

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
   *
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 11:19 29/03/2022
   */
  data() {
    return {
      showComboBox: false,
      comboBoxData: [],
      selectedItem: {
        trueValue: this.modelValue,
      },

      positionStyle: {
        top: "32px",
      },
      focusStyle: {
        outline: "1px solid #babec5",
      },
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/combobox.css");
</style>