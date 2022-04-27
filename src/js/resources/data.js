const misaResource = {
    Gender: {
        "Nam": 1,
        "Nữ": 0,
        // "Khác": 2,
    },
    EmployeeType: {
        "Nhà cung cấp": 1,
        "Khách hàng": 0,
    },
    SideBarList: [{
        icon: "icon--overview",
        title: "Tổng quan",
    },
    {
        icon: "icon--cash",
        title: "Tiền mặt",
    },
    {
        icon: "icon--bank",
        title: "Tiền gửi",
    },
    {
        icon: "icon--buy",
        title: "Mua hàng",
    },
    {
        icon: "icon--sell",
        title: "Bán hàng",
    },
    {
        icon: "icon--invoice",
        title: "Quản lý hóa đơn",
    },
    {
        icon: "icon--stock",
        title: "Kho",
    },
    {
        icon: "icon--tools",
        title: "Công cụ dụng cụ",
    },
    {
        icon: "icon--asset",
        title: "Tài sản cố định",
    },
    {
        icon: "icon--tax",
        title: "Thuế",
    },
    {
        icon: "icon--price",
        title: "Giá thành",
    },
    {
        icon: "icon--general",
        title: "Tổng hợp",
    },
    {
        icon: "icon--budget",
        title: "Ngân sách",
    },
    {
        icon: "icon--report",
        title: "Báo cáo",
    },
    {
        icon: "icon--finance",
        title: "Phân tích tài chính",
    },],
}
const misaEnum = {
    // Enum cho loại toast
    toastEnum: {
        warning: "warning",
        success: "success",
        error: "error",
        info: "info",
    },
    // Enum cho loại popup
    popupEnum: {
        warning: "warning",
        question: "question",
        alert: "alert",
        confirm: "confirm",
    },
    // Enum cho trạng thái của Form
    formMode: {
        Add: 0,
        Edit: 1,
    },
}

// Tài nguyên API chung
const misaApi = {
    addEmployee: "http://localhost:5205/api/v1/Employees",
    updateEmployee: "http://localhost:5205/api/v1/Employees",
    getById: "http://localhost:5205/api/v1/Employees",
    getNewEmployeeCode: "http://localhost:5205/api/v1/Employees/NewEmployeeCode",
    deleteEmployee: "http://localhost:5205/api/v1/Employees",
    deleteMultiEmployee: "http://localhost:5205/api/v1/Employees/DeleteMany",
    filter: "http://localhost:5205/api/v1/Employees/filter",
    export: "http://localhost:5205/api/v1/Employees/export",
    getDepartment: "http://localhost:5205/api/v1/Departments/",
}

export default {
    misaEnum, misaResource, misaApi,
};