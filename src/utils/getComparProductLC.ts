export const getCompareProductLC = () => {
  const localStorageKey = "savedProducts";
  // Retrieve the saved data from local storage and parse it
  const savedProducts = JSON.parse(
    localStorage.getItem(localStorageKey) || "[]"
  );
  return savedProducts;
};
