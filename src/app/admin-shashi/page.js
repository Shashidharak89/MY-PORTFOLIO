// app/about/page.js
import Footer from 'app/components/Footer';
import Navbar from '../components/Navbar';
import SendUpdateForm from './SendUpdateForm';
import ViewSubscribers from './ViewSubscribers';
import ViewContacts from './ViewContacts';
import CreateBlog from 'app/blogs/CreateBlog';
import FooterC from 'app/components/FooterC';
import AdminChatBox from './AdminChatBox';


export default function Projects() {
  return (
    <>
      <Navbar />
      <ViewContacts/>
      
      <ViewSubscribers/>
      <SendUpdateForm/>
      <CreateBlog/>

      <AdminChatBox/>
      <FooterC/>
    </>
  );
}
