import { FC } from "react";
import { ImSpinner } from 'react-icons/im';
import styles from './Styles.module.scss';

interface SpinnerI {
    className?: string,
    size?:number,
}

const Spinner: FC<SpinnerI> = ({ className,size=10}) => {
    return (
        <ImSpinner size={size} className={[styles.spinner, className].join(' ')} />
    )
}

Spinner.displayName = 'LoadingSpinner';

export default Spinner;
