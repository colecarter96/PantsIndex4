import Link from "next/link";
import { HamburgerMenu } from "./HamburgerMenu";

interface HeaderProps {
  filterButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => (
  <header className="fixed top-0 left-0 right-0 flex justify-between items-center pt-3 pb-3 px-5 bg-white border-b border-gray-500 z-50">
    <h2 className="text-3xl font-medium">
      <Link href="/">Pants Index</Link>
    </h2>
    <div className="lg:hidden">
      <HamburgerMenu />  {/* Place the HamburgerMenu component */}
    </div>
  </header>
);

export default Header;