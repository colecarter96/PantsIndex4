import Link from "next/link";
import { HamburgerMenu } from "./HamburgerMenu";
import { Gloria_Hallelujah } from "next/font/google";
import Image from "next/image";

const GH = Gloria_Hallelujah({ weight: '400', subsets: ['latin'] });

interface HeaderProps {
  filterButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => (
  <header className="fixed top-0 left-0 right-0 z-50">
    {/* <div className=" hidden md:flex justify-center bg-red-600 text-white py-1">
        <Link href="/waitlist">We are currently developing! Click here to stay up to date or hit us with sugggestions!</Link>
    </div> */}

    <div className="flex md:hidden justify-center bg-red-800 text-slate-100 py-1">
        <Link href="/waitlist">Click here to stay up to date or hit us with sugggestions!</Link>
    </div>
    <div className="fixed shadow top-0 left-0 right-0 flex justify-between lg:justify-center items-center pt-3 pb-3 px-5 bg-red-700 z-50">
      
      
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image 
          src="/redWhiteLogoSq.svg" 
          alt="Pants Index Logo" 
          width={120} 
          height={40} 
          className="h-10 md:h-10 lg:h-10 xl:h-12  w-auto"
          priority
        />
      </Link>
      {/* <h1 className="hidden lg:block absolute right-7 text-lg hover:text-red-600 cursor-pointer">
        BLOG
      </h1> */}
      
      <h1 className="font-comico text-slate-100 hidden lg:block absolute left-7 text-lg  lg:text-xl hover:text-red-800 cursor-pointer">
        <Link href="/similar-pants">Find Similar</Link>
      </h1>
      <h1 className="font-comico text-slate-100 hidden lg:block absolute right-36 lg:right-40 text-lg  lg:text-xl hover:text-red-800 cursor-pointer">
        <Link href="/submit-pants">Contribute</Link>
      </h1>
      <h1 className="font-comico text-slate-100 hidden lg:block absolute right-7 text-lg  lg:text-xl hover:text-red-800 cursor-pointer">
        <Link href="/contact">Contact</Link>
      </h1>
      <div className="lg:hidden items-center p-1 justify-between">
        <HamburgerMenu />  {/* Place the HamburgerMenu component */}
      </div>
    </div>
    
  </header>
);

export default Header;