import { ProductCard } from "./product-card";

export default function Products() {
  return (
    <div>
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, idx) => (
          <ProductCard key={idx} />
        ))}
      </div>
    </div>
  );
}
