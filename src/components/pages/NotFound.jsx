import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-surface">
      <div className="text-center space-y-6 px-4">
        <div className="flex justify-center">
          <div className="relative">
            <ApperIcon 
              name="CakeSlice" 
              size={120} 
              className="text-primary/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-display font-bold text-primary">404</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-display font-bold text-gray-900">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Looks like this cake has been eaten! The page you're looking for doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
          >
            <ApperIcon name="Home" size={20} className="mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-3"
          >
            <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;