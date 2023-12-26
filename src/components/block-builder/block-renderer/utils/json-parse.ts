export const jsonParse = <T>(string: string) => {
  try {
    const jsonValue: T = JSON.parse(string);

    return jsonValue;
  } catch {
    return undefined;
  }
};
