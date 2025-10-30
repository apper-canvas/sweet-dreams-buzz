import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-secondary to-secondary/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Cake" size={20} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold">Sweet Dreams</span>
            </div>
            <p className="text-white/80 text-sm">
              Creating delicious memories with custom cakes and pastries made from the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <ApperIcon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <ApperIcon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <ApperIcon name="Twitter" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/Wedding Cakes" className="text-white/80 hover:text-white transition-colors">
                  Wedding Cakes
                </Link>
              </li>
              <li>
                <Link to="/category/Birthday Cakes" className="text-white/80 hover:text-white transition-colors">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link to="/category/Cupcakes" className="text-white/80 hover:text-white transition-colors">
                  Cupcakes
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center space-x-2">
                <ApperIcon name="MapPin" size={16} />
                <span>123 Bakery Lane, Sweet City, SC 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Phone" size={16} />
                <span>(555) 123-CAKE</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Mail" size={16} />
                <span>hello@sweetdreamsbakery.com</span>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div>
            <h3 className="font-semibold mb-4">Store Hours</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>7:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-white/80">
                <ApperIcon name="Clock" size={12} className="inline mr-1" />
                Custom orders require 2-14 days advance notice
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} Sweet Dreams Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;