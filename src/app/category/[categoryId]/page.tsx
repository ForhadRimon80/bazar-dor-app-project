import { notFound } from "next/navigation";
import CategoryProducts, { IProduct } from "@/components/CategoryProducts";

interface ICategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }: ICategoryPageProps) => {
  const { categoryId } = await params;

  //* Fetch categories It just used for checking if the category exists. If not, it will return a 404 page. */
  const categoryRes = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");

  if (!categoryRes.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: { id: string; slug: string }[] = await categoryRes.json();
  console.log("Categories:", categories);
  console.log("Category ID:", categoryId);

  // Check category exists
  const categoryExists = categories.some((category) => category.slug === categoryId);

  if (!categoryExists) {
    notFound();
  }

  //* Fetch category products this is main data for this page */
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products: IProduct[] = await res.json();

  return (
    <section className="my-4 mx-2.5 sm:my-6 lg:my-8">
      <div className="mb-4 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 sm:p-4 lg:p-5">
        <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
          {products[0]?.image} {products[0]?.categoryNameBn ?? categoryId}
        </h1>

        <p className="text-xs text-gray-500 sm:text-sm">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
      </div>

      <CategoryProducts products={products} />
    </section>
  );
};

export default CategoryPage;
