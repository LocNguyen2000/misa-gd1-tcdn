<template>
  <div class="m-dropdown">
    <button class="m-btn-dropdown" :disabled="isDisabled" @click="setShowItem">
      <span v-if="hasText"> {{ text }} </span>
      <div class="m-icon icon--arrowup"></div>
    </button>
    <div class="m-dropdown-list" v-if="isShowItem">
      <div
        class="m-dropdown-item"
        v-for="(item, index) of defaultData"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "base-dropdown",
  created(){
      console.log(this.text);
      if (!this.text){
        this.hasText = false
      }
  },
  props: {
    defaultData: {
      type: Array,
      default: null,
    },
    text: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
      setShowItem(){
          this.isShowItem = !this.isShowItem;
      }
  },
  data() {
    return {
      isShowItem: false,
      hasText: true,
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/dropdown.css");
</style>