// app/about/page.js
import Navbar from '../components/Navbar';
import BlogList from './BlogList';
import BlogPosts from './BlogPosts';
import FooterC from 'app/components/FooterC';



export default function Projects() {
  return (
    <>
      <Navbar />
      <BlogList />
      <FooterC />
    </>
  );
}
