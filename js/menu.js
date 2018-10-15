(function ($,root) {
    function renderMenu(data) {
        var str = '';
        $(data).forEach((ele,index) =>{
            str += `
            <li class="song-item" index="${ele.songId}">
                <div class="list-song-info">
                    <h1 class="list-song-name"">${ele.song}</h1>
                    <span class="list-short-line">-</span>
                    <span class="list-singer-name">${ele.singer}</span>
                </div>
            </li>`;
            // <div class="list-song-delete"></div>
        });
        $('.song-list').html(str);
    }
    function chosenItem(index) {
        $('.song-item').each(function() {
            if($(this).attr('index') == index){
                $(this).addClass('song-chosen').siblings().removeClass('song-chosen');
            }
        })
    }
    function initMenu(data,index) {
        renderMenu(data);
        $('.menu-bg').css('display','block');
        $('.menu-wrapper').show('fast');
        chosenItem(index);
    }
    root.menu = {
        initMenu,
        renderMenu,
        chosenItem
    }
})(window.Zepto,window.player || window.player == {})