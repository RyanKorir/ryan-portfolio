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
import CredentialStrip from "@/components/CredentialStrip";
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

  // Built only from data already on the page — nothing invented.
  const credentials = [
    { title: profile.education.degree.replace("Bachelor of Science in ", "B.Sc. "), detail: profile.education.institution },
    ...(certifications.certificates[0]
      ? [{ title: certifications.certificates[0].title, detail: certifications.certificates[0].issuer }]
      : []),
    ...(experience[0]
      ? [{ title: experience[0].roleLabel, detail: experience[0].organization }]
      : []),
    { title: `${projects.length} Projects`, detail: "Showcased below" }
  ];

  return (
    <>
      <Header profile={profile} />
      <main id="main">
        <Hero profile={profile} githubUrl={config.contact.github} />
        <CredentialStrip items={credentials} />
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
