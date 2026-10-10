import CategoryProducts, { IProduct } from "@/components/CategoryProducts";


interface ICategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }: ICategoryPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products: IProduct[] = await res.json();

  return (
    <section className="my-8">
      <div className="mb-4 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-5">
        <h1 className="text-2xl font-bold">
          {products[0]?.image} {products[0]?.categoryNameBn ?? categoryId}
        </h1>
        <p className="text-sm text-gray-500">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
      </div>

      <CategoryProducts products={products} />
    </section>
  );
};

export default CategoryPage;
