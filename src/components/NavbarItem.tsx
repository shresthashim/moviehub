import React from 'react';
import Link from "next/link";

// @ts-ignore
const NavbarItem = ({title, param}) => {
    return (
        <div>
            <Link href={`/?genre=${param}`}>
                {title}
            </Link>
        </div>
    );
};

export default NavbarItem;