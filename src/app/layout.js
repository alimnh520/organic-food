import "./globals.css";
import Provider from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "🛍️ Abdullah Online Shop | অনলাইন শপিং সেন্টার",
  description:
    "Abdullah Online Shop একটি নির্ভরযোগ্য অনলাইন শপিং সেন্টার। এখানে আপনি 🥬 অর্গানিক ফুড, 🏗 কনস্ট্রাকশন, ⚡ ইলেকট্রিক, 🔩 হার্ডওয়্যার, 🚿 স্যানিটারি, 🧱 ঢেউটিন ও এলবেস্টার, 🔥 গ্যাস সিলিন্ডার এবং 🍳 কুকারিজ ও কিচেন আইটেমস সহ নানা ধরনের পণ্য অর্ডার করতে পারবেন। দ্রুত ডেলিভারি ও বিশ্বস্ত সার্ভিস আমাদের অঙ্গীকার।",
  keywords: [
    "Abdullah Online Shop",
    "Online Shopping BD",
    "Organic Food",
    "Construction Materials",
    "Electric Items",
    "Hardware Tools",
    "Sanitary Products",
    "Gas Cylinder",
    "Cookeries",
    "Kitchen Items",
    "Bangladesh Online Store"
  ],
  authors: [{ name: "Nahid Hasan", url: "https://www.facebook.com/abdullahonlineshoppingbd" }],
  openGraph: {
    title: "Abdullah Online Shop | অনলাইন শপিং সেন্টার",
    description:
      "Abdullah Online Shop থেকে সহজেই অর্ডার করুন — অর্গানিক ফুড, কনস্ট্রাকশন, ইলেকট্রিক, হার্ডওয়্যার, স্যানিটারি, গ্যাস সিলিন্ডার, কুকারিজ ও আরও অনেক কিছু এক জায়গায়।",
    url: "https://www.abdullahshopbd.com/",
    siteName: "Abdullah Online Shop",
    images: [
      {
        url: "https://www.abdullahshopbd.com/my-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Abdullah Online Shop Logo",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  icons: {
    icon: "/my-logo.jpg",
    shortcut: "/my-logo.jpg",
    apple: "/my-logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Provider>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
