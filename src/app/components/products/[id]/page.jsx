// app/components/products/[id]/page.jsx
import ProductDetails from "./ProductDetails";

export async function generateMetadata({ params }) {
    const { id } = params; // await লাগে না, params synchronous

    try {
        // 🔥 API থেকে ডাটা আনছি
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
            cache: "no-store", // fresh data
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.status}`);
        }

        const data = await res.json();
        const product = data?.product;

        if (!product) {
            return {
                title: "পণ্য পাওয়া যায়নি",
                description: "এই পণ্যটি এখন আর পাওয়া যাচ্ছে না।",
            };
        }

        // Discounted price safe
        const discountedPrice =
            product.discount && product.discount > 0
                ? Math.round(product.price - (product.price * product.discount) / 100)
                : product.price;

        return {
            title: product.product_name || "পণ্য",
            description: product.details || "বিস্তারিত পাওয়া যায়নি।",
            openGraph: {
                title: product.product_name || "পণ্য",
                description: product.details || "বিস্তারিত পাওয়া যায়নি।",
                url: `https://abdullahshopbd.com/components/products/${id}`,
                images: product.product_image
                    ? [
                        {
                            url: product.product_image,
                            width: 1200,
                            height: 630,
                            alt: product.product_name || "Product Image",
                        },
                    ]
                    : [],
                type: "product",
            },
            other: {
                "product:price:amount": discountedPrice,
                "product:price:currency": "BDT",
            },
        };
    } catch (err) {
        console.error("Product Metadata Error:", err);
        return {
            title: "Error",
            description: "ডাটা আনতে সমস্যা হয়েছে",
        };
    }
}

// Server Component: ProductDetails render করবে
export default async function ProductPage({ params }) {
    const { id } = params;
    return <ProductDetails id={id} />;
}
