import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-12 pl-4 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
        />
        <Button
          type="submit"
          className="absolute right-1 h-10 w-10 rounded-full p-0"
          variant="primary"
        >
          <ApperIcon name="Search" size={20} />
        </Button>
      </div>
    </motion.form>
  );
};

export default SearchBar;