const apiKey = '96853ea0d7df8a1c3409df9bb233fd0f';
const baseUrl = 'https://api.themoviedb.org/3/'
const imgUrl = 'https://image.tmdb.org/t/p/w500/'
const box  = document.querySelector('.box')
const fragment = document.createDocumentFragment();
const exit = document.querySelector('.exit')

const loader_container = document.querySelector('.loader_container');
const loader = document.createElement('div');
loader.classList.add('loader');
loader_container.appendChild(loader);
const div = document.createElement('div');


let currentPage = 1;
const paginaton = document.querySelector('.paginaton')

async function myFunction() {
    const input = document.querySelector('.input').value


    let url

    if(input){
        url = `${baseUrl}search/movie?api_key=${apiKey}&query=${input}&page=${currentPage}`
    }else{
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`;
    }



    try{

        const response = await fetch(url);
        const movie = await response.json();


        let totalPage = movie.total_pages > 5 ? 5 : movie.total_pages;



        box.innerHTML = ''

        if(movie.results.length === 0) {

            const text = document.createElement('h1')
            text.textContent = "Bunday film mavjud emas"
            box.appendChild(text)
            paginaton.classList.add('pagination-none')
        }
        else{
            const data = movie.results.map((data) => {

                const {backdrop_path,title,release_date} = data
                console.log(data);
                const div = document.createElement('div');
                div.classList.add('div')
                console.log(data);
    
                const img = document.createElement('img');
                img.src = `${imgUrl}${backdrop_path}`
                img.alt = title;
    
                const h2 = document.createElement('h2');
                h2.innerHTML = title;
    
                const span = document.createElement('span');
                span.innerHTML = release_date
    
                fragment.appendChild(img)
                fragment.appendChild(h2)
                fragment.appendChild(span)
                div.appendChild(fragment)
                box.appendChild(div)
            })

            paginaton.innerHTML = ''

            if(totalPage > 1){
                for(let i = 1; i <= totalPage; i++){
                    const btn2 = document.createElement('button')
                    btn2.innerText = i;

                    if(currentPage === i){
                        btn2.classList.add('btn-success');
                    }


                    btn2.addEventListener('click',() => {
                        currentPage = i;
                        myFunction()
                    })

                    paginaton.appendChild(btn2)
                }

            }
        }


                        
    }catch(err){
        console.error(err)
    }finally{
        const loader = document.querySelector('.loader')

        if(loader){
            loader_container.remove()
        }
    }
}

const input = document.querySelector('.input')
const btn = document.querySelector('.btn')


btn.addEventListener("click",(e) => {
    currentPage = 1
    e.preventDefault();
    myFunction()
})
myFunction()


// setTimeout(() => {
//     myFunction()
// }, 3000);


function darkNote() {
    const body = document.body
    const wasdarkNote = localStorage.getItem('darkmode') === 'true'
    localStorage.setItem('darkmode', !wasdarkNote)
    body.classList.toggle('dark-mode', !wasdarkNote)
}
 const button =  document.querySelector('.button')

 button.addEventListener('click', () => {
    const input  = document.querySelector('.input')
    input.classList.toggle('input-white')
    darkNote()
 })
exit.addEventListener('click', () => {
    input.value = '';
    myFunction()
})




 function onload(){
    document.body.classList.toggle('dark-mode',localStorage.getItem('darkmode') === 'true' )
 }
 document.addEventListener('DOMContentLoaded', onload)