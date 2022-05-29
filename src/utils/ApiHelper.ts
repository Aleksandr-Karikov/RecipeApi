import api from "../api/api";
import {filterI} from "../interfaces/filters";

class apiHelper {
    static async autocomplete(search:string){
        const res = await api.get({
            url: `/autocomplete`,
            variables: { query: search, number: 10 }
        });
        return res
    }
    static async complexSearch(filter: filterI, offset = 0){
        const res = await api.get({
            url: `/complexSearch`,
            variables: { ...filter, number: 10,offset }
        });
        return res.results
    }
    static async ingredientsAutocomplete(search:string) {
        const res = await api.get({
            url: `/ingredients/autocomplete`,
            variables: { query: search, number: 10 }
        });
        return res
    }
}
export default apiHelper
