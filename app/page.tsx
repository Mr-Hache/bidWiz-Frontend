import Hero from "./Componets/hero/hero";
import Why from "./Componets/why/why";
import LandingWizards from "./Componets/landingWizards/landingWizards";
import Footer from "./Componets/footer/footer";

export default function Landing() {
  return (
    <main>
      <Hero />
      <Why />
      <LandingWizards />
      <Footer />
    </main>
  );
}
