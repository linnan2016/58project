/**
 * 用惰性函数把utils封装起来
 */
var utils = (function () {
    var isStanderBrowser = !!window.getComputedStyle;

    function listToArray(likeAry) {
        try {
            return Array.prototype.slice.call(likeAry);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary.push(likeAry[i]);
            }
            return ary;
        }
    }

    function jsonParse(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = n;
            n = m;
            m = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    function offset(ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            if (window.navigator.userAgent.indexOf('MSIE 8') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
    }

    function win(attr, val) {
        if (typeof val != 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];

    }

    function getCss(ele, attr) {
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr == 'opacity') {
                val = ele.currentStyle.filter;
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }

        }
        var reg = /-?\d+(\.\d+)?(px|em|pt|deg|rem)?/;
        if (reg.test(val)) {
            val = parseFloat(val);
        }
        return val;
    }

    function setCss(ele, attr, val) {
        if (attr == 'opacity') {
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr == 'float') {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /left|right|width|height|top|bottom|(maring|padding)(Left|Right|Top|Bottom)?/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px'
            }
        }
        ele.style[attr] = val;
    }

    function setGroupCss(ele, obj) {
        //obj没有传参，obj就是一个undefined
        obj = obj || [];
        if ((obj).toString() == '[object Object]') {
            //如果这个条件符合那么obj必然是{a:1}的对象
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    setCss(ele, key, obj[key])
                }
            }
        }
    }

    function css(ele) {
        var secondParam = arguments[1];
        var thirdParam = arguments[2];
        if (typeof secondParam == 'string') {
            if (typeof thirdParam != 'undefined') {
                setCss(ele, secondParam, thirdParam);
                return;
            }
            return getCss(ele, secondParam);
        }
        secondParam = secondParam || [];
        if ((secondParam).toString() == '[object Object]') {
            setGroupCss(ele, secondParam)
        }
    }

    function children(ele, tagName) {
        var ary = [];
        if (isStanderBrowser) {
            ary = this.listToArray(ele.children);
        } else {
            var childs = ele.childNodes;
            for (var i = 0; i < childs.length; i++) {
                var curChild = childs[i];
                if (curChild.nodeType == 1) {
                    ary.push(curChild);
                }
            }
        }
        if (typeof tagName == 'string') {
            for (var i = 0; i < ary.length; i++) {
                var curAry = ary[i];
                if (curAry.nodeName != tagName.toUpperCase()) {
                    ary.splice(i, 1);
                    i--;
                }
            }
        }
        return ary;
    }

    function prev(ele) {
        if (isStanderBrowser) {
            return ele.previousElementSibling;
        }
        var prev = ele.previousSibling;
        while (prev && prev.nodeType != 1) {
            prev = prev.previousSibling;
        }
        return prev;
    }

    function next(ele) {
        if (isStanderBrowser) {
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType != 1) {
            next = next.nextSibling;
        }
        return next;
    }

    function prevAll(ele) {
        var prev = ele.previousSibling;
        var ary = [];
        while (prev) {
            if (prev.nodeType == 1) {
                ary.push(prev);
            }
            prev = prev.previousSibling;
        }
        return ary;
    }

    function nextAll(ele) {
        var ary = [];
        var next = this.next(ele);
        while (next) {
            ary.push(next);
            next = this.next(next);
        }
        return ary;
    }

    function firstEleChild(ele) {
        if (isStanderBrowser) {
            return ele.firstElementChild;
        }
        var allElesChilds = this.children(ele);
        return allElesChilds.length > 0 ? allElesChilds[0] : null;
    }

    function lastEleChild(ele) {
        if (isStanderBrowser) {
            return ele.lastElementChild;
        }
        var allElesChilds = this.children(ele);
        return allElesChilds.length > 0 ? allElesChilds[allElesChilds.length - 1] : null;
    }

    function siblings(ele) {
        return this.prevAll(ele).concat(this.nextAll(ele));
    }

    function sibling(ele) {
        var ary = [];
        var prev = this.prev(ele);
        var next = this.next(ele);
        prev ? ary.push(prev) : void 0;
        next ? ary.push(next) : void 0;
        return ary;
    }

    function index(ele) {
        return this.prevAll(ele).length;
    }

    function append(ele, container) {
        container.appendChild(ele);
    }

    function prepend(ele, container) {
        var first = this.firstEleChild(container);
        first ? container.insertBefore(ele, first) : container.appendChild(ele);
    }

    function insertBefore(oldEle, newEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    function insertAfter(oldEle, newEle) {
        var next = this.next(oldEle);
        next ? oldEle.parentNode.insertBefore(newEle, next) : oldEle.parentNode.appendChild(newEle);
    }

    function hasClass(ele, strClass) {
        var reg = new RegExp('(^| +)' + strClass + '( +|$)');
        return reg.test(ele.className);
    }

    function addClass(ele, strClass) {
        var strClassAry = strClass.replace(/^ +| +$/g, '').split(/ +/);
        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];//c5,c6
            if (!this.hasClass(ele, curClass)) {
                ele.className += ' ' + curClass;//需要加个空格
            }
        }
    }

    function removeClass(ele, strClass) {
        var strClassAry = strClass.replace(/^ +| +$/g, '').split(/ +/);
        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];//c5,c6
            while (this.hasClass(ele, curClass)) {
                var reg = new RegExp('(^| )' + curClass + '( |$)', 'g');
                ele.className = ele.className.replace(reg, ' ');
            }
        }
    }

    function getElesByClass(strClass, context) {
        context = context || document;
        if (isStanderBrowser) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        var tags = context.getElementsByTagName('*');
        var ary = [];
        var strClassAry = strClass.replace(/^ +| +$/g, '').split(/ +/);
        for (var i = 0; i < tags.length; i++) {
            var curTag = tags[i];
            var curTagOk = true;
            for (var j = 0; j < strClassAry.length; j++) {
                var curStrClass = strClassAry[j];
                var reg = new RegExp('(^| +)' + curStrClass + '( +|$)');
                if (!reg.test(curTag.className)) {
                    curTagOk = false;
                    break;
                }
            }
            if (curTagOk) {
                ary.push(curTag);
            }
        }
        return ary;
    }

    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        getRandom: getRandom,
        win: win,
        offset: offset,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        siblings: siblings,
        sibling: sibling,
        index: index,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        firstEleChild: firstEleChild,
        lastEleChild: lastEleChild,
        addClass: addClass,
        removeClass: removeClass,
        hasClass: hasClass,
        getElesByClass: getElesByClass,
        //getCss: getCss,
        //setCss: setCss,
        //setGroupCss:setGroupCss,
        css: css
    }
})();




