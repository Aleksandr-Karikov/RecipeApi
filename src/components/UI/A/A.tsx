import React, {FC} from 'react';
import Link from "next/link";
import cl from './Styles.module.scss'

interface linkI {
    href:string,
    children: React.ReactElement | string,
    className?:string
}

const A:FC<linkI & React.HTMLProps<HTMLAnchorElement>> = (props) => {
    return <Link href={props.href}>
        <a {...props}  className={[cl.a,props.className].join(' ')} >
            {props.children}
        </a>
    </Link>
}

export default A;
