(function($,root) {
    // 加载图片 背景图片模糊
    function renderImg(data) {
        var img = new Image();
        img.src = data.image;
        img.onload = function() {
            $('.wrapper .bg').css({
                backgroundImage: `url(${data.image})`,
            })
            $('.song-img img').attr('src',data.image);
        }
    }
    // 渲染音乐信息
    function renderInfo (data) {
        var str = `            
            <div class="song-name">${data.song}</div>
            <div class="singer-name">${data.singer}</div>
            <div class="album-name">${data.album}</div>`;
        $('.song-info').html(str);
    }
    // 渲染是否加喜欢
    function renderIslike(islike) {
        if(islike){
            $('.btn-like').removeClass('btn-normal');
        }else{
            $('.btn-like').addClass('btn-normal');
        }
    }
    // 整个页面渲染；
    function renderPage(data) {
        renderImg(data);
        renderInfo(data);
        renderIslike(data.isLike);
    }
    root.renderPage = renderPage;
})(window.Zepto,window.player || (window.player = {}));