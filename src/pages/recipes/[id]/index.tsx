import React from 'react'
import {GetServerSideProps, NextPage} from "next";
import recipeI from "../../../interfaces/recipe";
import apiHelper from "../../../utils/ApiHelper";
import cl from './Styles.module.scss'
import Heart from 'public/icons/heart.svg'
import A from "../../../components/UI/A/A";

interface Props {
    recipe: recipeI;
}

const Recipe:NextPage<Props> = ({recipe}) => {
    const {title, aggregateLikes, image,extendedIngredients} = recipe;
    return (
        <div className={cl.wrap}>
            <A href={'/recipes'}>{'Back'}</A>
            <h1 className={cl.title}>{title}</h1>
            <div className={cl.recipe}>
                <img src={image} alt="recipe" className={cl.img}/>
                <div className={cl.info}>
                    <div className={cl.blockInfo}>
                        {'aggregatelikes '}
                        <Heart width={25} height={25} className={cl.icon}/>
                        {aggregateLikes}
                    </div>
                </div>
            </div>
            <div>
                <h2>Ingredients</h2>
                {extendedIngredients.map((item) => <div key={item.id}  className={cl.flex}>
                    <label className={cl.name}>{item.name}</label>
s                    <div>
                        {'amount: '}
                        {item.amount}
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const {id} = query;
    const res: recipeI = await apiHelper.getRecipeById(id as string);
    return {
        props: {recipe: res}
    }
}

export default Recipe
