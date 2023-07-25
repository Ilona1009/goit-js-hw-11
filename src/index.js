import ApiPhotoService from './img-api';
import fetchPhoto from './img-api';

const refs = {
    searchForm: document.querySelector('.search-form'),
    bt_js: document.querySelector('.btn_js'),
}

refs.searchForm.addEventListener('submit', onSearch);
// refs.bt_js.addEventListener('click', onClick)

const apiPhotoService = new ApiPhotoService();

async function onSearch(e) {
    e.preventDefault();
    this.searchQuery = e.currentTarget.elements.searchQuery.value;
    console.log(this.searchQuery);
        
    try {
        apiPhotoService.fetchPhoto().then(data => console.log(data))

        // if (fetchResult) {
        // }
    } catch (error) {
        console.log(error);
    }
}
