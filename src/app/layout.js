import "./globals.css";
import Provider from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Abdullah Online Shop",
  description: "Abdullah Online Shop is a Online shopping center. You can order many product from here",
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
