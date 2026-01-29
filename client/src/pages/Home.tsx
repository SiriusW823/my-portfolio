import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ContentSection from '@/components/ContentSection';
import AwardCard from '@/components/AwardCard';
import CourseCard from '@/components/CourseCard';
import CompetitionCard from '@/components/CompetitionCard';
import ProjectCard from '@/components/ProjectCard';
import SkillsSection from '@/components/SkillsSection';
import Footer from '@/components/Footer';
import {
  siteConfig,
  intro,
  awards,
  courses,
  competitions,
  projects,
  skills,
} from '@/data/portfolioData';

/**
 * Home Page - Personal Portfolio
 * Design: Deep dark theme with smooth scroll animations
 * Layout: Hero section followed by modular content blocks
 */

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navigation name={siteConfig.name} />

      {/* Hero Section */}
      <div className="pt-16 md:pt-20">
        <Hero
          headline={intro.headline}
          description={intro.description}
          onScrollClick={handleScrollToContent}
        />
      </div>

      {/* Main Content */}
      <div ref={contentRef}>
        {/* Awards/Certifications Section */}
        <ContentSection
          title="Certifications & Awards"
          subtitle="Professional achievements and recognitions"
          items={awards}
          renderItem={(item) => (
            <AwardCard
              title={item.title}
              organization={item.organization}
              year={item.year}
              description={item.description}
            />
          )}
          variant="grid"
        />

        {/* Courses Section */}
        <ContentSection
          title="Courses & Training"
          subtitle="Continuous learning and skill development"
          items={courses}
          renderItem={(item) => (
            <CourseCard
              title={item.title}
              instructor={item.instructor}
              year={item.year}
              description={item.description}
              skills={item.skills}
            />
          )}
          variant="grid"
        />

        {/* Competitions Section */}
        <ContentSection
          title="Competitions & Events"
          subtitle="Participation in cybersecurity and tech competitions"
          items={competitions}
          renderItem={(item) => (
            <CompetitionCard
              title={item.title}
              category={item.category}
              year={item.year}
              result={item.result}
              description={item.description}
            />
          )}
          variant="grid"
        />

        {/* Projects Section */}
        <ContentSection
          title="Featured Projects"
          subtitle="Selected works and portfolio highlights"
          items={projects}
          renderItem={(item) => (
            <ProjectCard
              title={item.title}
              description={item.description}
              technologies={item.technologies}
              link={item.link}
              year={item.year}
            />
          )}
          variant="grid"
        />

        {/* Skills Section */}
        <SkillsSection skills={skills} />
      </div>

      {/* Footer */}
      <Footer
        name={siteConfig.name}
        email={siteConfig.email}
        location={siteConfig.location}
        social={siteConfig.social}
      />
    </div>
  );
}
