export function parseAPIErrorByField(data: any): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  if (!data || typeof data !== "object") return fieldErrors;

  for (const key in data) {
    const value = data[key];
    if (Array.isArray(value)) {
      fieldErrors[key] = value.join(" ");
    } else if (typeof value === "object") {
      // e.g.: {"password": {"password": ["error"]}}
      for (const innerKey in value) {
        if (Array.isArray(value[innerKey])) {
          fieldErrors[innerKey] = value[innerKey].join(" ");
        }
      }
    }
  }

  return fieldErrors;
}
