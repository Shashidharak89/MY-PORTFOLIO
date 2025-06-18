// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import ContactForm from './ContactForm';


export default function Projects() {
  return (
    <>
      <Navbar />
      <ContactForm/>
      <Footer/>
    </>
  );
}
