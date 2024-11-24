import Image from "next/image";
import Header from "./_components/Header";
import Banner from "./_components/Banner";
import Hero from "./_components/Hero";
import Sign from "./_components/Sign";
import DocumentCard from "./_components/DocumentCard";
import UploadModal from "./_components/UploadModal";
import Index from "./_components/Index";

export default function Home() {
  return (
   <>
      <Header />
      {/* <DocumentCard />
      <UploadModal />
      <Index /> */}
      <Banner />
      <Hero />
      <Sign />
      </>
  );
}
