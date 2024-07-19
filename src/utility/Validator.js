// export const Validator = (type, value, confirmPasswordValue = "") => {
//   switch (type) {
//     case "password":
//       if (value?.length <= 7) {
//         return "Password must be at least 8 characters";
//       }
//       return "";
//     case "email":
//       if (
//         !value.match("^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$") ||
//         value.includes("..")
//       ) {
//         return "Please enter a valid email address";
//       }
//       return "";

//     case "confirmPassword":
//       if (value != confirmPasswordValue) {
//         return "Password does not match";
//       }
//       return "";
//     case "name":
//       if (!value.match(/^[a-zA-Z\s]*$/)) {
//         return "Name should only contain letters and spaces";
//       }
//       return "";
//     case "phoneNumber":
      
//       if (!value.match(/^[0-9]*$/)) {
//         return "Phone number should only contain numbers";
//       }
//       return "";
//     default:
//       return "";
//   }
// };



export const Validator = (type, value, confirmPasswordValue = "") => {
  switch (type) {
    case "password":
      if (value?.length <= 7) {
        return "Password must be at least 8 characters";
      }
      if (!/[a-z]/.test(value)) {
        return "Password must contain at least one lowercase letter";
      }
      if (!/[A-Z]/.test(value)) {
        return "Password must contain at least one uppercase letter";
      }
      if (!/[0-9]/.test(value)) {
        return "Password must contain at least one number";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return "Password must contain at least one special character";
      }
      return "";
    case "email":
      if (
        !value.match("^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$") ||
        value.includes("..")
      ) {
        return "Please enter a valid email address";
      }
      return "";
    case "confirmPassword":
      if (value !== confirmPasswordValue) {
        return "Password does not match";
      }
      return "";
    case "name":
      if (!value.match(/^[a-zA-Z\s]*$/)) {
        return "Name should only contain letters and spaces";
      }
      return "";
    case "phoneNumber":
      if (!value.match(/^[0-9]*$/)) {
        return "Phone number should only contain numbers";
      }
      return "";
    default:
      return "";
  }
};
