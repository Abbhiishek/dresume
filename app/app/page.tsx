import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { BuildWithCreativity } from "@/components/home/buildwithcreativity";
import LandingSection from "@/components/home/landingsection";

export default function Home() {
  return (
    <main >
      <NavBar />
      <LandingSection />
      <BuildWithCreativity />
      <Footer />
    </main>
  );
}
