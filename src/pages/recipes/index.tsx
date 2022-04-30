import React, { useState, useEffect } from 'react'
import api from '../../api/api'
import recipeI from '../../interfaces/recipe'
import RecipeList from 'components/RecipeList/RecipeList'
import classes from './Styles.module.scss'
const Index = () => {
  const [recipes, setRecipes] = useState<recipeI[]>([]);
  const [ingredient, setIngredient] = useState<string>("");

  async function fetch() {
    const res = await api.get({
      url: `/findByIngredients`,
      variables: { ingredients: ingredient, number: 10 }
    });
    console.log(res);

    setRecipes(res)
  }
  useEffect(() => {
    fetch();
  }, [ingredient]);

  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        <input type="text" value={ingredient} onChange={async (e) => {
          setIngredient(e.target.value);
        }} />
        <div className={classes.recipes}>
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </div>
  )
}

export default Index