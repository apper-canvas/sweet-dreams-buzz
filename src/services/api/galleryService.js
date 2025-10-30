import galleryData from "@/services/mockData/gallery.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const galleryService = {
  getAll: async () => {
    await delay(300);
    return [...galleryData];
  },

  getById: async (id) => {
    await delay(200);
    const item = galleryData.find(g => g.Id === parseInt(id));
    if (!item) {
      throw new Error("Gallery item not found");
    }
    return { ...item };
  },

  getByCategory: async (category) => {
    await delay(250);
    return galleryData.filter(g => 
      g.category.toLowerCase() === category.toLowerCase()
    ).map(g => ({ ...g }));
  }
};