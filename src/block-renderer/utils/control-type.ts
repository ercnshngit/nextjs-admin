export const control = (
  value: any,
  type: string = "string",
  returnVal?: string
) => {
  if (
    typeof value === type &&
    value !== null &&
    value !== "" &&
    value !== undefined
  ) {
    return value;
  } else {
    return returnVal || "Değiştirmek için tıklayınız.";
  }
};
