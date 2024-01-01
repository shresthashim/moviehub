import React from 'react';
import Link from "next/link";

const MenuItem = ({title, address, Icon}) => {
    return (
        <div>
            <Link href={address}>
                <a>
                    <p>{title}</p>
                </a>
            </Link>
        </div>
    );
};

export default MenuItem;