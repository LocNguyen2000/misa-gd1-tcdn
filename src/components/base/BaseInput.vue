<template>
  <div class="m-input-wrapper">
    <input
      class="m-input"
      :type="inputType"
      :placeholder="placeholder"
      ref="input"
      :value="modelValue"
      @input="onChangeHandler"
    />
    <div :class="this.iconType" v-if="hasIcon"></div>
  </div>
</template>
<script>
export default {
  name: "base-input",
  props: {
    // UI Prop
    placeholder: { type: String },
    iconName: { type: String },
    inputType: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      default: "",
    },
    // Function Prop
    propName: { type: String },
  },
  created() {
    // Nếu có trường này thì hiện icon
    if (this.iconName) {
      this.iconType = `m-icon icon--${this.iconName}`;
      this.hasIcon = true;
    }
  },
  methods: {
    onChangeHandler(e) {
      // Cập nhật giá trị props v-model
      e.preventDefault();
      let value = e.target.value;
      if (value) this.removeError();

      this.$emit("update:modelValue", value);
    },
    /**
     * Mô tả : Hàm set focus input
     * Created by: NHLOC - MF1099
     * Created date: 23:39 23/04/2022
     */
    setFocus() {
      this.$refs.input.focus();
    },
    /**
     * Mô tả : Hàm set bỏ border lỗi input
     * Created by: NHLOC - MF1099
     * Created date: 23:39 23/04/2022
     */
    removeError() {
      this.$refs.input.style = "";
      this.$refs.input.title = "";
    },
    /**
     * Mô tả : Hàm thêm border lỗi
     * Created by: NHLOC - MF1099
     * Created date: 23:40 23/04/2022
     */
    setError(_content) {
      this.$refs.input.style.border = "1px solid red";
      this.$refs.input.title = _content;
      this.setFocus();
    },
  },
  data() {
    return {
      // Component UI
      iconType: null,
      hasIcon: false,
    };
  },
};
</script>
<style>
@import url("@/css/components/input.css");
</style>