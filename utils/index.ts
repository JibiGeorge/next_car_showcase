// const axios = require('axios');

import { CardProps, FilterProps } from "@/types";

// const options = {
//   method: 'GET',
//   url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
//   params: {model: 'corolla'},
//   headers: {
//     'X-RapidAPI-Key': '5cb21b8056msh82d056f40c4cccep1cf9a0jsnb35390be84b2',
//     'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

export const fetchCars = async (filters: FilterProps)=>{
    const {manufacturer, year, model, limit, fuel} = filters;
    const headers = {
        'X-RapidAPI-Key': '5cb21b8056msh82d056f40c4cccep1cf9a0jsnb35390be84b2',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
        headers: headers
    })

    const result = await response.json();
    return result
}

export const calculateCarRent = (city_mpg: number, year: number)=>{
    const basePricePerDay = 50;
    const milegeFactor = 0.1;
    const ageFactor = 0.05;

    const mileageRate = city_mpg * milegeFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export const generateCarImage = (car: CardProps, angle?: string)=>{
    const url = new URL("https://cdn.imagin.studio/getimage");

    const {make, year, model} = car;

    url.searchParams.append('customer','copyright-imaginstudio');
    url.searchParams.append('make',make);
    url.searchParams.append('modelFamily',model.split(' ')[0]);
    url.searchParams.append('zoomType','fullscreen');
    url.searchParams.append('modelYear',`${year}`);
    url.searchParams.append('angle',`${angle}`);

    return `${url}`
}