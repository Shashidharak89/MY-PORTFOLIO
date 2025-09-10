// app/about/page.js

import Navbar from 'app/components/Navbar';

import FooterC from 'app/components/FooterC';
import QrGenerator from './QrGenerator';


export default function QRGen() {
    return (
        <>
            <Navbar />
           <QrGenerator/>
            <FooterC />
        </>
    );
}
