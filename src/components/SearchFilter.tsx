import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useState, useEffect } from "react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

interface SearchFilterProps {
  setProducts: (products: Product[]) => void;
  setTotalProducts: (totalProducts: number) => void;
}

interface Category {
  name: string;
  slug: string;
  url: string;
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

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
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
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
    </>
  );
}
