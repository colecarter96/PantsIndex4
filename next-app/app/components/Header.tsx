import Link from "next/link";
import { HamburgerMenu } from "./HamburgerMenu";
import { Gloria_Hallelujah } from "next/font/google";

const GH = Gloria_Hallelujah({ weight: '400', subsets: ['latin'] });

interface HeaderProps {
  filterButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => (
  <header className="fixed top-0 left-0 right-0 z-50">
    <div className=" hidden md:flex justify-center bg-red-600 text-white py-1">
        <Link href="/waitlist">We are currently developing! Click here to stay up to date or hit us with sugggestions!</Link>
    </div>

    <div className="flex md:hidden justify-center bg-red-600 text-white py-1">
        <Link href="/waitlist">Click here to stay up to date or hit us with sugggestions!</Link>
    </div>
    <div className="fixed shadow top-8 left-0 right-0 flex justify-between lg:justify-center items-center pt-6 pb-3 px-5 bg-white  z-50">
      
      
      <h2 className={`text-3xl lg:text-4xl font-extrabold hover:text-red-600 ${GH.className}`}>
        <Link href="/">PANTS INDEX</Link>
      </h2>
      {/* <h1 className="hidden lg:block absolute right-7 text-lg hover:text-red-600 cursor-pointer">
        BLOG
      </h1> */}
      <h1 className="hidden lg:block absolute right-7 text-lg hover:text-red-600 cursor-pointer">
        <Link href="/submit-pants">Contribute</Link>
      </h1>
      <div className="lg:hidden items-center p-1 justify-between">
        <HamburgerMenu />  {/* Place the HamburgerMenu component */}
      </div>
    </div>
    
  </header>
);

export default Header;