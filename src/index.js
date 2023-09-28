import { onSearch } from './onSearch';
import { moreSearch } from './moreSearch';
import { renderMarkupPhotos } from './renderMarkupPhotos';


export const refs = {
    searchForm: document.getElementById('search-form'),
    allPhotos : document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.moreBtn.addEventListener('click', moreSearch);
// document.addEventListener('scroll', lightScroll)

renderMarkupPhotos();
// function lightScroll() {
//   const { height: cardHeight } = document.querySelector(".gallery")
//     .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
// }

