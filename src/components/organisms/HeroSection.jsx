import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Sweet Dreams
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Made Real
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg">
              From custom wedding cakes to daily pastries, we create delicious memories 
              with the finest ingredients and artistic attention to detail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/cake-designer">
                  <ApperIcon name="Palette" size={20} className="mr-2" />
                  Design Your Cake
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/gallery">
                  <ApperIcon name="Eye" size={20} className="mr-2" />
                  View Gallery
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=400&fit=crop"
                  alt="Beautiful wedding cake"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <ApperIcon name="Heart" size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;