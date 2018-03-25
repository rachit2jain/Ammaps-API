import axios from 'axios';
axios.defaults.withCredentials = false;

export const populationUrl= "http://api.population.io:80/1.0/population/";
export function populationFinder(name){
    return axios.get(populationUrl + name + "/today-and-tomorrow");
    
}

