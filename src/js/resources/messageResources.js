const popupMsg = {
    empNotSelectedMsg: "Bạn chưa chọn nhân viên để xóa",
    deleteEmpSuccessMsg: "Đã xóa nhân viên thành công",
    empManyNotSelectedMsg: "Chưa chọn hàng loạt nhân viên để xóa",
    confirmChangeDataMsg: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    confirmDeleteManyMsg: "Bạn có thực sự muốn xóa những nhân viên đã chọn không?",
    confirmDeleteEmpMsg(empCode){
        return `Bạn có thực sự muốn xóa nhân viên <${empCode}> không?`
    },
    deleteSuccessEmpMany(empCount){
        return `Đã xóa thành công ${empCount} nhân viên`
    }
}

const toastMsg = {
    updateSuccessMsg: "Sửa dữ liệu thành công",
    addSuccessMsg: "Thêm mới dữ liệu thành công",
    empNotSelectedMsg: "Bạn chưa chọn nhân viên để xóa",
    empManyNotSelectedMsg: "Chưa chọn hàng loạt nhân viên để xóa",
    deleteEmpSuccessMsg: "Đã xóa nhân viên thành công",
    deleteSuccessEmpMany(empCount){
        return `Đã xóa thành công ${empCount} nhân viên`
    }
}

const errorMsg = {
    notEmptyEmpCode: "Mã nhân viên không được để trống",
    notEmptyFullname: "Họ tên nhân viên không được để trống",
    notEmptyDepartment: "Phòng ban nhân viên không được để trống",
    formatEmail:  "Email nhân viên sai định dạng",
    common: "Đã có lỗi xảy ra xin vui lòng liên hệ với MISA."
}

export default {
    popupMsg, toastMsg, errorMsg
}