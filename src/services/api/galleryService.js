import { getApperClient } from "@/services/apperClient";

const transformGallery = (item) => {
  return {
    Id: item.Id,
    title: item.title_c || "",
    category: item.category_c || "",
    description: item.description_c || "",
    image: item.image_c || "",
    customerName: item.customer_name_c || "",
    date: item.date_c || "",
    featured: item.featured_c || false,
  };
};

export const galleryService = {
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("gallery_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "featured_c" } },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data.map(transformGallery);
    } catch (error) {
      console.error("Error fetching gallery items:", error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.getRecordById("gallery_c", parseInt(id), {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "featured_c" } },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Gallery item not found");
      }

      return transformGallery(response.data);
    } catch (error) {
      console.error(`Error fetching gallery item ${id}:`, error.message);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("gallery_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "featured_c" } },
        ],
        where: [
          {
            FieldName: "category_c",
            Operator: "EqualTo",
            Values: [category],
          },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data.map(transformGallery);
    } catch (error) {
      console.error("Error fetching gallery items by category:", error.message);
      throw error;
    }
  },
};