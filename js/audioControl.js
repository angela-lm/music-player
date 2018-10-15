(function ($,root) {
    // 对音频进行控制；
    function AudioControl() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioControl.prototype = {
        play() {
            this.audio.play();
            this.status = 'play';
        },
        pause() {
            this.audio.pause();
            this.status = 'pause';
        },
        end() {
            return this.audio.ended; 
        },
        getAudio(src) {
            this.audio.src = src;
            this.audio.load();
        }
    }
    root.AudioControl = AudioControl;
})(window.Zepto,window.player|| (window.player = {}))