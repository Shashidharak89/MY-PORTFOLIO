// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import CreateBlog from './CreateBlog';



export default function Projects() {
  return (
    <>
      <Navbar />
     <CreateBlog/>
      <Footer/>
    </>
  );
}
