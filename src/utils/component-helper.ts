export function parseProperties(inputString: string) {
  // Split the string by semicolons to get individual properties
  const properties = inputString.split(";");

  // Initialize an empty array to store the result
  let resultArray: { name: string; type: string }[] = [];

  // Iterate over each property
  properties.forEach((property) => {
    // Split the property by ':' to separate the key and value
    const [nameWithType, type] = property.trim().split(":");

    // Extract the property name and remove the question mark if present
    const name = nameWithType.replace(/\?/g, "").trim();

    // If name is empty, skip this property
    if (!name) return;

    // Determine the type based on the presence of 'React.ReactNode', or '[]'
    let propertyType = "unknown";
    if (type && type.includes("[]")) {
      propertyType = "array";
    } else {
      propertyType = "text";
    }

    switch (name) {
      case "children":
        resultArray.push({ name: "children", type: "ReactNode" });
        break;
      case "className":
        break;
      case "src":
        resultArray.push({ name, type: "image" });
        break;
      default:
        resultArray.push({ name, type: propertyType });
        break;
    }
    // Push the property object to the result array
  });

  return resultArray;
}
