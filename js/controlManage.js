(function ($,root) {
    // 底部菜单栏控制
    function ControlManage(len){
        this.index = index;
        this.len = len;
    }
    // 获取歌曲index值；
    ControlManage.prototype = {
        prev() {
            return this.getIndex(-1);
        },
        next() {
            return this.getIndex(+1);
        },
        getIndex(val) {
            var index = window.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            return curIndex;
        }
    }
    root.ControlManage = ControlManage;
})(window.Zepto, window.player ||(window.player = {}))