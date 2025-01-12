import Image from 'next/image';
import Link from 'next/link';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <h1 className='pt-32'>Hello World</h1>
      <Link href='/users'>Users</Link>
      <ProductCard />
      <Footer />
    </main>
  )
}
