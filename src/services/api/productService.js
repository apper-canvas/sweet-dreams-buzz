import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  getAll: async () => {
    await delay(300);
    return [...productsData];
  },

  getById: async (id) => {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  getByCategory: async (category) => {
    await delay(250);
    return productsData.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    ).map(p => ({ ...p }));
  },

  search: async (query) => {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return productsData.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    ).map(p => ({ ...p }));
  },

  getFeatured: async () => {
    await delay(200);
    return productsData.filter(p => p.featured).map(p => ({ ...p }));
  },

  getPopular: async () => {
    await delay(200);
    return productsData.filter(p => p.popular).map(p => ({ ...p }));
  }
};