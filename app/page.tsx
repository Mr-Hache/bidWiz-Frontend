"use client";

import Hero from "./Componets/hero/hero";
import Why from "./Componets/why/why";
import LandingWizards from "./Componets/landingWizards/landingWizards";
import Footer from "./Componets/footer/footer";
import Navbar from "./Componets/navbar/navbar";

export default function Landing() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Why />
      <LandingWizards />
      <Footer />
    </main>
  );
}
