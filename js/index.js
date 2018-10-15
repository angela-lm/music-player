var $ = window.Zepto;
var root = window.player;
var index = 0; // 歌曲索引值
var songList; // 歌曲列表
var controlManage; // 控制切换；
var audio;
var timer;
var songId;
var songIdDel;
function bindTouch() {
    var width = $('.pro-bottom').offset().width;
    var pointLeft = $('.pro-point').offset().left + $('.pro-point').offset().width / 2;
    var playing = false;
    $('body').on('touchstart','.pro-point',function () {
        if(audio.status == 'play'){
            audio.pause();
            playing = true;
        }
    }).on('touchmove','.pro-point',function (e) {
        var event = e || window.event;
        var cX = event.touches[0].clientX;
        root.process.adjustTime((cX - pointLeft) / width ,songList[index].duration,audio);
    }).on('touchend','.pro-point',function() {
        if(playing){
            audio.play();
            root.process.renderCurPro(audio);
        }
    })
}
// 判断歌曲是否进行切换到下一首操作： 
// 1、歌曲处于播放状态 
// 2、 歌曲已经播放完
function menuBindEvent() {
    $('body').on('click','.btn-list',function () {
        root.menu.initMenu(songList,songList[index].songId);
        $('body').on('click','.menu-bg',function () {
            $('.menu-wrapper').animate({translateY:'100%'},'fast');
            $(this).css('display','none');
        })
    });
    $('.menu-wrapper').on('click','.close-menu',function () {
        $('.menu-wrapper').animate({translateY:'100%'},'fast');
        $('.menu-bg').css('display','none');
    })
    // 点击列表切换歌曲
    $('body').on('click','.song-item',function(e) {
        var event = e || window.event;
        e.preventDefault(); 
        event.stopPropagation();
        songId = $(this).attr('index');
        $(songList).each(function (i) {
            if(this.songId == songId){
                root.menu.chosenItem(songId);
                root.renderPage(songList[i]);
                index = i;
                $('body').trigger('play:change');
            }
        })
    })
    // $('body').on('touchend','.list-song-delete',function(e) {
    //     var event = e || window.event;
    //     e.preventDefault(); 
    //     event.stopPropagation();
    //     songIdDel = $(this).parent().attr('index');
    //     if(songIdDel == songId){
    //         index = audio.controlManage.next();
    //         $(songList).each(function (i) {
    //             if(i == index){
    //                 root.menu.chosenItem(this.songId);
    //                 root.renderPage(songList[index]);
    //                 $('body').trigger('play:change');
    //                 songId = index;
    //             }
    //         })
    //     }

        // root.menu.chosenItem(index);
        // root.renderPage(songList[index]);
        // $('body').trigger('play:change');
    // })
}
function bindEvent() {
    // 通过trigger 触发；
    $('body').on('play:change',function () {
        // 加载歌曲；
        audio.getAudio(songList[index].audio);
        // 渲染歌曲总时长；
        root.process.AllTime(songList[index].duration);
        // 暂停状态，初始化进度条及播放时长； 播放状态：改变已播放时长及进度条；
         root.process.renderCurPro(audio);
        // 如果歌曲是播放状态;
        if(audio.status === 'play'){
            audio.play();
        }
    })
    $('body').on('click','.btn-like',function () {
        $('.btn-like').toggleClass('btn-normal');
        //  此处需要有 数据id 值， 是否喜欢的状态；
        //  向后台发送数据；
        getData('../mock/data.json',function () {
        })
    })
    $('body').on('click','.btn-front',function () {
        // 获取上一首歌的索引值；
        index = controlManage.prev();
        // 对页面进行渲染；
        root.renderPage(songList[index]);
        // 加载audio，渲染总时长，如果当前状态为播放状态，则对进度条进行渲染；
        $('body').trigger('play:change');
    });
    // 下一首
    $('body').on('click','.btn-next',function () {
        index = controlManage.next();
        root.renderPage(songList[index]);
        $('body').trigger('play:change');
    }) 
    $('body').on('click','.btn-play',function () {
        // 歌曲为暂停状态变为播放状态，进度条同步变化；
        if(audio.status == 'pause'){
            audio.play();
            // 进度条变化，播放时长变化； 参数为控制audio的对象；
             root.process.renderCurPro(audio);
        }else{
            // 歌曲由播放状态变为暂停状态，进度条不变；
            audio.pause();
        }
        // 按钮状态切换；
        $(this).toggleClass('pause');
    })
}
function autoChange() {
    requestAnimationFrame(function () {
        if(audio.end()){
            // console.log(audio.end);
            index = controlManage.next();
            // 对页面进行渲染；
            root.renderPage(songList[index]);
            // 加载audio，渲染总时长，如果当前状态为播放状态，则对进度条进行渲染；
            $('body').trigger('play:change');
        }
        autoChange();
    })
}
// 获取后台数据 // fake data
function getData(url,callback) {
    $.ajax({
        type: 'GET',
        url: url,
        success(data) {
            callback(data);
        },
        error() {
            console.log('error');
        }
    })
}
function init(data) {
    songList = data; // 将数据挂载到外部方便取用；
    root.renderPage(data[0]); // 初始化页面；
    controlManage = new root.ControlManage(data.length); // 构造控制歌曲切换对象；
    audio = new root.AudioControl(); // 构造控制歌曲播放对象；
    $('body').trigger('play:change'); // 获取数据后立刻开始加载audio文件；
    autoChange();
}
bindEvent();
bindTouch();
menuBindEvent();
getData('../mock/data.json',init);