import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { testimonialService } from "@/services/api/testimonialService";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimonialService.getFeatured();
      setTestimonials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTestimonials} />;

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read about the sweet experiences our customers have had with our cakes and service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;