// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import ProjectsPage from './ProjectsPage';

export default function Projects() {
  return (
    <>
      <Navbar />
      <ProjectsPage/>
      <Footer/>
    </>
  );
}
