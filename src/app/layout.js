import "./globals.css";
import Provider from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "অর্গানিক ফুড & ইলেকট্রনিক্স",
  description: "অর্গানিক ফুড & ইলেকট্রনিক্স",
  icons: {
    icon: '/Polish_20250919_010532269.png'
  }
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
