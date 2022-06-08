(function() {
    if(window['video-patch']) return;
    window['video-patch'] = true;
    /**
     * 
     * @param {HTMLElement} video
     * @returns {boolean}
     */
    function isVisible(video){
        let item = video;
        while(item.tagName !== "svg") {
            item = item.parentElement;
        }
        return item.classList.contains("bespoke-marp-active");
    }
    let generation = 0; 
    document.body.addEventListener("keydown", e => {
        if(e.key === "ArrowRight" || e.key === "ArrowLeft") {
            generation += 1;
            const localGeneration = generation;
            setTimeout(() => {
                const videos = document.getElementsByTagName("video");
                if(localGeneration != generation) return;
                for(let i = 0; i< videos.length; i++) {
                    const v = videos[i];
                    if (isVisible(v)) {
                        let count = 1;
                        v.onpause = () => {
                            if(localGeneration != generation) return;
                            if( count >= 3) return;
                            setTimeout(() => {
                                if(localGeneration != generation) return;
                                v.currentTime = 0;
                                v.play();
                                count++;
                            }, 3000)
                        }
                        v.playbackRate = 1.5;
                        v.currentTime = 0;
                        v.play();
                    } else {
                        v.pause();
                    }
                }
            }, 0);
        }
    });
})();