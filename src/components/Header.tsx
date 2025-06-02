import MenuItem from "@/components/MenuItem";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaQuestionCircle, FaUser } from "react-icons/fa";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import Link from "next/link";

const Header = () => {
  return (
    <div className='flex flex-wrap justify-between items-center px-4 py-4 max-w-6xl mx-auto gap-2'>
      <div className='flex flex-wrap items-center gap-3 sm:gap-4'>
        <MenuItem title='HOME' address='/' Icon={AiFillHome} />
        <MenuItem title='ABOUT' address='/about' Icon={BsFillInfoCircleFill} />
        <MenuItem title='FAQs' address='/faq' Icon={FaQuestionCircle} />
      </div>

      <Link href='/'>
        <h2 className='text-lg sm:text-xl md:text-2xl'>
          <span className='font-bold bg-amber-500 py-1 px-2 rounded-lg'>MovieHub</span>
        </h2>
      </Link>

      <div className='flex items-center gap-3'>
        <DarkModeSwitch />
        <Link
          href='/sign-in'
          className='flex items-center gap-1 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-3 py-1 rounded-md text-sm font-semibold'
        >
          <FaUser className='text-base text-white' />
          <span className='hidden text-white sm:inline'>SIGN IN</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
