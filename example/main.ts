import Barrage from '../src/Barrage';

const barrage = new Barrage({
    container: window.document.getElementById('danmu'),
    overTimeBase: 5000
  });


  barrage.emit('中文中文中文中文中文中文');


  setInterval(function() {
    barrage.emit('中文中文中文中文中文中文', {
      notice: true, // 加红加粗
      fontSize: '20px',  // 弹幕字号
      fontColor: '#ff0',  // 颜色
      speed: 'fast',  // 速度 fast | norma(default) | slow
      className: 'custom'  // 自定义class
    });
  }, 1000);