export function parseAPIError(errorData: any): string {
  if (typeof errorData === "string") return errorData;

  if (typeof errorData === "object") {
    const messages: string[] = [];

    for (const key in errorData) {
      const value = errorData[key];
      if (Array.isArray(value)) {
        messages.push(...value);
      } else if (typeof value === "string") {
        messages.push(value);
      }
    }

    return messages.join("\n");
  }

  return "An unexpected error occurred.";
}
