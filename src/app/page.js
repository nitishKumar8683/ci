import Image from "next/image";
import Header from "../components/Includes/Header/Header";
import Footer from "../components/Includes/Footer/Footer";
import HomePage from "../components/Includes/Home/Home";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HomePage />
      <Footer />
    </main>
  );
}
