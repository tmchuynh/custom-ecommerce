import CategoryClient from "./CategoryClient";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;

  return <CategoryClient categorySlug={categorySlug} />;
}
