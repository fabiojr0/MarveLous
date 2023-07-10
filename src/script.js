const navHref = document.querySelectorAll('nav a[href^="#"]');

navHref.forEach(item => {
  item.addEventListener('click', () => {
    event.preventDefault();
    const element = event.target;
    const id = element.getAttribute('href');
    var section
    if (id == '#') section = 0;
    else section = document.querySelector(id).offsetTop;

    window.scroll({
      top: section,
      behavior: "smooth",
    });
  });
})

const sections = document.querySelectorAll('section')
const sectionsList = []
sections.forEach((section) => {
    sectionsList.push({id: section.getAttribute('id'), top: section.offsetTop, bottom: section.offsetTop + section.clientHeight})
})
window.addEventListener('scroll', calculatePosition)
function calculatePosition() {
    const navHeight = 24;
    const scrollTop = parseInt(window.scrollY) + navHeight;
    var clientSection = "home"
    sectionsList.forEach((section) => {
        if (scrollTop > section.top && scrollTop < section.bottom) {
            clientSection = section.id     
        }
    })
    changeNavColors(clientSection)

}
calculatePosition()
function changeNavColors(section) {
    navHref.forEach((item) => {
        item.classList.remove('text-black')
        if (item.innerHTML == section) {
          item.classList.add('text-black')
        }  
      })
}

const publicKey = '7cdfa132ced8da8fd7050cfcbf67a53d';
const privateKey = 'e932dfac5d7c5cd277b27598acfcc9ae89fab673';
const timestamp = new Date().getTime().toString();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();


function searchItems(param="spider-man",type="characters",searchType="nameStartsWith") {
    const limit = 10;
    const searchParam = `${searchType}=${param}&`
    const url = `https://gateway.marvel.com/v1/public/${type}?${searchParam}ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const cards = document.querySelectorAll(`.card-${type}`)
        cards.forEach((card) => card.classList.remove('hidden'))
        if (data.data.results.length < limit) {
            for (let i = data.data.results.length; i < limit; i++) {
                cards[i].classList.add('hidden')
            }   
        }
        for (let i = 0; i < data.data.results.length; i++) {     
            if (`${data.data.results[i].thumbnail.path}.jpg` == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                if (type == "characters") {
                    cards[i].querySelector('img').src = `src/images/notFound.png`
                } else {
                    cards[i].querySelector('img').src = `src/images/notFoundTitle.png`
                }
            }else {
                cards[i].querySelector('img').src = data.data.results[i].thumbnail.path + `.jpg`
            }

            if (type == "characters") {
                cards[i].querySelector('h1').innerHTML = data.data.results[i].name
                cards[i].href = `characters.html?id=${data.data.results[i].id}`
            } else {
                cards[i].querySelector('h1').innerHTML = data.data.results[i].title
                cards[i].href = `comics.html?id=${data.data.results[i].id}`
            }
        }
    })
    .catch(error => {
        console.log('Ocorreu um erro:', error);
    });
}
searchItems()
searchItems("thor","comics","titleStartsWith")


const searchClick = document.querySelectorAll('.searchClick');

searchClick.forEach((icon)=> {
    icon.addEventListener('click',function () {
        const input = icon.previousElementSibling
    
        input.classList.replace('w-0','w-full');
        input.focus()
        
        input.addEventListener('blur', function() {
            if (input.value.length == 0) {
                input.classList.replace('w-full','w-0');
            }
        })
        input.addEventListener('input', function () {
            if (input.getAttribute('id') == 'characters') {
                searchItems(this.value,'characters','nameStartsWith')
            } else if (input.getAttribute('id') == 'comics'){
                searchItems(this.value,'comics','titleStartsWith')
            }
        })    
    })
})

