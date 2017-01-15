var link = utils.children(document.getElementById('rightSup'), 'div')[2];
var hiddenSearch = document.getElementById('hiddenSearch');
var hiddenInput = document.getElementById('hiddenInput');
var input = document.getElementById('input');


//回到顶部加顶部隐藏
link.onclick = function () {
    this.style.display = 'none';
    window.clearInterval(link.timer);
    window.onscroll = null;
    link.timer = window.setInterval(function () {
        var curScrollTop = utils.win('scrollTop');
        if (curScrollTop <= 0) {
            window.clearInterval(link.timer);
            window.onscroll = showBtn;
            return;
        }
        curScrollTop -= 30;
        utils.win('scrollTop', curScrollTop);

        if (curScrollTop < 160) {
            hiddenSearch.style.position = 'absolute';
            hiddenSearch.style.top = '-50px';
        }
    }, 10);
};


//滚动显示顶部条加显示返回按钮
window.onscroll = showBtn;
function showBtn() {
    var scrollTop = utils.win('scrollTop');
    if (scrollTop > 160) {
        link.style.display = 'block';
        hiddenSearch.style.position = 'fixed';
        hiddenSearch.style.top = '0';
    } else {
        link.style.display = 'none';
        hiddenSearch.style.position = 'absolute';
        hiddenSearch.style.top = '-50px';
    }
}


//输入框内容匹配
input.onkeyup = function () {
    hiddenInput.value = this.value;

};
input.onfocus = function () {
    if (this.value == '找工作 找房子 找服务') {
        this.value = '';
    }
    this.className += ' input_color';
    hiddenInput.className += ' input_color';
};
input.onblur = function () {
    if (!this.value) {
        this.value = '找工作 找房子 找服务';
        this.className = 'input';
        hiddenInput.className = 'hiddenInput';
    }
    hiddenInput.value = this.value;
};
hiddenInput.onkeyup = function () {
    input.value = this.value;
};
hiddenInput.onfocus = function () {
    if (this.value == '找工作 找房子 找服务') {
        this.value = '';
    }
    this.className += ' input_color';
    input.className += ' input_color';
};
hiddenInput.onblur = function () {
    if (!this.value) {
        this.value = '找工作 找房子 找服务';
        this.className = 'hiddenInput';
        input.className = 'input';
    }
    input.value = this.value;
};
