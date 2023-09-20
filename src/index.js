import ApiPhotoService from './img-api';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.getElementById('search-form'),
    allPhotos : document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.btn-js'),
    guard: document.querySelector('.guard'),
}

refs.searchForm.addEventListener('submit', onSearch);

let totalPage = 13;

const apiPhotoService = new ApiPhotoService();

const lightbox = new SimpleLightbox('.photo-link',{
    captionsDelay: 100,
}
);

function observeObj(entries) {
  console.log(entries)
}

 function onSearch(e) {
    e.preventDefault();
   apiPhotoService.query = e.currentTarget.elements.searchQuery.value;
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
     
     renderMarkupPhotos(data);
      Notify.success(`Hooray! We found ${totalHits} images.`);
    })
}


 function renderMarkupPhotos(data){
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

function clearAll(){
    refs.allPhotos.innerHTML = '';
}






