import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-4 ">
      {products.map((product) => {
        return (
          <ProductCard
            id={product.id}
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
