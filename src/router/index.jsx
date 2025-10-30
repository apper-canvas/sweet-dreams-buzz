import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/components/organisms/Layout";

// Lazy load all page components
const Home = lazy(() => import("@/components/pages/Home"));
const Category = lazy(() => import("@/components/pages/Category"));
const ProductDetail = lazy(() => import("@/components/pages/ProductDetail"));
const CakeDesigner = lazy(() => import("@/components/pages/CakeDesigner"));
const Cart = lazy(() => import("@/components/pages/Cart"));
const Gallery = lazy(() => import("@/components/pages/Gallery"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Wrap components with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

// Main routes configuration
const mainRoutes = [
  {
    path: "",
    index: true,
    element: withSuspense(Home)
  },
  {
    path: "category/:categoryName",
    element: withSuspense(Category)
  },
  {
    path: "product/:productId",
    element: withSuspense(ProductDetail)
  },
  {
    path: "cake-designer",
    element: withSuspense(CakeDesigner)
  },
  {
    path: "cart",
    element: withSuspense(Cart)
  },
  {
    path: "gallery",
    element: withSuspense(Gallery)
  },
  {
    path: "*",
    element: withSuspense(NotFound)
  }
];

// Router configuration
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes
  }
];

export const router = createBrowserRouter(routes);