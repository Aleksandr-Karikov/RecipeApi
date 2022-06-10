import React, {FC, useEffect, useRef, useState} from 'react';
import cl from './Styles.module.scss'
import recipeI from "../../../interfaces/recipe";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

interface variantI {
    title:string,
    id:number
}

interface SearchI {
    onActiveChange:(active:string)=>void,
    variants:variantI[],
    onInputChange:React.ChangeEventHandler<HTMLInputElement>;
    placeholder?:string
}

const SearchInput:FC<SearchI> = (props) => {
    const {onActiveChange,onInputChange,variants,placeholder} = props;
    const $refWrap = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [opened,setOpened] = useState(false);

    const toggle = () => {
        setOpened(!opened);
    }

    useOnClickOutside($refWrap,opened,toggle);

    const handleClick = (selected:string)=> {
        onActiveChange(selected)
        toggle();
    }

    return (
        <div className={cl.wrap} ref={$refWrap}>
            <input className={cl.input}
                   placeholder={placeholder}
                   type="text"
                   onChange={onInputChange}
                   onFocus={()=>toggle()}
            />
            {
                opened &&
                <div className={cl.variants}>
                    {
                        variants.length
                            ? variants.map((variant)=> (
                                <div className={cl.variant}
                                     key={variant.id}
                                     onClick={(e)=> {
                                         e.preventDefault()
                                         handleClick(variant.title)
                                     }}
                                >
                                    {variant.title}
                                </div>
                            ))
                            :<div
                                className={cl.variant}
                                onClick={()=>handleClick("")}
                            >
                                Нет результатов, сбросить фильтр?
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default SearchInput;
