interface RecentProduct {
  productId: string;
  shopId: string;
  categoryId: string;
  viewedAt?: string; // Timestamp of when the product was viewed
}

export const trackViewedProduct = (
  productId: string,
  shopId: string,
  categoryId: string
) => {
  const localStorageKey = "recentProducts";
  const maxRecentProducts = 10;
  if (!productId || !shopId) {
    return;
  }

  // Fetch the current recent products from localStorage
  const recentProducts: RecentProduct[] = JSON.parse(
    localStorage.getItem(localStorageKey) || "[]"
  );

  // Check if the product is already in the recent list
  const existingProductIndex = recentProducts.findIndex(
    (p) => p.productId === productId
  );

  if (existingProductIndex !== -1) {
    // Remove the product if it already exists (to move it to the top)
    recentProducts.splice(existingProductIndex, 1);
  }

  // Add the new product to the beginning of the array
  recentProducts.unshift({
    productId,
    categoryId,
    shopId,
    viewedAt: new Date().toISOString(),
  });

  // Keep only the last 10 products
  const updatedProducts = recentProducts.slice(0, maxRecentProducts);

  // Save the updated array back to localStorage
  localStorage.setItem(localStorageKey, JSON.stringify(updatedProducts));
};

export const getHistoryData = () => {
  const localStorageKey = "recentProducts";
  // Retrieve the saved data from local storage and parse it
  const savedProducts = JSON.parse(
    localStorage.getItem(localStorageKey) || "[]"
  );
  return savedProducts;
};

export const removeHistoryProductsLC = (productId: string): any => {
  const localStorageKey = "recentProducts";

  // Retrieve the current saved products
  const savedProducts: RecentProduct[] = JSON.parse(
    localStorage.getItem(localStorageKey) || "[]"
  );

  // Check if the product exists
  const productIndex = savedProducts.findIndex(
    (product) => product.productId === productId
  );

  if (productIndex === -1) {
    return `Product not exist in the saved list.`;
  }

  // Remove the product from the array
  savedProducts.splice(productIndex, 1);

  // Save the updated list back to localStorage
  localStorage.setItem(localStorageKey, JSON.stringify(savedProducts));

  return {
    status: 200,
    message: `Product has been removed successfully.`,
  };
};
