export const Validator = (type, value, confirmPasswordValue = "") => {
  switch (type) {
    case "password":
      if (value?.length <= 5) {
        return "Password must be at least 6 characters";
      }
      return "";
    case "email":
      if (
        !value.match("^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$") ||
        value.includes("..")
      ) {
        return "Invalid Email";
      }
      return "";

    case "confirmPassword":
      if (value != confirmPasswordValue) {
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
