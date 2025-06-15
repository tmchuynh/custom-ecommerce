import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{
    categorySlug: string;
    product: string; // This will be the product name
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { categorySlug, product: productTitle } = await params;

  return (
    <ProductDetailClient
      categorySlug={categorySlug}
      productTitle={productTitle}
    />
  );
}
