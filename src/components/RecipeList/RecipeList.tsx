import React, { FC } from 'react'
import recipeI from 'interfaces/recipe';
import classes from './Styles.module.scss';
import Recipe from '../Recipe/Recipe'
interface RecipeListComponentI {
    recipes: recipeI[]
}

const RecipeList: FC<RecipeListComponentI> = ({ recipes }) => {
    return (
        <div className={classes.wrap}>
            {
                recipes.map((item) => {
                    return (
                        <Recipe recipe={item} key={item.id}></Recipe>
                    )
                })
            }
        </div>
    )
}

export default RecipeList