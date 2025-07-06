// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import Leetcode from './Leetcode';
import FooterC from 'app/components/FooterC';
import Github from './Github';
import GFGProfile from './GFGProfile';
import Instagram from './Instagram';



export default function Projects() {
  return (
    <>
    <Instagram/>
      <Navbar />
      <Github/>
      
      <Leetcode/>
      <GFGProfile/>
      <FooterC/>
    </>
  );
}
