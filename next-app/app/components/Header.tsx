import Link from "next/link";
import { HamburgerMenu } from "./HamburgerMenu";

interface HeaderProps {
  filterButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => (
  <header className="fixed top-0 left-0 right-0 flex justify-between items-center pt-6 pb-6 px-4 bg-white border-b border-gray-500 z-50">
    <h1 className="text-3xl font-bold">
      <Link href="/">Pants Index</Link>
    </h1>
    <div className="lg:hidden">
      <HamburgerMenu />  {/* Place the HamburgerMenu component */}
    </div>
  </header>
);

export default Header;