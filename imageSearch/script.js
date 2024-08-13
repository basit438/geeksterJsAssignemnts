
import config from "./config.js";

let input = document.querySelector("#search-box");
let searchBtn = document.querySelector("#search-btn");
let resultDiv = document.querySelector('#result-images');
let imagesToShow =6;

const getImages = async () => {
    let query = input.value;
    let resp = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: { Authorization: config.apiKey}
    });

    let data = await resp.json();
    let photos = data.photos;

    resultDiv.innerHTML = '';
    
    
    photos.slice(0, imagesToShow).forEach(photo => {
        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img');
        img.src = photo.src.medium;
        card.appendChild(img);

        let cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        let photographer = document.createElement('p');
        photographer.classList.add('photographer');
        photographer.innerText = `Clicked by ${photo.photographer}`;
        cardContent.appendChild(photographer);

        let detailBtn = document.createElement('button');
        detailBtn.innerText = 'Show Full image';
        detailBtn.classList.add('detailBtn');
        cardContent.appendChild(detailBtn);

     

        

        detailBtn.addEventListener('click', () => {
            window.open(photo.src.original, '_blank');
        });

        card.appendChild(cardContent);
        resultDiv.appendChild(card);
    });
    if (imagesToShow < photos.length) {
        let moreImages = document.createElement('button');
        moreImages.innerText = 'Show more images';
        moreImages.classList.add('moreImages');
        resultDiv.appendChild(moreImages);

        moreImages.addEventListener('click', () => {
            imagesToShow += 6;
            getImages();
        });
    }
}

searchBtn.addEventListener('click', getImages);
