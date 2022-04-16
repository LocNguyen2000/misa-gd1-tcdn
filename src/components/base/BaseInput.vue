<template>
    <div class="m-input-wrapper" :class="{'m-input-focus': focusStatus}">
        <input class="m-input" type="text" :placeholder="placeholder" :ref="propName" :value="value" @click="setFocus"/>
        <div :class="{'m-icon icon--search': hasIcon}"></div>
    </div>
</template>
<script>
export default {
    name: "base-input",
    props: {
        propName: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        hasIcon: {
            type: Boolean,
            default: true,
        },
        value: {
            type: String,
            default: null,
        }, 
        canFocus: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        setFocus(event){
            event.preventDefault();
            
            if(this.canFocus){
                this.focusStatus = (this.focusStatus == true) ? false : true
            }
        }
    },
    data() {
        return{
            focusStatus: false,
        }
    }
}
</script>
<style>
    @import url("@/css/components/input.css");
</style>