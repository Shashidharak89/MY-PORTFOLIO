// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import ProjectsPage from './ProjectsPage';
import ProjectsSection from './ProjectsSection';
import FooterC from 'app/components/FooterC';

export default function Projects() {
  return (
    <>
      <Navbar />
      <ProjectsSection/>
      <FooterC/>
    </>
  );
}
