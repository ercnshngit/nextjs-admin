export const control = (
  value: any,
  type: string = "string",
  returnVal?: any
) => {
  if (
    typeof value === type &&
    value !== null &&
    value !== "" &&
    value !== undefined
  ) {
    return value;
  } else {
    if (typeof returnVal === "function") return returnVal();
    return returnVal || null;
  }
};
