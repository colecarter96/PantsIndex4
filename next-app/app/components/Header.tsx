import Link from "next/link";
import { HamburgerMenu } from "./HamburgerMenu";
import { Gloria_Hallelujah } from "next/font/google";

const GH = Gloria_Hallelujah({ weight: '400', subsets: ['latin'] });

interface HeaderProps {
  filterButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => (
  <header >
    <div className="fixed shadow top-0 left-0 right-0 flex justify-between lg:justify-center items-center pt-6 pb-3 px-5 bg-white  z-50">
      <h2 className={`text-3xl lg:text-4xl font-extrabold hover:text-red-600 ${GH.className}`}>
        <Link href="/">PANTS INDEX</Link>
      </h2>
      <div className="lg:hidden items-center p-1 justify-between">
        <HamburgerMenu />  {/* Place the HamburgerMenu component */}
      </div>
    </div>
    
  </header>
);

export default Header;