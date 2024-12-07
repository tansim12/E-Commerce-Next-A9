import { TCartData } from "../Types";

export const handleAddToCart = (data: Partial<TCartData>) => {
  // Retrieve the current cart data from local storage
  const getAddToCartData = localStorage.getItem("addToCart");

  // Initialize the cart with existing data or an empty array if none exists
  const cartItems: TCartData[] = getAddToCartData
    ? JSON.parse(getAddToCartData)
    : [];



 // Check if there is already a product in the cart with a different shopId
 if (
    cartItems.length > 0 &&
    cartItems[0].shopId !== data.shopId
  ) {
    // Show a confirmation prompt to the user
    const confirmClear = window.confirm(
      "You are trying to add products from a different shop. Adding this product will remove all items from the current cart. Do you want to proceed?"
    );

    if (confirmClear) {
      // If the user agrees, clear the cart and add the new product
      localStorage.setItem("addToCart", JSON.stringify([]));
      cartItems.length = 0; // Clear cart items array
    } else {
      // If the user cancels, return immediately
      return {
        status: false,
        message: "Action cancelled by the user.",
      };
    }
  }

  // Check if the item is already in the cart
  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === data.id
  );

  if (existingProductIndex >= 0) {
    const availableQuantity = data?.quantity || 0;
    // If the item is already in the cart, update the quantity
    if (cartItems[existingProductIndex].buyQuantity >= availableQuantity) {
      return {
        status: false,
        message: `This product quantity out of Stock ${data?.quantity}`,
      };
    }
    cartItems[existingProductIndex].buyQuantity += data.buyQuantity || 1;
  } else {
    if (cartItems?.length > 2) {
      return {
        status: false,
        message: "Already 3 Product Added Cart",
      };
    }

    // If the item is not in the cart, add it
    cartItems.push({
      id: data?.id as string,
      productName: data?.productName as string,
      shopName: data?.shopName as string,
      shopId: data?.shopId as string,
      price: data?.price as number,
      buyQuantity: data?.buyQuantity || 1,
      image: data?.image as string,
      quantity: data?.quantity as number,
    });
  }

  // Save the updated cart back to local storage
  localStorage.setItem("addToCart", JSON.stringify(cartItems));
  return {
    status: true,
    message: "Product Added To Cart",
  };
};

export const handleRemoveFromCart = (id: string) => {
  // Retrieve the current cart data from local storage
  const getAddToCartData = localStorage.getItem("addToCart");

  // Initialize the cart with existing data or an empty array if none exists
  let cartItems: TCartData[] = getAddToCartData
    ? JSON.parse(getAddToCartData)
    : [];

  // Filter out the item with the matching _id
  cartItems = cartItems.filter((item) => item.id !== id);
  // Save the updated cart back to local storage
  localStorage.setItem("addToCart", JSON.stringify(cartItems));
};
