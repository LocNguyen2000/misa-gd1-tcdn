<template lang="">
    <div class="m-content">
        <EmployeeList/>
    </div>
</template>
<script>
import EmployeeList from '@/view/employee/EmployeeList.vue'

export default {
    name: "the-content",
    components: {
       EmployeeList
    }
}
</script>
<style>
    @import url("@/css/layout/content.css");
</style>