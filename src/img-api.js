import axios from "axios";

async function fetchPhoto() {
    const BASE_URl = 'https://pixabay.com/api/';
    const API_KEY = '38402918-c2c574f4e6229d1d2da3cdead';
    const CLIENT_SEARCH = 'cat';
    
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: CLIENT_SEARCH,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
    });

    const url = `${BASE_URl}?${searchParams}`;

    try {
        const response = await axios.get(url); 
        if (!response.ok) {
            console.log(response.data.hits);
            throw new Error(response.statusText)
        }
        return response.data;
    } 
    catch (error){
    };
}

fetchPhoto()


