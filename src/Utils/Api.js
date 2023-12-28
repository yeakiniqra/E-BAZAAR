// utils/api.js
export const fetchProducts = async () => {
    try {
      const response = await fetch('/product.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return [];
    }
  };
  