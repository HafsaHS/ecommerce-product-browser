import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

interface SearchFilterProps {
  setProducts: (products: Product[]) => void;
  setTotalProducts: (totalProducts: number) => void;
}

interface Category {
  name: string;
  slug: string;
  url: string;
  icon: React.ReactNode;
}

function DropdownMenuCustom({
  setProducts,
  setTotalProducts,
}: SearchFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const fetchCategories = async () => {
    const res = await axios.get("https://dummyjson.com/products/categories");
    setCategories(res.data);
  };

  const filterProductsByCategory = async (category: string) => {
    const res = await axios.get(
      "https://dummyjson.com/products/category/" + category
    );

    setProducts(res.data.products);
    setTotalProducts(res.data.total);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedCategory ? selectedCategory.name : "Category"}
            <ChevronDownIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 h-96 overflow-auto bg-white border border-gray-200">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              className="flex items-center justify-between px-4 py-2 cursor-pointer"
              key={category.slug}
              checked={categories.includes(category.name as any)}
              onCheckedChange={() => {
                setSelectedCategory(category);
                filterProductsByCategory(category.slug);
              }}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function SearchFilter({
  setProducts,
  setTotalProducts,
}: SearchFilterProps) {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchFilteredProducts = async () => {
    const res = await axios.get(
      "https://dummyjson.com/products/search?q=" + query
    );
    // console.log(res.data.products);
    setProducts(res.data.products);
    setTotalProducts(res.data.total);
  };

  return (
    <>
      <div className="flex justify-center w-full mb-4 ">
        <DropdownMenuCustom
          setProducts={setProducts}
          setTotalProducts={setTotalProducts}
        />
        <Input
          className="w-96 h-10 ml-10"
          type="text"
          placeholder="Search here"
          value={query}
          onChange={handleChange}
        />
        <Button type="submit" onClick={fetchFilteredProducts}>
          Search
        </Button>
      </div>
    </>
  );
}
