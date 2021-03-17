"use strict";
/**
 * 弹幕类
 * @author Lemon
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./type"); //  数据类型
var Bullet_1 = require("./Bullet"); //  弹幕子弹
var Barrage = (function () {
    /**
     * @constructor Barrage
     *
     * @param {config} config
     * @param {Object} config.container - 弹幕区域的dom对象
     * @param {Number} config.overTimeBase - 弹幕划过的时间基准（弹幕划过所需要的时间，默认5000  即5s）
     * @param {Array} config.colors - 文字颜色数组
     */
    function Barrage(config) {
        var that = this;
        // 初始化默认配置
        that.config = Barrage._extend({
            container: window.document.body,
            overTimeBase: 6000,
            colors: [
                '#FD60B9',
                '#62C8F7',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#F4CF63',
                '#FF4249',
                '#fff',
                '#0FBA57',
                '#C87FE7'
            ]
        }, config);
        that.width = that.config.container.offsetWidth;
        that.height = that.config.container.offsetHeight;
        that.lastTop = 0;
        that.styleInit();
    }
    /**
     * 样式初始化
     * @function  styleInit
     * @private
     */
    Barrage.prototype.styleInit = function () {
        var that = this;
        // 给弹幕容器加class调用
        that.config.container.className += ' plugin-barrage';
        var oHead = document.getElementsByTagName('head')[0];
        var oStyle = document.createElement('style');
        oStyle.type = 'text/css';
        var sCSS = ['.fe-plus-barrage{background-color:#f00}'].join('');
        if (oStyle.styleSheet) {
            oStyle.styleSheet.cssText = sCSS;
        }
        else {
            oStyle.innerHTML = sCSS;
        }
        oHead.appendChild(oStyle);
    };
    /**
     * 发射弹幕
     * @function emit
     * @param {string} msg
     * @param {EmitConfig} [emitConfig] 拓展样式
     * @param {boolean} [emitConfig.notice] 是否是重点弹幕（加大加粗）
     * @param {string} [emitConfig.fontSize] 字号 “12px”
     * @param {string} [emitConfig.fontColor] 字色“#ff0”
     */
    Barrage.prototype.emit = function (msg, emitConfig) {
        var that = this;
        var oEmitConfig = emitConfig || {};
        //  获取弹幕子弹元素
        var bullet = new Bullet_1.default(msg, oEmitConfig, that.config).get();
        //  render dom，获取其占位尺寸
        that.config.container.appendChild(bullet);
        var bulletWidth = bullet.clientWidth;
        var bulletHeight = bullet.clientHeight;
        //  top值(带修正+随机)
        that.lastTop += Math.random() * 30;
        if (that.lastTop + bulletHeight + 40 > that.height) {
            that.lastTop = 0;
        }
        else {
            that.lastTop += 40;
        }
        bullet.style.top = that.lastTop + 'px';
        // 移出屏幕偏移量
        var moveX = that.width + bulletWidth;
        //  开始单条弹幕
        bullet.style.transform = 'translate3d(' + -moveX + 'px, 0,0)';
        //  动画结束消除自己
        function _removeBullet() {
            if (bullet.parentNode) {
                bullet.removeEventListener('webkitTransitionEnd', _removeBullet);
                bullet.removeEventListener('transitionend', _removeBullet);
                bullet.parentNode.removeChild(bullet);
            }
        }
        bullet.addEventListener('webkitTransitionEnd', _removeBullet);
        bullet.addEventListener('transitionend', _removeBullet);
    };
    /**
     *
    * 给对象赋值
    * 以第一个对象的key为准
    * @function _extend
    * @static
    * @param {*} o 基准对象
    * @param {*} o1 赋值对象
    * @returns {*} 拓展后的对象
    *
    */
    Barrage._extend = function (o, o1) {
        if (typeof o1 === 'object') {
            for (var i in o) {
                o[i] = o1[i] || o[i];
            }
            return o;
        }
        return o;
    };
    return Barrage;
}());
exports.default = Barrage;
