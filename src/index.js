import ApiPhotoService from './img-api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.getElementById('search-form'),
    allPhotos : document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),
}

const lightbox = new SimpleLightbox('.photo-link',{
    captionsDelay: 100,
}
);

refs.searchForm.addEventListener('submit', onSearch);
refs.moreBtn.addEventListener('click', moreSearch);
// document.addEventListener('scroll', lightScroll)

const apiPhotoService = new ApiPhotoService();

function onSearch(e) {
  e.preventDefault();
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


function moreSearch(e) {
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


function clearAll(){
    refs.allPhotos.innerHTML = '';
}


function renderMarkupPhotos(data) {
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



// function lightScroll() {
//   const { height: cardHeight } = document.querySelector(".gallery")
//     .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
// }

