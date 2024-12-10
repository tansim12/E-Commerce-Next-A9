interface Product {
  productId: string;
  categoryId: string;
}

export const compareProductSaveLC = (
  productId: string,
  categoryId: string
): any => {
  const localStorageKey = "savedProducts";
  const maxProducts = 3;

  // Fetch the current saved products from local storage
  const savedProducts: Product[] = JSON.parse(
    localStorage.getItem(localStorageKey) || "[]"
  );

  // Check if there are any saved products
  if (savedProducts.length > 0) {
    // Ensure the new product has the same categoryId as existing products
    const existingCategoryId = savedProducts[0].categoryId;
    if (existingCategoryId !== categoryId) {
      return `You can only add products from the same category (${existingCategoryId}).`;
    }
  }

  // Check if the product already exists
  const isAlreadySaved = savedProducts.some(
    (product) => product.productId === productId
  );
  if (isAlreadySaved) {
    return "This product is already added.";
  }

  // Check if the limit of products is reached
  if (savedProducts.length >= maxProducts) {
    return `You can only add up to ${maxProducts} products.`;
  }

  // Add the new product to the saved products array
  savedProducts.push({ productId, categoryId });

  // Save the updated array back to local storage
  localStorage.setItem(localStorageKey, JSON.stringify(savedProducts));

  return {
    status: 200,
    message: "Product Added Successfully done",
  };
};
