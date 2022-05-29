import React, { useEffect, useState } from 'react';
import s from './Styles.module.scss';
import Spinner from "../Spinner/Spinner";
import pubsub from 'sweet-pubsub'

const Preloader = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const setPreloader = (obj:{isOpen:boolean, duration:number | null}) => {
            setIsOpen(obj.isOpen);
            if (obj.duration) {
                setTimeout(() => setIsOpen(false), obj.duration * 1000);
            }
        };

        pubsub.on('preloader', setPreloader);
        return () => {
            pubsub.off('preloader', setPreloader);
        }
    }, []);


    if (!isOpen) return <></>
    else
        return (
            <div className={s.wrap}>
                <Spinner size={100} className={s.spinner} />
            </div>
        );
}
export default Preloader;
