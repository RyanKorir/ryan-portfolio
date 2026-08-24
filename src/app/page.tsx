import {
  getProfile,
  getExperience,
  getProjects,
  getSkills,
  getBuildLab,
  getConfig,
  getCertifications
} from "@/lib/data";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import BuildLab from "@/components/BuildLab";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const profile = getProfile();
  const experience = getExperience();
  const projects = getProjects();
  const skills = getSkills();
  const buildLab = getBuildLab();
  const config = getConfig();
  const certifications = getCertifications();

  return (
    <>
      <Header profile={profile} />
      <main id="main">
        <Hero profile={profile} />
        <About profile={profile} />
        <Experience entries={experience} />
        <Projects projects={projects} />
        <Skills data={skills} />
        <Certifications data={certifications} />
        <BuildLab data={buildLab} />
        <Contact config={config} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
