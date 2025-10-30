import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ 
  title = "No items found", 
  description = "We couldn't find any products matching your criteria.",
  action = "Browse All Products",
  href = "/"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px] px-4"
    >
      <Card className="p-8 max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="Search" size={40} className="text-primary" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        <Button asChild>
          <Link to={href}>
            <ApperIcon name="ArrowRight" size={16} className="mr-2" />
            {action}
          </Link>
        </Button>
      </Card>
    </motion.div>
  );
};

export default Empty;