export function useDate() {
  return {
    today() {
      const date = new Date();
      return date.toISOString().split("T")[0];
    },
  };
}
