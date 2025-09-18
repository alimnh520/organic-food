import "./globals.css";
import Provider from "./Provider";

export const metadata = {
  title: "অর্গানিক ফুড & ইলেকট্রনিক্স",
  description: "অর্গানিক ফুড & ইলেকট্রনিক্স",
  icons: {
    icon: '/06c5f32c-625a-4122-871a-8280c514fe.jpg'
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
        </Provider>
      </body>
    </html>
  );
}
