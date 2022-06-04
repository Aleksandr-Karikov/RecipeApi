import React, { FC } from 'react'
import recipeI from 'interfaces/recipe';
import classes from './Styles.module.scss';
import Link from 'next/link'
import A from "../UI/A/A";

interface RecipeComponentI {
    recipe: recipeI
}

const Recipe: FC<RecipeComponentI> = ({ recipe }) => {
    return (
        <div className={classes.wrap}>
            <img src={recipe.image} alt="recipe" className={classes.image} />
            <div className={classes.info}>
                <div className={classes.title}>
                    {recipe.title}
                </div>
                <A href={`recipes/${recipe.id}`} className={classes.link}>
                    Перейти к рецепту
                </A>

            </div>
        </div>
    )
}

export default Recipe;
