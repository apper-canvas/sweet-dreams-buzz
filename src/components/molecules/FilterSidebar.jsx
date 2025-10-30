import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";

const FilterSidebar = ({ onFilterChange, filters }) => {
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    priceRange: [0, 500],
    dietary: [],
    customizable: false
  });

  const categories = [
    "All",
    "Wedding Cakes",
    "Birthday Cakes",
    "Cupcakes",
    "Pastries",
    "Custom Orders"
  ];

  const dietaryOptions = [
    "Gluten-Free Available",
    "Vegan Available",
    "Sugar-Free Available"
  ];

  const handleCategoryChange = (category) => {
    const newFilters = {
      ...activeFilters,
      category: category === "All" ? "" : category
    };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDietaryChange = (dietary) => {
    const newDietary = activeFilters.dietary.includes(dietary)
      ? activeFilters.dietary.filter(d => d !== dietary)
      : [...activeFilters.dietary, dietary];
    
    const newFilters = {
      ...activeFilters,
      dietary: newDietary
    };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCustomizableChange = () => {
    const newFilters = {
      ...activeFilters,
      customizable: !activeFilters.customizable
    };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      category: "",
      priceRange: [0, 500],
      dietary: [],
      customizable: false
    };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="X" size={16} className="mr-1" />
            Clear
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  (activeFilters.category === category || 
                   (category === "All" && !activeFilters.category))
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="px-3">
            <input
              type="range"
              min="0"
              max="500"
              value={activeFilters.priceRange[1]}
              onChange={(e) => {
                const newFilters = {
                  ...activeFilters,
                  priceRange: [0, parseInt(e.target.value)]
                };
                setActiveFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>$0</span>
              <span>${activeFilters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Dietary Options */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Dietary Options</h4>
          <div className="space-y-2">
            {dietaryOptions.map((dietary) => (
              <label
                key={dietary}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.dietary.includes(dietary)}
                  onChange={() => handleDietaryChange(dietary)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{dietary}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Customizable */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={activeFilters.customizable}
              onChange={handleCustomizableChange}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">Customizable Only</span>
          </label>
        </div>

        {/* Active Filters */}
        {(activeFilters.category || activeFilters.dietary.length > 0 || activeFilters.customizable) && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {activeFilters.category && (
                <Badge variant="primary">{activeFilters.category}</Badge>
              )}
              {activeFilters.dietary.map((dietary) => (
                <Badge key={dietary} variant="success">{dietary}</Badge>
              ))}
              {activeFilters.customizable && (
                <Badge variant="secondary">Customizable</Badge>
              )}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default FilterSidebar;