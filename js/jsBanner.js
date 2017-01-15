var bigBanner = document.getElementById('bigBanner');
var banner = document.getElementById('lunBo');
var left = document.getElementById('leftClick');
var right = document.getElementById('rightClick');
var ul = utils.getElesByClass('focus', bigBanner)[0];
var lis = ul.getElementsByTagName('li');

bigBanner.onmouseenter = function () {
    left.style.display = 'block';
    right.style.display = 'block';
};
bigBanner.onmouseleave = function () {
    left.style.display = 'none';
    right.style.display = 'none';
};
var step = 0;
left.onclick = function () {
    step--;
    if (step < 0) {
        step = 0;
    }
    animate(banner, {left: 0}, 500);
    focusAlign()
};
right.onclick = function () {
    step++;
    if (step > 1) {
        step = 1;
    }
    animate(banner, {left: -310}, 500);
    focusAlign()
};
function focusAlign() {
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = i === step ? 'curFocus' : '';
    }
}
;(function bindEvent() {
    for (var i = 0; i < lis.length; i++) {
        var curLi = lis[i];
        curLi.index = i;
        curLi.onclick = function () {
            step = this.index;
            animate(banner, {left: step * -310}, 500);
            focusAlign();
        }
    }
})();