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
            {recipes.length
                ? <div>
                    {
                        recipes.map((item) => {
                            return (
                                <Recipe recipe={item} key={item.id}></Recipe>
                            )
                        })
                    }
                </div>
                : <div className={classes.empty}>Список пуст</div>
            }
        </div>
    )
}

export default RecipeList
