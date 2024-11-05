import ProductList from "@/components/ProductList";
import SearchFilter from "@/components/SearchFilter";
import { Product } from "@/types/product";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDownIcon } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 12; // maximum items per page

  const fetchProducts = async (page = 1) => {
    const res = await axios.get(
      `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (page - 1) * itemsPerPage
      }`
    );
    setProducts(res.data.products);
    setTotalProducts(res.data.total); // Store total count from API
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage); // Calculate total pages
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex justify-center text-3xl font-bold py-4">
        Ecommerce Product Browser
      </div>
      <div className="my-4 mx-4">
        <SearchFilter
          setProducts={setProducts}
          setTotalProducts={setTotalProducts}
        />
        <ProductList products={products} />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              )}
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
