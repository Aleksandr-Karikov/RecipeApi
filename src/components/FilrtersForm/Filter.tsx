import React, {FC, useEffect, useState} from 'react';
import classes from "../../pages/recipes/Styles.module.scss";
import SearchInput from "../UI/SearchInput/SearchInput";
import Input from "../UI/Input/Input";
import {filterI} from "../../interfaces/filters";
import apiHelper from "../../utils/ApiHelper";
import recipeI from "../../interfaces/recipe";
import {ingredientI} from "../../interfaces/ingredirnt";

interface FilterComponentI {
    onFilterChange:(filter:filterI)=>void;
    refresh:()=>void
}

const Filter:FC<FilterComponentI> = (props) => {
    const {onFilterChange,refresh} = props;
    const [filter,setFilter] = useState<filterI>({});
    const [searchByRecipe,setSearchByRecipe] = useState<recipeI[]>([]);
    const [searchByIngredients,setSearchByIngredients] = useState<ingredientI[]>([]);

    useEffect(()=>{
        refresh();
        onFilterChange(filter);
    },[filter])

    const setQuery = (value:string) => {
        setFilter({...filter,query:value});
    }
    const setIngredients = (value:string) => {
        setFilter({...filter,includeIngredients:value});
    }

    const setMinCalories = (value:number) => {
        setFilter({...filter,minCalories:value});
    }

    const setMaxCalories = (value:number) => {
        setFilter({...filter,maxCalories:value});
    }

    const updateSearchByIngredients = async (value:string) => {
        const variants = await apiHelper.ingredientsAutocomplete(value);
        setSearchByIngredients(variants)
    }
    const updateSearchRecipes = async (value:string) => {
        const variants = await apiHelper.autocomplete(value);
        setSearchByRecipe(variants)
    }
    return (
    <form onSubmit={async (e) => {
        e.preventDefault();
    }}>
        <div className={classes.search}>
            <SearchInput
                placeholder={'Найти рецепт'}
                variants={searchByRecipe}
                onInputChange={e => updateSearchRecipes(e.target.value)}
                onActiveChange={(active) => {
                    setQuery(active);
                }}
            />
            <SearchInput
                placeholder={'Найти по ингридиенту'}
                variants={searchByIngredients.map((item) => {
                    return {id: item.id, title: item.name}
                })}
                onInputChange={e => updateSearchByIngredients(e.target.value)}
                onActiveChange={(active) => {
                    setIngredients(active)
                }}
            />
        </div>
        <div className={classes.calories}>
            <Input type={'number'}
                   step={10}
                   min={0}
                   placeholder={'Миинимально калорий'}
                   onChange={(e) => setMinCalories(e.target.value)}
            />
            <Input type={'number'}
                   step={10}
                   min={0}
                   placeholder={'Максимально калорий'}
                   onChange={(e) => setMaxCalories(e.target.value)}
            />
        </div>
    </form>
)}
export default Filter;
