<template>
  <div
    class="m-checkbox"
    :class="{ 'checked': checked  }"
  ></div>
</template>
<script>
export default {
  name: "m-checkbox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
@import url("@/css/components/checkbox.css");
</style>