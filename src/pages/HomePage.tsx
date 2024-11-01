import ProductList from "@/components/ProductList";
import SearchFilter from "@/components/SearchFilter";

export default function HomePage() {
  return (
    <>
      <div className="flex justify-center text-3xl py-4">
        Ecommerce Product Borwser
      </div>
      <div className="my-4 mx-4">
        <SearchFilter />
        <ProductList />
      </div>
    </>
  );
}
