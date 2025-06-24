// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';

import ProjectsSection from './ProjectsSection';

export default function Projects() {
  return (
    <>
      <Navbar />
     
      <ProjectsSection/>
      <Footer/>
    </>
  );
}
