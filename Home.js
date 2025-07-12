const mdiv=document.getElementById('container')
const moviename=document.getElementById("movieName");
const button=document.getElementById("btn");
button.addEventListener("click",fetchData);
moviename.addEventListener("input",fetchData)
const latestbtn=document.getElementById('latest')
latestbtn.addEventListener("click",fetchLatestMovies)
const latestSeriesbtn=document.getElementById('seriesbtn')
latestSeriesbtn.addEventListener("click",fetchLatestSeries)
const trendingbtn=document.getElementById('trendingAll')
trendingbtn.addEventListener("click",fetchLatestTrending)

function fetchData(){
    const url=`https://api.themoviedb.org/3/search/multi?adult=true&query=${moviename.value}&page=1&api_key=c5a20c861acf7bb8d9e987dcc7f1b558`
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{  console.clear()
   displayData(data)
})
    .catch(error=>console.log(error))
}
function fetchLatestMovies(){
    mdiv.textContent=" ";
    const url=`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=c5a20c861acf7bb8d9e987dcc7f1b558`
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{console.clear()
   displayData(data)
})
    .catch(error=>console.log(error))
};
function fetchLatestTrending(){
    mdiv.textContent=" "
    const url=`https://api.themoviedb.org/3/trending/all/day?api_key=c5a20c861acf7bb8d9e987dcc7f1b558&page=1`
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{//console.clear()
   displayData(data)
})
    .catch(error=>console.log(error))
};
function fetchLatestSeries(){
     mdiv.textContent=" "
    const url=`https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=c5a20c861acf7bb8d9e987dcc7f1b558`
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{ console.clear()
   displayData(data)
})
    .catch(error=>console.log(error))
};
setTimeout(()=>{
fetchLatestTrending();
},1)

// function displayTvData(data){
//     mdiv.textContent=" ";
//     data.results.forEach(m => {
//         const div=document.createElement('div')
//         div.classList.add("moviediv")
//            const h1=document.createElement("h2");
//            const p=document.createElement("p");
//         const movieImage=document.createElement("img");
//          console.log(m.id,m.name,m.original_name,m.first_air_date)
//        h1.textContent=m.name;
//        p.textContent=m.first_air_date;
//        movieImage.src= `https://image.tmdb.org/t/p/w780${m.poster_path}`
//    div.addEventListener("click",(e)=>{
//     changeImage(e,m.id)
//    })
//     // movieImage.style.width="100vw"
//     //  movieImage.style.width="280px"
//     div.append(movieImage,h1,p);
//     mdiv.append(div)
//     }); 
// }
function displayData(data){
    mdiv.textContent=" ";
    const pagediv=document.createElement('div');
     pagediv.classList.add('pagediv')

    data.results.forEach(m => {
      const div =document.createElement('div')
        div.classList.add("moviediv")
           const h1=document.createElement("h2");
           const p=document.createElement("p");
        const movieImage=document.createElement("img");
         if(m.first_air_date){
            console.log(m.id,m.adult,m.name,m.first_air_date)
               
         movieImage.src= `https://image.tmdb.org/t/p/w780${m.poster_path}`
         movieImage.alt="loading"
       h1.textContent=m.name;
       p.textContent=m.first_air_date;
         movieImage.addEventListener("mousemove",(e)=>{changeImageTv(e,m.id)})
         div.addEventListener('click',(e)=>{changeImagesTv(e,m.id)})
   div.append(movieImage,h1,p);
      
     mdiv.append(div)
   
         }else if(m.title){
        console.log(m.id,m.adult,m.original_title,m.release_date)
         movieImage.src= `https://image.tmdb.org/t/p/w780${m.poster_path}`
         movieImage.alt="loading"
         h1.textContent=m.title;
       p.textContent=m.release_date;
         movieImage.addEventListener("mousemove",(e)=>{changeImage(e,m.id) })
         div.addEventListener('click',(e)=>{changeImagesMovie(e,m.id)})
   div.append(movieImage,h1,p);
     
     mdiv.append(div)
         }
     
    }); 
    mdiv.append(pagediv)
   
     
}
function changeImagesMovie(e,id){
  mdiv.textContent=""
  const videodiv=document.createElement('div')
  videodiv.classList.add('videodiv')
  
 const url=`https://api.themoviedb.org/3/movie/${id}/images?api_key=c5a20c861acf7bb8d9e987dcc7f1b558`
  fetch(url)
    .then((res)=>res.json())
    .then(data=>{ 
     
      data.posters.forEach((poster)=>{
        const div=document.createElement('div')
        div.classList.add("imagediv")
          const movieImage=document.createElement("img");
          const imagePath=  poster.file_path;
        movieImage.src= `https://image.tmdb.org/t/p/w780${imagePath}`
         div.append(movieImage);
         mdiv.append(div);
         mdiv.appendChild(videodiv)
      }
   ).catch(error=>console.log(error))
    }
  
  )
  

}
function changeImagesTv(e,id){
  mdiv.textContent=""
    const videodiv=document.createElement('div')
  videodiv.classList.add('videodiv')
 const url=`https://api.themoviedb.org/3/tv/${id}/images?api_key=c5a20c861acf7bb8d9e987dcc7f1b558`
  fetch(url)
    .then((res)=>res.json())
    .then(data=>{ 
      data.backdrops.forEach((poster)=>{
        const div=document.createElement('div')
        div.classList.add("imagediv")
          const movieImage=document.createElement("img");
          const imagePath=  poster.file_path;
        movieImage.src= `https://image.tmdb.org/t/p/w780${imagePath}`
         div.append(movieImage);
         mdiv.append(div)
          mdiv.append(videodiv)
      }).catch(error=>console.log(error))
    }
  
  )
 
}
let i=0
function changeImage(e,id){
       const url=`https://api.themoviedb.org/3/movie/${id}/images?api_key=c5a20c861acf7bb8d9e987dcc7f1b558`
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{ 
    
        let len= data.posters.length;
        if(i==len){
        i=0;
        }

        console.log(i)

          let poster=data.posters[i]
   const imagePath=  poster.file_path;
         console.log(e)
         e.target.src=`https://image.tmdb.org/t/p/w780${imagePath}`
          i++;
          })

  
    .catch(error=>console.log(error))
}


let j=0
function changeImageTv(e,id){
       const url=`https://api.themoviedb.org/3/tv/${id}/images?api_key=c5a20c861acf7bb8d9e987dcc7f1b558`
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{ 
    
        let len= data.backdrops.length;
        if(j==len){
        j=0;
        }

        console.log("len",len)

          let poster=data.backdrops[i]
   const imagePath=  poster.file_path;
         console.log(imagePath)
         e.target.src=`https://image.tmdb.org/t/p/w780${imagePath}`
  
          j++;
          })

  
    .catch(error=>console.log(error))
}
function clear(){
    clearInterval(inid)
}


async function fetchGenreMap(id) {
  const url = `https://api.themoviedb.org/3/movie/1061474?append_to_response=videos&api_key=c5a20c861acf7bb8d9e987dcc7f1b558`;
  //https://api.themoviedb.org/3/movie/506?append_to_response=videos&api_key=c5a20c861acf7bb8d9e987dcc7f1b558//for videos

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.videos.results)
   for(U of data.videos.results){
    console.log(U.name,U.type,U.official,U.key)
   }
   
  } catch (error) {
    console.log('Error fetching genre map:', error);
  }
}
fetchGenreMap();
// let id=550  //start with 550

// const inid=setTimeout(()=>{
//      mdiv.textContent=" ";
//  fetchGenreMap(id)
   
//     if(id==751100){
//     clear()
//     }
//      id++;
   
// },1000)




//https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=c5a20c861acf7bb8d9e987dcc7f1b558  for latest trending movie
//https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=c5a20c861acf7bb8d9e987dcc7f1b558  for all movie/series trending 

//https://api.themoviedb.org/3/movie/1195518/images?api_key=c5a20c861acf7bb8d9e987dcc7f1b558    for all images
//https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
// //https://api.themoviedb.org/3/search/multi?adult=true&query=${moviename.value}&api_key=c5a20c861acf7bb8d9e987dcc7f1b558