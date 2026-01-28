import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import ExperienceList from "@/components/ExperienceList";
import AwardsList from "@/components/AwardsList";
import ActivitiesList from "@/components/ActivitiesList";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  return (
    <>
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Neon Section Divider */}
        <div className="neon-divider" />

        {/* Experience Section */}
        <ExperienceList />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Awards Section */}
        <AwardsList />

        {/* Neon Section Divider */}
        <div className="neon-divider" />

        {/* Activities Section */}
        <ActivitiesList />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
