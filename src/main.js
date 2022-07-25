import { createApp } from "vue"
import App from "./App.vue"
import data from "./js/resources/data.js"
import resources from "./js/resources/messageResources"

let app = createApp(App)

/**
* Mô tả : Cài đặt resource chung
* Created by: NHLOC - MF1099
* Created date: 19:54 27/04/2022
*/

// Đặt enum các loại popup, toast, trạng thái của form
app.config.globalProperties.misaEnum = data.misaEnum

// Đặt resource cho giới tính, các icon
app.config.globalProperties.misaResource = data.misaResource

// Đặt resource api
app.config.globalProperties.misaApi = data.misaApi

// Đặt resource cho các thông báo message của popup, toast, lỗi
app.config.globalProperties.popupMsg = resources.popupMsg
app.config.globalProperties.toastMsg = resources.toastMsg
app.config.globalProperties.errorMsg = resources.errorMsg

app.mount('#app')
