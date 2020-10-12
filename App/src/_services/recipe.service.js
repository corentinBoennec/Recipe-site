import config from 'config';
import { authHeader } from '../_helpers';
import { recipe } from '../../../API/models';
import axios from 'axios';

export const recipeService = {
    update,
    create,
    getAllIngredient,
    getAll,
    uploadImg,
    getRandom,
    getByName
};


function update(recipeParams) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeParams)
    };

    return fetch(`${config.apiUrl}/recipes/${recipeParams.name}`, requestOptions).then(handleResponse);;
}

function create(recipe) {

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    };

    console.log("request options : ", requestOptions);

    return fetch(`${config.apiUrl}/recipes/create`, requestOptions).then(handleResponse);;
}


function getAllIngredient(){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    console.log("getALl ingredient recipe service");
    return fetch(`${config.apiUrl}/ingredients`, requestOptions).then(handleResponse);
}

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/recipes`, requestOptions).then(handleResponse);    
}

function getByName(name){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/recipes/searchName/${name}`, requestOptions).then(handleResponse);    
}

function getRandom(){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/recipes/searchRandom`, requestOptions).then(handleResponse);    
}



function uploadImg(data){
    try {
        const promesse = new Promise((resolve, reject) => {
            const res = axios.post(data.url, data.formData);
            resolve(res);
        });

        promesse.then((res) => {
            return res.data.secure_url;
        });
    }
    catch(err) {
        console.error(err);
    }

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 404) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

