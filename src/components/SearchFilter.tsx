import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import axios from "axios";
import { useState } from "react";

interface SearchFilterProps {
  setProducts: (products: Product[]) => void;
}
export default function SearchFilter({ setProducts }: SearchFilterProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search query: ", query);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchFilteredProducts = async () => {
    const res = await axios.get(
      "https://dummyjson.com/products/search?q=" + query
    );
    // console.log(res.data.products);
    setProducts(res.data.products);
  };

  return (
    <div className="flex justify-center w-full mb-4 ">
      <Input
        className="w-48 h-10"
        type="text"
        placeholder="Search here"
        value={query}
        onChange={handleChange}
      />
      <Button type="submit" onClick={fetchFilteredProducts}>
        Search
      </Button>
    </div>
  );
}
