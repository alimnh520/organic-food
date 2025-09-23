// app/components/products/[id]/page.jsx
import ProductDetails from "./ProductDetails";

export async function generateMetadata({ params }) {
    const { id } = await params

    try {
        // 🔥 API থেকে ডাটা আনবো (তোর নিজের /api/products/[id] endpoint থেকে)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
            cache: "no-store", // যাতে fresh ডাটা আসে
        });
        const data = await res.json();
        const product = data?.product;

        if (!product) {
            return {
                title: "পণ্য পাওয়া যায়নি",
                description: "এই পণ্যটি এখন আর পাওয়া যাচ্ছে না।",
            };
        }
        const discountedPrice = product.discount && product.discount > 0
            ? Math.round(product.price - (product.price * product.discount) / 100)
            : null;

        return {
            title: product.product_name,
            description: product.details,
            openGraph: {
                title: product.product_name,
                price: `${discountedPrice ? discountedPrice : product.price}৳`,
                description: product.details,
                url: `https://yourdomain.com/components/products/${id}`,
                images: [
                    {
                        url: product.product_image, // ✅ DB এর ইমেজ
                        width: 1200,
                        height: 630,
                        alt: product.product_name,
                    },
                ],
            },
        };
    } catch (err) {
        console.error(err);
        return {
            title: "Error",
            description: "ডাটা আনতে সমস্যা হয়েছে",
        };
    }
}

// পেজে ProductDetails রেন্ডার করবে
export default async function ProductPage({ params }) {
    const { id } = await params
    return <ProductDetails id={id} />;
}
