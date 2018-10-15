(function ($,root) {
    var allTime,
        curTime,
        percent;
    // 时间格式化
    var timer;
    function formatTime(duration) {
        var m = parseInt(duration / 60);
        var s = parseInt(duration % 60);
        m = m >= 10 ? m : '0' + m;
        s = s >= 10 ? s : '0' + s;
        return `${m}:${s}`;
    }
    // 整个歌曲时长
    function AllTime(duration){
        allTime = duration;
        $('.end-time').html(formatTime(duration));
    }
    // 歌曲当前播放时长及进度条
    function renderCurPro(audio) {
        // 当前加载的audio的现在播放时长；
        curTime = parseInt(audio.audio.currentTime);
        // 当前播放时长占总时长的百分比；
        percent = (curTime / allTime) * 100;
        // 设置定时器，刷新更改时间，以及进度条位置；
        timer = requestAnimationFrame(function() {
            // 已播放时长；
            $('.cur-time').html(formatTime(curTime));
            // 进度条位置改变；
            $('.pro-top').css({
                transform: `translateX(${-100 + percent}%)`
            });
            // 判断何时进度条不变时间不变 
            // 1、歌曲播放结束，需要切换到下一首；
            // 2、歌曲为暂停状态；
            if(curTime !== allTime && audio.status === 'play'){
                renderCurPro(audio);
            }else{
                if(curTime === allTime){
                    
                }
                stopCurPro();
            }
        })
        return curTime;
    }
    function stopCurPro() {
        cancelAnimationFrame(timer);
    }
    function adjustTime(percent,duration,audio) {
        if(percent >= 1){
            percent = 1;
        }
        $('.cur-time').html(formatTime(percent * duration));
        // 进度条位置改变；
        $('.pro-top').css({
            transform: `translateX(${-100 + percent * 100}%)`
        });
        audio.audio.currentTime = percent * duration;
    }
    root.process = {
        AllTime,
        renderCurPro,
        adjustTime
    };
})(window.Zepto,window.player);