// app/about/page.js
import ChatWidget from 'app/components/ChatWidget';
import Navbar from '../components/Navbar';
import ContactForm from './ContactForm';
import FooterC from 'app/components/FooterC';


export default function Projects() {
  return (
    <>
      <Navbar />
      <ContactForm/>
      <ChatWidget/>
      <FooterC/>
    </>
  );
}
