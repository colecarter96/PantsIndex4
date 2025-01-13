import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import PantsContent from './components/PantsContent';


export default async function Home() {
  return (
    <main>
      <Header />
      <PantsContent />
      <Footer />
    </main>
  )
}


