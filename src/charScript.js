const publicKey = '7cdfa132ced8da8fd7050cfcbf67a53d';
const privateKey = 'e932dfac5d7c5cd277b27598acfcc9ae89fab673';
const timestamp = new Date().getTime().toString();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

fetch(url)
.then(response => response.json())
.then(data => {
    const character = data.data.results[0]
    const characters = document.querySelector('.characterPage')
    characters.querySelector('.characterImg').src = `${character.thumbnail.path}.jpg`
    characters.querySelector('.characterTitle').innerHTML = `${character.name}`
    characters.querySelector('.characterDesc').innerHTML = `${character.description.length > 1 ? `Descripition: ${character.description}` : "Description not found"}`
    if (character.comics.items.length > 0) {
        
        character.comics.items.forEach(comic => {
        const comicDiv = document.createElement('div')
        const comicUrl = comic.resourceURI.replace('http', 'https');
        fetch(`${comicUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
            .then(response => response.json())
            .then(data => {
                comicDiv.setAttribute('class','w-full h-full flex items-center justify-center')
                comicDiv.innerHTML = `<a class="h-full w-full flex items-center flex-col p-2 group cursor-pointer card-comics gap-2" href ="comics.html?id=${data.data.results[0].id}">
                                        <img src="${data.data.results[0].images[0].path}.jpg" class="h-40 w-28 object-cover group-hover:-translate-y-1 transition-all shadow-lg">
                                        <h1 class="text-base textOverflow text-zinc-400 font-medium text-center group-hover:text-black transition-colors duration-300">${data.data.results[0].title}</h1>
                                      </a>`
                characters.querySelector('.characterComics').appendChild(comicDiv)
            })
            .catch(error => {
                console.log('Ocorreu um erro:', error);
            });
        });
        
    } else {
        characters.querySelector('.characterComicsDiv').innerHTML = `<h1 class="text-4xl w-full text-center">Comics not found</h1>`
    }
})
.catch(error => {
    console.log('Ocorreu um erro:', error);
});