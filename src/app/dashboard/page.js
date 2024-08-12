import Image from "next/image";
import Header from "@/components/Includes/Header/Header";
import Footer from "@/components/Includes/Footer/Footer";
import DefaultPage from "@/components/Admin/Home/Home";

export default function Home() {
    return (
        <>
            <DefaultPage>
                <main className="flex-1 p-4 mt-16">
                <h1 className="text-2xl font-bold">Home</h1>
                <p className="mt-2">Welcome to the Home page!</p>
            </main>
            </DefaultPage>
        </>
    );
}
