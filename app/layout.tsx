import { Poppins } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";
import SendToWebhook from "./components/Analytics/SendToWebhook";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Omni - Component Testing Ground",
  description: "A playground for testing various React components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-black min-h-screen flex flex-col`}
      >
        <SendToWebhook showFeedback={false} debugMode={false} />
        <ClientLayout>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
