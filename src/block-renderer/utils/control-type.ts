export const control = (value: any, type: string = "string") => {
  if (typeof value === type && value !== null && value !== "") {
    return value;
  } else {
    return "Değiştirmek için tıklayınız.";
  }
};
