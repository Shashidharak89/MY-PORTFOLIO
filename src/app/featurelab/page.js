// app/about/page.js
import Navbar from '../components/Navbar';
import FooterC from 'app/components/FooterC';
import Dashboard from './Dashboard';


export default function Projects() {
  return (
    <>
      <Navbar />
      <Dashboard/>
      <FooterC/>
    </>
  );
}
