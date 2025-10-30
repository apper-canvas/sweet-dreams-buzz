import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <ApperIcon
        key={i}
        name="Star"
        size={16}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <Card className="p-6 h-full">
        <div className="flex items-center gap-1 mb-4">
          {renderStars(testimonial.rating)}
        </div>
        
        <blockquote className="text-gray-700 mb-4 italic">
          "{testimonial.review}"
        </blockquote>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">
              {testimonial.customerName}
            </p>
            <p className="text-sm text-gray-600">
              {testimonial.orderType}
            </p>
          </div>
          <div className="text-xs text-gray-500">
            {new Date(testimonial.date).toLocaleDateString()}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;