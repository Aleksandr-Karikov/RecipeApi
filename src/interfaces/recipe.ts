export default interface recipeI {
    id: number;
    title: string;
    image: string;
    carbs: string;
    fat:string;
    protein:string;
    calories: number;
    readyInMinutes:number;
    sourceName:string;
    aggregateLikes:number;
    vegetarian:boolean;
    veryPopular:boolean;
    extendedIngredients:ingredientI[]
}
interface ingredientI {
    amount: number,
    consitency: string,
    id: number,
    image: string,
    measures: {
        metric: {
            amount: number,
            unitLong: string
            unitShort: string
        },
        us: {
            amount: number,
            unitLon: string,
            unitShort: string
        }
    },
    meta: [],
    name: string,
    original: string,
    originalName: string,
    unit: string
}
