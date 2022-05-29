import React, {useState, useEffect, useRef} from 'react'
import recipeI from '../../interfaces/recipe'
import RecipeList from 'components/RecipeList/RecipeList'
import classes from './Styles.module.scss'
import apiHelper from "../../utils/ApiHelper";
import {closePreloader,openPreloader} from "../../utils/preloader";
import useObserver from "../../hooks/useObserver";
import {filterI} from "../../interfaces/filters";
import Filter from "../../components/FilrtersForm/Filter";

const Index = () => {
  const [recipes, setRecipes] = useState<recipeI[]>([]);
  const [page,setPage] = useState<number>(0);
  const [areRecipesLoading,setAreRecipesLoading] = useState(false);
  const lastBlock = useRef<HTMLDivElement>(null);
  const [filter,setFilter] = useState<filterI>({});

  useObserver(lastBlock,()=>setPage(page+1),areRecipesLoading,!!recipes.length);

  const clear = () => {
    setRecipes([]);
    setPage(0);
  }

  const updateList = async (filter:filterI, page:number) => {
    setAreRecipesLoading(true)
    openPreloader();
    const recipesData = await apiHelper.complexSearch(filter,page*10);
    setAreRecipesLoading(false)
    setRecipes([...recipes,...recipesData]);
    closePreloader();
  }
  useEffect(()=>{
    updateList(filter,page);
  },[page,filter])

  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        <Filter
            refresh={clear}
            onFilterChange={setFilter}
        />
        <RecipeList recipes={recipes}/>
        <div style={{height:'20px'}} ref={lastBlock}/>
      </div>
    </div>
  )
}

export default Index
