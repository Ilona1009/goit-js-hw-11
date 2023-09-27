import ApiPhotoService from './img-api';
import { renderMarkupPhotos } from './renderMarkupPhotos';
import { refs } from "./index";
import Notiflix from 'notiflix';


const apiPhotoService = new ApiPhotoService();

export function moreSearch(e) {
  e.preventDefault();
  apiPhotoService.incrementPage();
  apiPhotoService.fetchPhoto().then(data => {
    const { totalHits } = data;
    renderMarkupPhotos(data);
      if(totalHits<=apiPhotoService.PER_PAGE*apiPhotoService.PAGE ){
      refs.moreBtn.classList.add('is-hidden');
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        return;
      }
    }
  )
}

