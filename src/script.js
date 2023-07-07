const publicKey = '7cdfa132ced8da8fd7050cfcbf67a53d';
const privateKey = 'e932dfac5d7c5cd277b27598acfcc9ae89fab673';
const timestamp = new Date().getTime().toString();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

const nameStartsWith = 'spider';

const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${nameStartsWith}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
function searchCharacters() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('Ocorreu um erro:', error);
    });
}

const searchClick = document.querySelector('.searchClick');
searchClick.addEventListener('click',function () {
    const input = searchClick.previousElementSibling
    var isInputOpen = true

    input.classList.replace('w-0','w-full');
    input.focus()
    
    input.addEventListener('blur', function() {
        input.classList.replace('w-full','w-0');
    })
})

