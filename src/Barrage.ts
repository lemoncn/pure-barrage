/**
 * 弹幕类
 * @author Lemon
 */

import './type'; //  数据类型
import Bullet from './Bullet'; //  弹幕子弹
const objectAssign = require('object-assign');

class Barrage {
  private config: config; //  实例配置
  private width: number; // 弹幕舞台宽度
  private height: number; // 弹幕舞台高度
  private lastTop: number; //   最后一个弹幕发射的y坐标

  /**
   * @constructor Barrage
   * 
   * @param {config} config 
   * @param {Object} config.container - 弹幕区域的dom对象
   * @param {Number} config.overTimeBase - 弹幕划过的时间基准（弹幕划过所需要的时间，默认5000  即5s）
   */
  constructor(config: config) {
    let that = this;
    // 初始化默认配置
    that.config = objectAssign({
      container: window.document.body,
      overTimeBase: 6000
    }, config);

    that.width = that.config.container.clientWidth;
    that.height = that.config.container.clientHeight;
    that.lastTop = 0;

    that.styleInit();
  }

  /**
   * 样式初始化
   * @function  styleInit
   * @private
   */
  private styleInit() {
    let that = this;
    // 给弹幕容器加class调用
    that.config.container.className += ' fe-plus-barrage';

    let oHead: HTMLElement = document.getElementsByTagName('head')[0];
    let oStyle: any = document.createElement('style');
    oStyle.type = 'text/css';
    let sCSS = [
      '.fe-plus-barrage{overflow: hidden}',
      '.fe-plus-barrage .barrage-bullet{position: absolute;left: 100%;top: 0px;z-index: 100;white-space: nowrap;color: #fff;line-height: 160%;text-shadow: 1px 1px 0px rgba(0,0,0,.4);transition: transform 3s linear;}',
      '.fe-plus-barrage .barrage-bullet-notice{font-weight: bold;color:red}',
    ].join('');
    if (oStyle.styleSheet) {
      oStyle.styleSheet.cssText = sCSS;
    } else {
      oStyle.innerHTML = sCSS;
    }
    oHead.appendChild(oStyle);
  }

  /**
   * 发射弹幕
   * @function emit
   * @param {string} msg 
   * @param {EmitConfig} [emitConfig] 拓展样式
   * @param {boolean} [emitConfig.notice] 是否是重点弹幕（加大加粗）
   * @param {string} [emitConfig.fontSize] 字号 “12px”
   * @param {string} [emitConfig.fontColor] 字色“#ff0”
   */
  emit(msg: string, emitConfig?: EmitConfig) {
    const that = this;
    const oEmitConfig: EmitConfig = emitConfig || {};

    //  获取弹幕子弹元素
    const bullet = new Bullet(msg, oEmitConfig, that.config).get();

    //  render dom，获取其占位尺寸
    that.config.container.appendChild(bullet);

    let bulletWidth: number = bullet.clientWidth;
    let bulletHeight: number = bullet.clientHeight;

    //  top值
    // that.lastTop += bulletHeight + Math.random() * 30;
    that.lastTop += bulletHeight + 0;
    if (that.lastTop + bulletHeight > that.height) {
      that.lastTop = 0;
    }
    bullet.style.top = that.lastTop + 'px';

    // 移出屏幕偏移量
    let moveX: number = that.width + bulletWidth;

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
  }

}

export default Barrage;
