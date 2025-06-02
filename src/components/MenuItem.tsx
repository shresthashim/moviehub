import React from "react";
import Link from "next/link";

type MenuItemProps = {
  title: string;
  address: string;
  Icon: React.ElementType;
};

const MenuItem: React.FC<MenuItemProps> = ({ title, address, Icon }) => {
  return (
    <Link href={address} className='flex items-center space-x-1 text-sm hover:text-amber-600'>
      <Icon className='text-lg sm:hidden' />
      <span className='hidden sm:inline'>{title}</span>
    </Link>
  );
};

export default MenuItem;
