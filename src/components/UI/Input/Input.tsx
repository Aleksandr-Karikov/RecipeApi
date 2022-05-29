import React, {FC, InputHTMLAttributes} from 'react';
import cl from './Styles.module.scss'

const Input:FC<InputHTMLAttributes<any>> = (props) => (
    <input {...props} className={cl.input}/>
);

export default Input;
