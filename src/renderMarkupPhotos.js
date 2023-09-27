import ApiPhotoService from './img-api';
import { refs } from "./index";

const apiPhotoService = new ApiPhotoService();

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


export function renderMarkupPhotos(data) {
    let markup = data.hits.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads})=>
        `<a class="photo-link" href=${largeImageURL}>
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" width = '300px' />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
          ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
          ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
          ${downloads}
          </p>
        </div>
        </a>
        `).join('')
   refs.allPhotos.insertAdjacentHTML('beforeend', markup);
   lightbox.refresh();
}

const lightbox = new SimpleLightbox('.photo-link',{
    captionsDelay: 100,
}
);
