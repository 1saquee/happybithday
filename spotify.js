document.addEventListener('DOMContentLoaded', function() {
    const playIcon = document.getElementById('play-icon');
    const audio = document.getElementById('audio');
    const audioTimeDisplay = document.getElementById('audio-time');
    const progressBar = document.getElementById('progress-bar');

    playIcon.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        audioTimeDisplay.textContent = formattedTime;

        if (!isNaN(duration)) {
            progressBar.value = (currentTime / duration) * 100;
        }
    });

    progressBar.addEventListener('input', function() {
        const seekTime = (progressBar.value * audio.duration) / 100;
        audio.currentTime = seekTime;
    });

    audio.addEventListener('ended', function() {
        audioTimeDisplay.textContent = '0:00';
        progressBar.value = 0;
    });
});
