import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full p-6 dark:shadow-none sm:px-12 shadow-light-300 gap-5">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="Devflow Logo"
        />
        <p className="h2-bold font-space-grotesk">
          Dev <span>Flow</span>
        </p>
      </Link>
    </nav>
  );
};

export default Navbar;
