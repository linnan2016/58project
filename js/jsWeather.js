var box = document.getElementById('weather');
var imgs = box.getElementsByTagName('img');

;(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            window.data = utils.jsonParse(xhr.responseText)
        }
    };
    xhr.send(null);
})();

;(function bindData() {
    if (window.data) {
        var str = '';
        str += '<div class="title"><span><img src="" tempSrc="' + data[0].src + '" class="littleImg">' + data[0].temp + '</span><span class="airQuality">' + data[0].airQ + '</span></div><div class="hidden"><div class="air">今日北京空气质量指数(AQI):<b class="aqi">' + data[0].aqi + '</b><p class="more">更多天气查看<a href="javascript:void 0" class="moJi">墨迹天气</a></p></div><div class="wForecast"><ul><li class="first"><p>' + data[0].today + '</p><img src="" tempSrc="' + data[0].tImg + '" class="wImg"><p class="describe">' + data[0].tTemp + '<br>' + data[0].tAir + '<br>' + data[0].tWind + '</p></li><li class="second"><p>' + data[0].tom + '</p><img src="" tempSrc="' + data[0].tomImg + '" class="wImg"><p class="describe">' + data[0].tomTemp + '<br>' + data[0].tomAir + '<br>' + data[0].tomWind + '</p></li><li><p>' + data[0].aft + '</p><img src="" tempSrc="' + data[0].aftImg + '" class="wImg"><p class="describe">' + data[0].aftTemp + '<br>' + data[0].aftAir + '<br>' + data[0].aftWind + '</p></li></ul></div><div class="prompt"><b class="big">温馨提示：</b>' + data[0].prompt + '</div></div>';
        box.innerHTML = str;
    }
})();
//验证图片有效性
;(function verifyImgs() {
    for (var i = 0; i < imgs.length; i++) {
        ;(function (i) {
            var curI = imgs[i];
            var tempI = new Image();
            tempI.src = curI.getAttribute('tempSrc');
            tempI.onload = function () {
                curI.src = this.src;
                curI.removeAttribute('tempSrc');
            }
        })(i)
    }
})();
