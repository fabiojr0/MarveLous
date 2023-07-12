const publicKey = '7cdfa132ced8da8fd7050cfcbf67a53d';
const privateKey = 'e932dfac5d7c5cd277b27598acfcc9ae89fab673';
const timestamp = new Date().getTime().toString();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

fetch(url)
.then(response => response.json())
.then(data => {
    const comics = data.data.results[0]
    console.log(comics);
    document.title = `Marvelous - ${comics.title} Page`
    const comicsHtml = document.querySelector('.comicsPage')
    comicsHtml.querySelector('.comicsImg').src = `${comics.thumbnail.path}.jpg`
    comicsHtml.querySelector('.comicsTitle').innerHTML = `${comics.title}`
    comicsHtml.querySelector('.comicsDesc').innerHTML = `<p>Pages count: ${comics.pageCount}</p>`
})
.catch(error => {
    console.log('Ocorreu um erro:', error);
});