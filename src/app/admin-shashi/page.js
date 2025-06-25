// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import SendUpdateForm from './SendUpdateForm';
import ViewSubscribers from './ViewSubscribers';


export default function Projects() {
  return (
    <>
      <Navbar />
      <SendUpdateForm/>
      <ViewSubscribers/>
      <Footer/>
    </>
  );
}
