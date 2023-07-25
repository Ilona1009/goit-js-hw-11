import axios from "axios";

export default class ApiPhotoService {
    constructor() {
        this.URL = 'https://pixabay.com/api/';
        this.KEY = '38402918-c2c574f4e6229d1d2da3cdead';
        this.PAGE = 1;
        this.PER_PAGE = 40;
        this.searchQuery = '';
    }
}

async function fetchPhoto() {
    
    const searchParams = new URLSearchParams({
        key: this.KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.PAGE,
        per_page: this.PER_PAGE,
    });

    const url = `${this.URl}?${searchParams}`;

    try {
        const response = await axios.get(url); 
        if (!response.ok) {
            console.log(response.data);
            throw new Error(response.statusText)
        }
        return response.data;
    } 
    catch (error){
    };
}




