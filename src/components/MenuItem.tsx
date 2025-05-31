import React from "react";
import Link from "next/link";

type MenuItemProps = {
  title: string;
  address: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ElementType;
};

const MenuItem: React.FC<MenuItemProps> = ({ title, address, Icon }) => {
  return (
    <div>
      <Link href={address} className='mx-4 lg:mx-6 hover:text-amber-600'>
        <Icon className='text-2xl sm:hidden mx-4' />
        <p className='hidden sm:inline my-2 text-sm '>{title}</p>
      </Link>
    </div>
  );
};

export default MenuItem;
