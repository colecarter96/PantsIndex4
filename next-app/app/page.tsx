import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import PantsContentServer from './components/PantsContent.server';


export default async function Home() {
  return (
    <main className="font-tex-gyre-heros">
       <Header />
       
       {/* Hero Section with Animation */}
       <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
         <div className="max-w-6xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="text-center lg:text-left">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                 Find Your
                 <span className="text-red-600 block">Pants</span>
               </h1>
               <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                 Discover pants that match your favorite measurements. 
                 No more guessing, no more endless searches.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <Link 
                   href="/similar-pants" 
                   className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
                 >
                   Find Similar Pants
                 </Link>
                 <Link 
                   href="/submit-pants" 
                   className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
                 >
                   Contribute Pants
                 </Link>
               </div>
             </div>
             <div className="flex justify-center lg:justify-end">
             </div>
           </div>
         </div>
       </section>
       
       <PantsContentServer />
       <Footer />
    </main>
  )
}


