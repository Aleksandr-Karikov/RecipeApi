import React, { FC } from 'react'
import recipeI from 'interfaces/recipe';
import classes from './Styles.module.scss';
import Image from 'next/image'
import Link from 'next/link'
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
                <div className={classes.likes}>
                    Likes {recipe.likes}
                </div>
                <Link href='#'>
                    <div className={classes.link}>
                        Перейти к рецепту
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Recipe;