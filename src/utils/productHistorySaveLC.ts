interface Product {
    productId: string;
    shopId: string;
  }
  
  export const productHistorySaveLC = (
    productId: string,
    shopId: string
  ): any => {
    const localStorageKey = "savedProducts";
    const maxProducts = 10;
  
    // Fetch the current saved products from local storage
    const savedProducts: Product[] = JSON.parse(
      localStorage.getItem(localStorageKey) || "[]"
    );
  
    // Check if there are any saved products
    if (savedProducts.length > 0) {
      // Ensure the new product has the same shopId as existing products
      const existingShopId = savedProducts[0].shopId;
      if (existingShopId !== shopId) {
        return `You can only add products from the same shop (${existingShopId}).`;
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
      // Remove the oldest product (FIFO behavior)
      savedProducts.shift();
    }
  
    // Add the new product to the saved products array
    savedProducts.push({ productId, shopId });
  
    // Save the updated array back to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(savedProducts));
  
    return {
      status: 200,
      message: "Product added successfully.",
      data: savedProducts, // Return the updated list for confirmation
    };
  };
  