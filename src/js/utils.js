// HÀM TIỆN ÍCH
/**
* Mô tả : format lại dữ liệu date trong danh sách nhân viên
* @param value: dữ liệu dạng Date
* @return dữ liệu date được format
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 20:51 18/04/2022
*/
export function formatDate(value) {
  try {
    if (value) {
      let dateOfBirth = new Date(value);

      let date = dateOfBirth.getDate();
      let month = dateOfBirth.getMonth() + 1;
      let year = dateOfBirth.getFullYear();

      date = date < 10 ? `0${date}` : date;
      month = month < 10 ? `0${month}` : month;

      value = `${date}/${month}/${year}`;
    } else value = "";
    return value;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
/**
* Mô tả : So sánh giữa 2 object với nhau
* @return true: nếu giống nhau | false: nếu khác nhau
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 13:42 26/04/2022
*/
export function isMatch(object, compareObject){
  const isSameObject = ( JSON.stringify(object) === JSON.stringify(compareObject) );
  return isSameObject;
}

/**
* Mô tả : format lại dữ liệu date trong Form
* @param value: dữ liệu dạng Date
* @return dữ liệu date được format để trong form
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 20:51 18/04/2022
*/
export function formatDateInForm(value) {
  try {
    if (value) {
      let dateOfBirth = new Date(value);

      let date = dateOfBirth.getDate();
      let month = dateOfBirth.getMonth() + 1;
      let year = dateOfBirth.getFullYear();

      date = date < 10 ? `0${date}` : date;
      month = month < 10 ? `0${month}` : month;

      value = `${year}-${month}-${date}`;
    } else value = "";
    return value;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
/**
* Mô tả : Map gender số đến tên của gender
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 21:49 21/04/2022
*/
export function mappingGender(){

}

/**
* Mô tả : Validate dữ liệu email
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 08:44 02/04/2022
*/
export function isValidateEmail(email) {
  try {
    if (email) {
      let isValidateMail = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (isValidateMail)
        return true
      return false
    }
    return false
  } catch (error) {
    console.error(error);
  }
}