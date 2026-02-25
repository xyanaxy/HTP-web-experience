class AudioPlayer {
    constructor() {
        this.audio = document.getElementById('bgMusic');
        this.init();
    }

    init() {
        const currentTime = sessionStorage.getItem('audioTime') || 0;
        this.audio.currentTime = parseFloat(currentTime);

        if (sessionStorage.getItem('isPlaying') === 'true') {
            this.audio.play();
        } else {
            this.audio.play();
            sessionStorage.setItem('isPlaying', 'true');
        }

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('audioTime', this.audio.currentTime);
            sessionStorage.setItem('isPlaying', !this.audio.paused);
        });
    }
}