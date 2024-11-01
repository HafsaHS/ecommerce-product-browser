import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

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
    <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.title} image ${index + 1}`}
            className="w-full h-72 object-cover rounded-lg shadow-lg"
          />
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          {product.title}
        </h1>
        <p className="text-sm text-gray-500 uppercase">{product.category}</p>
        <p className="text-2xl font-bold text-red-600">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Rating:</span> {product.rating} ⭐ (
          {product.reviews.length} reviews)
        </p>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
