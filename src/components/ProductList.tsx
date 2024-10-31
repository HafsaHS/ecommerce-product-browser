import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    // console.log(res.data.products);
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-4 ">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            images={product.images}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
