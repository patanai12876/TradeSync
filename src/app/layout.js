import Navbar from "./components/navbar";
import Footer from "./components/footer";
import PageTransition from "./components/PageTransition";
import "./globals.css";

export const metadata = {
  title: "TradeSync - Copy Trading Platform",
  description: "Invest wisely, copy successful traders, and grow your wealth with TradeSync",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-50">
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
