export const discountPrice = (
    price: number = 0,   // Provide a default value of 0 for price
    discount: number = 0 // Provide a default value of 0 for discount
  ) => {
    const result = price - discount;
    return result;
  };
  