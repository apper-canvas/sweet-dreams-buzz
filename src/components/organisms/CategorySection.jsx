import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const CategorySection = () => {
  const categories = [
    {
      name: "Wedding Cakes",
      description: "Elegant multi-tier cakes for your special day",
      icon: "Heart",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
      href: "/category/Wedding Cakes"
    },
    {
      name: "Birthday Cakes",
      description: "Custom birthday cakes for all ages",
      icon: "Gift",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      href: "/category/Birthday Cakes"
    },
    {
      name: "Cupcakes",
      description: "Individual treats perfect for any occasion",
      icon: "Cherry",
      image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&h=300&fit=crop",
      href: "/category/Cupcakes"
    },
    {
      name: "Pastries",
      description: "Fresh daily pastries and desserts",
      icon: "Coffee",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
      href: "/category/Pastries"
    },
    {
      name: "Custom Orders",
      description: "Personalized creations for special events",
      icon: "Palette",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      href: "/category/Custom Orders"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Our Specialties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of handcrafted cakes and pastries, 
            each made with love and the finest ingredients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={category.href}>
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <ApperIcon 
                        name={category.icon} 
                        size={20} 
                        className="text-primary" 
                      />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;