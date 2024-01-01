import React from 'react';
import Link from "next/link";

const MenuItem = ({title, address, Icon}) => {
    return (
        <div>
            <Link href={address} className='mx-4 lg:mx-6 hover:text-amber-600'>
                <Icon className='text-2xl sm:hidden'/>
                <p>{title}</p>
            </Link>
        </div>
    );
};

export default MenuItem;