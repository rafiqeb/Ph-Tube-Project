// console.log(500)

//   Load catagoris function
const loadCatagoris = () => {
    //    Fetch data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCatagoris(data.categories))
        .catch(err => console.log(err))
}

// Time string function
function getTime(time){
    const hour = parseInt(time / 3600);
    let second = time % 3600;
    const minute = parseInt(second / 60);
    second = second % 60;
    return `${hour} hour ${minute} minute ${second} second`
}

//  Load vedio catagoris
const loadVedio = (searchText = '') => {
    //    Fetch data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch(err => console.log(err))
}

// Load catagory videos function
const loadCatagoriVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            //  Remove active class
            removeActiveClass();
            const activBtn = document.getElementById(`${id}`)
            activBtn.classList.add('active')
            displayVideo(data.category)
        })
        .catch(err => console.log(err))
}

// Video details function
const loadDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video)
}

// Video display details
const displayDetails = (video) => {
    const detailContent = document.getElementById('modal-content')
    detailContent.innerHTML = `
    <img src="${video.thumbnail}" alt="">
    <p>${video.description}</p>
    `
    // show modal
    // document.getElementById('showModalData').click();
    document.getElementById('customModal').showModal()
}

//    Button color function
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('catagory-btn')
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}

//   Display video catarogis
const displayVideo = (videos) => {
    const vedioContainer = document.getElementById('vedio')
    vedioContainer.innerHTML = '';
    if(videos.length == 0){
        vedioContainer.classList.remove('grid')
        vedioContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center gap-5 min-h-[300px]">
            <img src="assets/Icon.png" alt="">
            <h2 class="text-xl font-bold text-center">Oops!! Sorry, There is no <br>content here</h2>
        </div>
        `;
        return
    }else{
        vedioContainer.classList.add('grid')
    }
    videos.forEach(video => {
        
        const card = document.createElement('div')
        card.classList = "card card-compact"

        // figure section
        card.innerHTML = `
    <figure class="h-[200px] relative">
        <img class="w-full h-full object-cover"
            src="${video.thumbnail}"
        alt="Shoes" />
        ${video.others.posted_date?.length == 0 ? '' : `<span class="absolute right-2 bottom-2 text-white bg-black p-1 rounded text-sm">${getTime(video.others.posted_date)}</span>`} 
    </figure>

    <div class="px-0 py-2 flex gap-2">
        <div>
            <img class= "w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt="">
        </div>
        <div>
            <h2 class="text-lg font-bold">${video.title}</h2>
            <div class= "flex items-center gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>

                ${video.authors[0].verified == true ? '<img class= "w-[20px] h-[20px]" src="assets/verify.png" alt="">' : ''}

            </div>
            <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
        </div>
    </div>
        `
        vedioContainer.append(card)
    })
}

//    Display catagoris function
const displayCatagoris = (categories) => {
    const catagorisContainer = document.getElementById('catagoris')

    categories.forEach(item => {
        //  creat eliment
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="${item.category_id}" onclick="loadCatagoriVideo(${item.category_id})" class="btn catagory-btn">${item.category}</button>
        `
        // add button navber
        catagorisContainer.append(div)
    });
}

document.getElementById('search-input').addEventListener('keyup', function(e){
    loadVedio(e.target.value)
})

loadCatagoris()
loadVedio()
