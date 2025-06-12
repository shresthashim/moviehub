import MenuItem from "@/components/MenuItem";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaQuestionCircle, FaUser } from "react-icons/fa";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-4 max-w-6xl mx-auto gap-2'>
      <nav className='flex flex-wrap items-center gap-3 sm:gap-4'>
        <MenuItem title='HOME' address='/' Icon={AiFillHome} />
        <MenuItem title='ABOUT' address='/about' Icon={BsFillInfoCircleFill} />
        <MenuItem title='FAQs' address='/faq' Icon={FaQuestionCircle} />
        <MenuItem title='FAVORITES' address='/favorites' Icon={AiFillStar} />
      </nav>

      <Link href='/' className='flex-shrink-0'>
        <h1 className='text-lg sm:text-xl md:text-2xl'>
          <span className='font-bold bg-amber-500 py-1 px-2 rounded-lg cursor-pointer select-none'>MovieHub</span>
        </h1>
      </Link>

      <div className='flex items-center gap-3'>
        <DarkModeSwitch />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
                userButtonAvatar: "w-10 h-10 rounded-full",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <Link
            href='/sign-in'
            className='flex items-center gap-1 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-3 py-1 rounded-md text-sm font-semibold'
          >
            <FaUser className='text-base' />
            <span className='hidden sm:inline'>SIGN IN</span>
          </Link>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
