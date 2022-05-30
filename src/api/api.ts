import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { NextPageContext } from 'next';

const defaults = {
    baseURL: `https://api.spoonacular.com`,
    error: {
        code: 'INTERNAL_ERROR',
        message: 'Что-то пошло не так, проверьте соединение с интерентом',
        status: 503,
        data: {},
    },
};

export interface ApiI {
    method: Method,
    url: string,
    variables?: any,
    ctx?: NextPageContext
}

const api = <T extends ApiI>(params: T) => new Promise<any>((resolve, reject) => {
    const {
        method,
        url,
        variables,
        ctx,
    } = params;
    variables['apiKey'] = '9291a4c129d14a66bad3452fa2ae5066';

    axios({
        url: `${defaults.baseURL}${url}`,
        method,
        params: method === 'get' ? variables : undefined,
        responseType: 'json'
    }).then(
        (response: AxiosResponse) => {
            resolve(response.data);
        },
    )
        .catch(
            (error: AxiosError) => {
                console.log(error.response);
            },
        );
});

export default {
    get: (args: Omit<ApiI, 'method'>) => api({ method: 'get', ...args }),
};
