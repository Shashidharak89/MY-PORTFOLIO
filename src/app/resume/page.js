// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import ResumePage from './ResumePage';
import FooterC from 'app/components/FooterC';


export default function Projects() {
  return (
    <>
      <Navbar />
      <ResumePage/>
      <FooterC/>
    </>
  );
}
