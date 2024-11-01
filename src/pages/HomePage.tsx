import ProductList from "@/components/ProductList";
import SearchFilter from "@/components/SearchFilter";
import { Product } from "@/types/product";
import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage() {
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
    <>
      <div className="flex justify-center text-3xl py-4">
        Ecommerce Product Borwser
      </div>
      <div className="my-4 mx-4">
        <SearchFilter setProducts={setProducts} />
        <ProductList products={products} />
      </div>
    </>
  );
}
