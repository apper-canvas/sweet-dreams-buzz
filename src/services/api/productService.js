import { getApperClient } from "@/services/apperClient";

const transformProduct = (product) => {
  return {
    Id: product.Id,
    name: product.name_c || "",
    category: product.category_c || "",
    description: product.description_c || "",
    basePrice: product.base_price_c || 0,
    images: product.images_c ? JSON.parse(product.images_c) : [],
    sizes: product.sizes_c ? JSON.parse(product.sizes_c) : [],
    flavors: product.flavors_c ? JSON.parse(product.flavors_c) : [],
    dietary: product.dietary_c ? JSON.parse(product.dietary_c) : [],
    customizable: product.customizable_c || false,
    leadTime: product.lead_time_c || 0,
    featured: product.featured_c || false,
    popular: product.popular_c || false,
  };
};

export const productService = {
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("product_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.getRecordById("product_c", parseInt(id), {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Product not found");
      }

      return transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error.message);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("product_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } },
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

      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching products by category:", error.message);
      throw error;
    }
  },

  search: async (query) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("product_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } },
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "name_c",
                    operator: "Contains",
                    values: [query],
                  },
                  {
                    fieldName: "description_c",
                    operator: "Contains",
                    values: [query],
                  },
                  {
                    fieldName: "category_c",
                    operator: "Contains",
                    values: [query],
                  },
                ],
                operator: "OR",
              },
            ],
          },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error searching products:", error.message);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("product_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } },
        ],
        where: [
          {
            FieldName: "featured_c",
            Operator: "EqualTo",
            Values: [true],
          },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching featured products:", error.message);
      throw error;
    }
  },

  getPopular: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("product_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } },
        ],
        where: [
          {
            FieldName: "popular_c",
            Operator: "EqualTo",
            Values: [true],
          },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching popular products:", error.message);
      throw error;
    }
  },
};