import ApiPhotoService from './img-api';
import { renderMarkupPhotos } from './renderMarkupPhotos';
import { refs } from "./index";
import Notiflix from 'notiflix';
import { moreSearch } from './moreSearch';

const apiPhotoService = new ApiPhotoService();

export function onSearch(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements.searchQuery.value);
  console.log(apiPhotoService.searchQuery);
   apiPhotoService.searchQuery = e.currentTarget.elements.searchQuery.value;
   clearAll();
   if (apiPhotoService.query === '') {
     clearAll();
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       return;
     }

    apiPhotoService.resetPage();
   apiPhotoService.fetchPhoto().then(data => {
     const {hits, totalHits} = data;
     if (hits.length === 0) {
       clearAll();
       Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       return;
     }
    refs.moreBtn.classList.remove('is-hidden');
     
     renderMarkupPhotos(data);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    })
}

function clearAll(){
    refs.allPhotos.innerHTML = '';
}

