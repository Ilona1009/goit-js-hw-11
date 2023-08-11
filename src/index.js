import ApiPhotoService from './img-api';

const refs = {
    searchForm: document.getElementById('search-form'),
    allPhotos : document.querySelector('.gallery'),
    // bt_js: document.querySelector('.btn_js'),
}

refs.searchForm.addEventListener('submit', onSearch);
// refs.bt_js.addEventListener('click', onClick)

let totalPage = 13;

const apiPhotoService = new ApiPhotoService();


 function onSearch(e) {
    e.preventDefault();
    apiPhotoService.query = e.currentTarget.elements.searchQuery.value;

    apiPhotoService.resetPage();
    apiPhotoService.fetchPhoto().then(data => {
        console.log(data);
        //  const {hits, totalHits} = data;
             renderMarkupPhotos(data);

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
    //  console.log(markup);
      refs.allPhotos.insertAdjacentHTML('beforeend',markup);
}





