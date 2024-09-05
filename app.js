
const container=document.querySelector(".container");
const image =document.querySelector("#music-image");
const title =document.querySelector("#music-details .title");
const singer =document.querySelector("#music-details .singer");
const prev =document.querySelector("#controls #prev");
const play =document.querySelector("#controls #play");
const next =document.querySelector("#controls #next");
const duration =document.querySelector("#duration");
const currentTime =document.querySelector("#current-time");
const progressBar =document.querySelector("#progress-bar");
const volumeBar =document.querySelector("#volume-bar");
const volume =document.querySelector("#volume");
const ul =document.querySelector("ul");
const player= new MusicPlayer(musicList);
window.addEventListener("load",() => {
    let music=player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();

});
function displayMusic(music){
    title.innerText = music.title;
    singer.innerText = music.singer;
    image.src = "gif/" + music.img +".gif";
    audio.src = "mp3/" + music.file;
}


play.addEventListener("click",() =>{
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic():playMusic();
    const isGifPlay=container.classList.contains("playing");
    isGifPlay ? pauseGif():playGif();
})
const playGif = () => {
    image.style.animationPlayState = "running";
};

const pauseGif = () => {
    image.style.animationPlayState = "paused";
};



prev.addEventListener("click", ()=>{
    prevMusic();
   

})

function prevMusic(){
    player.previous(); 
    let music= player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

next.addEventListener("click", ()=>{
    nextMusic();
   


})
const nextMusic=()=>{
    player.next(); 
    let music= player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const pauseMusic=()=>{
    container.classList.remove("playing");
    play.querySelector("i").classList="fa-solid fa-play"
   audio.pause();
   pauseGif();
}
 const playMusic=()=>{
    container.classList.add("playing");
    play.querySelector("i").classList="fa-solid fa-pause"
    audio.play();
    playGif();
    

}

const calculateTime= (toplamSaniye)=>{
    const dakika=Math.floor(toplamSaniye/60);
    const saniye=Math.floor(toplamSaniye%60);
    const guncelleneSaniye = saniye<10?` 0${saniye}`:`${saniye}`;
    const sonuc=`${dakika}:${guncelleneSaniye}`;
    return sonuc;
}
audio.addEventListener("loadedmetadata",() =>{
    duration.textContent=calculateTime(audio.duration); 
    progressBar.max=Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", ()=>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent=calculateTime(progressBar.value);
    const kalanSure=Math.floor(audio.duration-audio.currentTime);
    duration.textContent=calculateTime(kalanSure);
});


progressBar.addEventListener("input", ()=>{
    currentTime.textContent=calculateTime(progressBar.value);
    audio.currentTime=progressBar.value;
});
let muteState="muted";

volumeBar.addEventListener("input",(e)=>{
    const value= e.target.value;
    audio.volume =value/100;
    if (value > 50 && value <= 100) {
        volume.classList = "fa-solid fa-volume-high";
    } else if (value > 0 && value <= 50) {
        volume.classList = "fa-solid fa-volume-low";
    } else {
        volume.classList = "fa-solid fa-volume-xmark";
    }
});
volume.addEventListener("click", ()=>{
    if(muteState==="voice"){
        audio.muted=true;
        muteState="muted";
        volume.clasList="fa-solid fa-volume-xmark"
        volumeBar.value=0;
    }else{
        audio.muted=false;
        muteState="voice";
        volume.clasList="fa-solid fa-volume-high"
        volumeBar.value=100;

    }
});


const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' class="list-group-item d-flex justify-content-between align-items-center" onclick="selectedMusic(this)">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>`;
        ul.insertAdjacentHTML("beforeend",liTag);

        let liAudioDuration= ul.querySelector(`#music-${i}`);
        let liAudioTag= ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", ()=>{
           liAudioDuration.innerText=calculateTime(liAudioTag.duration);
        });

    }
}
const selectedMusic = (li)=>{
      player.index=li.getAttribute("li-index");
      displayMusic(player.getMusic());
      playMusic();
      isPlayingNow();

}
const isPlayingNow=()=>{
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")==player.index){
            li.classList.add("playing");
        }
    }

}
audio.addEventListener("ended",()=>{
    nextMusic();
})

