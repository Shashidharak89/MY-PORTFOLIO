// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import BlogList from './BlogList';
import BlogPosts from './BlogPosts';



export default function Projects() {
  return (
    <>
      <Navbar />
      <BlogList />
      <Footer />
    </>
  );
}
