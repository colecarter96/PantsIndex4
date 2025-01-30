import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import PantsContentServer from './components/PantsContent.server';


export default async function Home() {
  return (
    <main>
      <Header />
      {/* <PantsContentServer /> */}
      <Footer />
    </main>
  )
}


