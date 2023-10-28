import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto">
        <Link href="/" passHref>
          <button className="font-bold text-xl">Safe Eats NYC</button>
        </Link>
        <div className="float-right">
          <Link href="/restaurants" passHref>
            <button className="mx-2">Restaurants</button>
          </Link>
          <Link href="/violations" passHref>
            <button className="mx-2">Violations</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
