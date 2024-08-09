import Image from "next/image";
import Register from "@/components/Register/Register";
import Header from "@/components/Includes/Header/Header";
import Footer from "@/components/Includes/Footer/Footer";
import HomePage from "@/components/Includes/Home/Home";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* <Register /> */}
      <Header />
      <HomePage />
      <Footer />
    </main>
  );
}
