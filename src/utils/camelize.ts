// Convert backend snake_case into frontend camelCase

export const camelize = <T>(obj: Record<string, any>): T => {
  const camelObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, match) =>
        match.toUpperCase()
      );
      camelObj[camelKey] =
        typeof obj[key] === "object" ? camelize(obj[key]) : obj[key];
    }
  }

  return camelObj as T;
};
