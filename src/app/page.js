
import Navbar from './components/Navbar';
import PortfolioDashboard from './components/PortfolioDashboard';
import Preloader from './components/Preloader';

export default function Home() {
  return (
    <>
      <Navbar/>
     <PortfolioDashboard/>
     <Preloader/>
    </>
  );
}