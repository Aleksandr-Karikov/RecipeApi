import React, {useState, useEffect, useRef} from 'react'
import recipeI from '../../interfaces/recipe'
import RecipeList from 'components/RecipeList/RecipeList'
import classes from './Styles.module.scss'
import apiHelper from "../../utils/ApiHelper";
import {closePreloader,openPreloader} from "../../utils/preloader";
import useObserver from "../../hooks/useObserver";
import {filterI} from "../../interfaces/filters";
import Filter from "../../components/FilrtersForm/Filter";
import {debounce} from "lodash";

const Index = () => {
  const [recipes, setRecipes] = useState<recipeI[]>([]);
  const [page,setPage] = useState<number>(0);
  const [areRecipesLoading,setAreRecipesLoading] = useState(false);
  const lastBlock = useRef<HTMLDivElement>(null);
  const [filter,setFilter] = useState<filterI>({});
  const [canLoad,setCanLoad] = useState<boolean>(true);
  useObserver(lastBlock,()=>setPage(page+1),areRecipesLoading,canLoad);

  const clear = () => {
    setRecipes([]);
    setPage(0);
    setCanLoad(true)
  }

  const debouncedUpdateRecipeList = React.useRef(
      debounce(async (filter:filterI, page:number,withRefresh:boolean = false) => {
        if (withRefresh) clear();
        setAreRecipesLoading(true)
        openPreloader();
        const recipesData = await apiHelper.complexSearch(filter,page*10);
        setAreRecipesLoading(false)
        if (!recipesData.length)  setCanLoad(false)
        setRecipes([...recipes,...recipesData]);
        closePreloader();
      }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedUpdateRecipeList.cancel();
    };
  }, [debouncedUpdateRecipeList]);


  useEffect(()=>{
    debouncedUpdateRecipeList(filter,page);
  },[page])

  useEffect(()=>{
    debouncedUpdateRecipeList(filter,page,true);
  },[filter])

  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        <Filter
            onFilterChange={setFilter}
        />
        <RecipeList recipes={recipes}/>
        <div style={{height:'20px'}} ref={lastBlock}/>
      </div>
    </div>
  )
}

export default Index
