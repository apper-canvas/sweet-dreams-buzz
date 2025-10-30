import testimonialsData from "@/services/mockData/testimonials.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const testimonialService = {
  getAll: async () => {
    await delay(200);
    return [...testimonialsData];
  },

  getFeatured: async () => {
    await delay(200);
    return testimonialsData.filter(t => t.featured).map(t => ({ ...t }));
  }
};