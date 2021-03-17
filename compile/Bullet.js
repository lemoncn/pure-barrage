"use strict";
/**
 * 子弹
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Bullet = (function () {
    /**
     * @constructor Bullet
     * @param {string} msg 弹幕文字
     * @param {EmitConfig} emitConfig   弹幕文字效果
     * @param {config} stageConfig 弹幕组件初始化配置
     *
     */
    function Bullet(msg, emitConfig, stageConfig) {
        var that = this;
        that.oBullet = document.createElement("span");
        that.oBullet.innerHTML = msg;
        that.oBullet.className = "normal";
        //  着重标记
        if (emitConfig.notice) {
            that.oBullet.className += " notice";
        }
        //  字号
        if (emitConfig.fontSize) {
            that.oBullet.style.fontSize = emitConfig.fontSize;
        }
        //  字色
        if (emitConfig.fontColor) {
            that.oBullet.style.color = emitConfig.fontColor;
        }
        else {
            //  随机初始化配置的色值
            var _rnd = Math.floor(stageConfig.colors.length * Math.random());
            that.oBullet.style.color = stageConfig.colors[_rnd];
        }
        // 速度
        // 弹幕速度通过时间控制：overTimeBase
        var time = stageConfig.overTimeBase;
        time = time * (Math.random() * (1.3 - 0.8) + 0.8); // 根据划过时间增加随机性
        that.oBullet.style.transitionDuration = time / 1000 + "s";
    }
    /**
     * 获取子弹dom
     * @function get
     * @returns {HTMLSpanElement}
     *
     */
    Bullet.prototype.get = function () {
        return this.oBullet;
    };
    return Bullet;
}());
exports.default = Bullet;
