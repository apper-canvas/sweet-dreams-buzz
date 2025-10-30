import { getApperClient } from "@/services/apperClient";
import React from "react";
import Error from "@/components/ui/Error";

const transformTestimonial = (testimonial) => {
  return {
    Id: testimonial.Id,
    customerName: testimonial.customer_name_c || "",
    rating: testimonial.rating_c || 0,
    review: testimonial.review_c || "",
    date: testimonial.date_c || "",
    orderType: testimonial.order_type_c || "",
    featured: testimonial.featured_c || false,
  };
};

export const testimonialService = {
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("testimonial_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "order_type_c" } },
          { field: { Name: "featured_c" } },
        ],
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data.map(transformTestimonial);
    } catch (error) {
      console.error("Error fetching testimonials:", error.message);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords("testimonial_c", {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "order_type_c" } },
          { field: { Name: "featured_c" } },
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

      return response.data.map(transformTestimonial);
    } catch (error) {
      console.error("Error fetching featured testimonials:", error.message);
      throw error;
}
  },
};