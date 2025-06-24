// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import ResumePage from './ResumePage';


export default function Projects() {
  return (
    <>
      <Navbar />
      <ResumePage/>
      <Footer/>
    </>
  );
}
