import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: number;
  reviews: number[];
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  return (
    <div className="px-10">
      <div className="flex items-center justify-between pb-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          title="Back"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex justify-center text-3xl font-bold py-4">
          Product Details
        </div>
        <div></div>
      </div>
      <div className="flex flex-row">
        <div className="space-y-5 w-1/3">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} image ${index + 1}`}
              className="w-full h-72 object-contain rounded-lg border border-gray-200"
            />
          ))}
        </div>
        <div className="w-2/3">
          <div className="bg-white px-6 rounded-lg space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {product.title}
            </h1>
            <Badge className="uppercase">{product.category}</Badge>
            <p className="text-2xl font-bold text-black">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Rating:</span> {product.rating} ⭐ (
              {product.reviews.length} reviews)
            </p>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-2 gap-8">
    //   <Button variant="outline" size="icon" onClick={() => navigate("/")}>
    //     <ChevronLeft className="h-4 w-4" />
    //   </Button>
    //   <div className="space-y-5">
    //     {product.images.map((image, index) => (
    //       <img
    //         key={index}
    //         src={image}
    //         alt={`${product.title} image ${index + 1}`}
    //         className="w-full h-72 object-cover rounded-lg border border-gray-200"
    //       />
    //     ))}
    //   </div>
    //   <div className="bg-white p-6 rounded-lg space-y-4">
    //     <h1 className="text-3xl font-semibold text-gray-800">
    //       {product.title}
    //     </h1>
    //     <p className="text-sm text-gray-500 uppercase">{product.category}</p>
    //     <p className="text-2xl font-bold text-red-600">
    //       ${product.price.toFixed(2)}
    //     </p>
    //     <p className="text-gray-600">
    //       <span className="font-medium">Rating:</span> {product.rating} ⭐ (
    //       {product.reviews.length} reviews)
    //     </p>
    //     <p className="text-gray-700 leading-relaxed">{product.description}</p>
    //   </div>
    // </div>
  );
}
