// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import AboutPage from './AboutPage';


export default function About() {
  return (
    <>
      <Navbar />
      <AboutPage/>
      <Footer />
    </>
  );
}
