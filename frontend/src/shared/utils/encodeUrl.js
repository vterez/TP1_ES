export const encode = (data) => {
  return Object.entries(data)
    .reduce((acc, [key, val]) => {
      if (typeof val === "string" && val !== "") {
        const encoded = encodeURIComponent(key) + "=" + encodeURIComponent(val);
        acc.push(encoded);
      }
      if (typeof val === "string" && val === "") {
        const encoded =
          encodeURIComponent(key) + "=" + encodeURIComponent(null);
        acc.push(encoded);
      }
      if (typeof val !== "string") {
        const encoded = encodeURIComponent(key) + "=" + encodeURIComponent(val);
        acc.push(encoded);
      }

      return acc;
    }, [])
    .join("&");
};
