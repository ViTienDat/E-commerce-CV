export const formatMoney = (number) =>
  number.toLocaleString("it-IT", { style: "currency", currency: "VND" });

export const validate = (payload, setInvalidFields) => {
  let invalid = 0;
  const formatPayload = Object.entries(payload);
  for (let array of formatPayload) {
    if (array[1].trim() == "") {
      invalid++;
      setInvalidFields((prev) => [
        ...prev,
        { name: array[0], mes: "Trường bắt buộc nhập đủ" },
      ]);
    }
  }
  for (let array of formatPayload) {
    switch (array[0]) {
      case "email":
        const regex = /^\S+@\S+\.\S+$/;
        if (!array[1].match(regex)) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            { name: array[0], mes: "Email không hợp lệ" },
          ]);
        }
        break;
      case "password":
        if (array[1].length < 6) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            { name: array[0], mes: "password tối thiểu 6 ký tự" },
          ]);
        }
        break;
      case "mobile":
        const regex2 = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!array[1].match(regex2)) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            { name: array[0], mes: "Số điện thoại không hợp lệ" },
          ]);
        }
        break;
      default:
        break;
    }
  }
  return invalid;
};

export const gennerateRange = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
};
export const formatString = (string) => {
  if (string.length > 20) return string.slice(0, 19) + "...";
  else return string;
};
