
window.onload = () => {

    let audioSource = document.querySelector('#audioSource');
    let playBtn = document.querySelector('#playBtn');
    let durationField =  document.querySelector('.total');
    let currentField =  document.querySelector('.current');
    let volume =  document.querySelector('.volume');

    let progress = document.querySelector('.progress');

    // console.dir(audioSource);
    let musicPlaying = null;


    volume.addEventListener('click', setVolume)

    function setVolume () {

        audioSource.volume = volume.value/100

    }



    setVolume()







    const getTime = time => {
        let hour = Math.floor(time / ( 60 * 60))
        time = time % (60 * 60 );
        let minute = Math.floor(time / 60);
        let sec = Math.ceil(time % 60);

        return `${hour ? hour + ':' : ''}${minute}:${sec}`;
    }

    progress.max = audioSource.duration

    const updateLiner = (src) => {
        let current = src.currentTime;
        let total = src.duration;
        // let width = Math.round(current / total * 100);
        progress.value= current


    }

    const updateTimer = (src) => {
        durationField.innerHTML = getTime(src.duration);
        currentField.innerHTML = getTime(src.currentTime);
    }


    setInterval( () => {
        updateLiner(audioSource);
    },2000)
    

    const playMusic = () => {
        if(audioSource.paused){

            audioSource.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>'
            musicPlaying  = setInterval( () => {
                // console.dir(audioSource);
                // updateLiner(audioSource);
                updateTimer(audioSource);
            }, 1000)
           
        }else{
            audioSource.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            clearInterval(musicPlaying);
            musicPlaying = null;
            
        }
    }

    progress.addEventListener('click', touch)


    function touch (e){

         audioSource.currentTime = progress.value;



    }

    // function touch (e){
    //     console.log(e.offsetX)
    // }

    durationField.innerHTML = getTime(audioSource.duration);
    // liner.style.width = "0";
    
    playBtn.addEventListener('click' , playMusic)
    
    // audioSource.addEventListener('playing', e => {
    //     console.log(e);
    // })

    window.addEventListener('keypress', e => {

        if(e.key === ' '){
            playBtn.click();
        }
    })

    
}




