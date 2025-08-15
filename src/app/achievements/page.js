// app/about/page.js


import FooterC from 'app/components/FooterC';
import Navbar from '../components/Navbar';
import Achievements from './Achievements';



export default function Projects() {
  return (
    <>
      <Navbar />
      <Achievements/>
     
      <FooterC/>
    </>
  );
}
