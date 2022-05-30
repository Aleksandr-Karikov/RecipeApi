import api from "../api/api";
import {filterI} from "../interfaces/filters";

class apiHelper {
    static async autocomplete(search:string){
        const res = await api.get({
            url: `/recipes/autocomplete`,
            variables: { query: search, number: 10 }
        });
        return res
    }
    static async complexSearch(filter: filterI, offset = 0){
        const res = await api.get({
            url: `/recipes/complexSearch`,
            variables: { ...filter, number: 10,offset }
        });
        return res.results
    }
    static async ingredientsAutocomplete(search:string) {
        const res = await api.get({
            url: `/food/ingredients/autocomplete`,
            variables: { query: search, number: 10 }
        });
        return res
    }

    static async getRecipeById(id:string,includeNutrition:boolean = false) {
        const res = await api.get({
            url: `/recipes/${id}`,
            variables: { includeNutrition }
        });
        return res
    }
}
export default apiHelper
