// app/about/page.js

import Navbar from 'app/components/Navbar';
import FooterC from 'app/components/FooterC';
import ColorPicker from './ColorPicker';


export default function Projects() {
    return (
        <>
            <Navbar />
            <ColorPicker/>
            <FooterC />
        </>
    );
}
