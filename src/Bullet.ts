/**
 * 子弹
 */
import './type'; //  数据类型

class Bullet {
    private oBullet: HTMLSpanElement;

    /**
     * @constructor Bullet
     * @param {string} msg 弹幕文字
     * @param {EmitConfig} emitConfig   弹幕文字效果 
     * @param {config} stageConfig 弹幕组件初始化配置
     * 
     */
    constructor(msg: string, emitConfig: EmitConfig, stageConfig: config) {
        var that = this;
        that.oBullet = document.createElement("div");
        that.oBullet.innerHTML = msg;
        that.oBullet.className = "barrage-bullet";

        //  着重标记
        if (emitConfig.notice) {
            that.oBullet.className += " barrage-bullet-notice";
        }

        // class拓展
        if (emitConfig.className) {
            that.oBullet.className += " " + emitConfig.className;
        }

        //  字号
        if (emitConfig.fontSize) {
            that.oBullet.style.fontSize = emitConfig.fontSize;
        }

        //  字色
        if (emitConfig.fontColor) {
            that.oBullet.style.color = emitConfig.fontColor;
        }

        // 速度
        // 弹幕速度通过时间控制：overTimeBase
        let time = stageConfig.overTimeBase;
        switch (emitConfig.speed) {
            case 'fast':
                time = time * (Math.random() * (1.3 - 0.8) + 0.4);
                break;
            case 'slow':
                time = time * (Math.random() * (1.3 - 0.8) + 1.2);
                break;
            default:
                time = time * (Math.random() * (1.3 - 0.8) + 0.8);
        }
        that.oBullet.style.transitionDuration = time / 1000 + "s";
    }

    /**
     * 获取子弹dom
     * @function get
     * @returns {HTMLSpanElement} 
     * 
     */
    get(): HTMLSpanElement {
        return this.oBullet;
    }
}

export default Bullet;
