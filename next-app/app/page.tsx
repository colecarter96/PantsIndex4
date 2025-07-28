import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import PantsContentServer from './components/PantsContent.server';
import Hero from './components/Hero';


export default async function Home() {
  return (
    <main className="font-tex-gyre-heros">
       <Header />
       <Hero />
       
       
       <PantsContentServer />
       <Footer />
    </main>
  )
}


