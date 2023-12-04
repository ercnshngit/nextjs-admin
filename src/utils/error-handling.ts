export const checkError = (functionName: any) => {
  let a;
  try {
    a = functionName();
  } catch (e) {
    return null;
  }
  return a;
};
