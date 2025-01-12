import Link from "next/link";

const Header = () => (
  <header className="fixed top-0 left-0 right-0 flex justify-between items-center pt-6 pb-6 px-4 bg-white border-b border-gray-500 z-50">
    <h1 className="text-3xl font-bold">
      <Link href="/">Pants Index</Link>
    </h1>
    <nav className="flex text-2xl space-x-4 mr-10">
      <Link className="px-3" href="/blog">
        Blog
      </Link>
      <Link className="px-3" href="/find">
        Find
      </Link>
      <Link className="px-3" href="/filter">
        Filter
      </Link>
    </nav>
  </header>
);

export default Header;