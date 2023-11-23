/**
 *
 * @param obj An object with snake_case fields
 * @returns  The same object but with camelCase fields
 */
export const camelize = <T>(obj: Record<string, any>): T => {
  const camelObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey: string = key.replace(/_([a-z])/g, (_, match) =>
        match.toUpperCase()
      );

      if (Array.isArray(obj[key])) {
        // If the value is an array, convert each element only if elements are objects
        camelObj[camelKey] = obj[key].map((item: any) =>
          typeof item === "object" ? camelize(item) : item
        );
      } else if (typeof obj[key] === "object") {
        // If the value is an object, recursively camelize it
        camelObj[camelKey] = camelize(obj[key]);
      } else {
        // Otherwise, just copy the value
        camelObj[camelKey] = obj[key];
      }
    }
  }
  return camelObj as T;
};
