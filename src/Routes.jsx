import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AnimatedPortfolioHomepage from "pages/animated-portfolio-homepage";
import ResumePreviewDownload from "pages/resume-preview-download";
import ContactFormInterface from "pages/contact-form-interface";
import SkillsTechnologiesSection from "pages/skills-technologies-section";
import ProjectDetailModal from "pages/project-detail-modal";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AnimatedPortfolioHomepage />} />
        <Route path="/animated-portfolio-homepage" element={<AnimatedPortfolioHomepage />} />
        <Route path="/resume-preview-download" element={<ResumePreviewDownload />} />
        <Route path="/contact-form-interface" element={<ContactFormInterface />} />
        <Route path="/skills-technologies-section" element={<SkillsTechnologiesSection />} />
        <Route path="/project-detail-modal" element={<ProjectDetailModal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;