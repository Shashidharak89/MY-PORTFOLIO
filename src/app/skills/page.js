// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import Skills from './Skills';


export default function Projects() {
  return (
    <>
      <Navbar />
      <Skills/>
      <Footer/>
    </>
  );
}
