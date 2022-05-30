import React from 'react'
import {NextPage} from "next";
import recipeI from "../../../interfaces/recipe";
import apiHelper from "../../../utils/ApiHelper";

interface Props {
    recipe?: recipeI;
}

const Recipe:NextPage<Props> = ({recipe}) => {
    console.log(recipe)
    return (
        <div>{recipe?.id}</div>
    )
}

Recipe.getInitialProps = async ({ query }) => {
    const { id } = query;
    return await apiHelper.getRecipeById(id as string);
}

export default Recipe
