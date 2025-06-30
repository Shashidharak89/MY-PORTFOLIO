// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import Leetcode from './Leetcode';



export default function Projects() {
  return (
    <>
      <Navbar />
      <Leetcode/>
      <Footer/>
    </>
  );
}
