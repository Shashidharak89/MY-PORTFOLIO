// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import Leetcode from './Leetcode';
import FooterC from 'app/components/FooterC';
import Github from './Github';
import GFGProfile from './GFGProfile';



export default function Projects() {
  return (
    <>
      <Navbar />
      <Github/>
      <Leetcode/>
      <GFGProfile/>
      <FooterC/>
    </>
  );
}
