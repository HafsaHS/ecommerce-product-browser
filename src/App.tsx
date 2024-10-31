import ProductList from "./components/ProductList";
import SearchFilter from "./components/SearchFilter";

export default function App() {
  return (
    <div className="flex flex-1 flex-col py-4">
      <div className="flex justify-center text-3xl py-4">
        Ecommerce Product Borwser
      </div>
      <SearchFilter />
      <ProductList />
    </div>
  );
}
