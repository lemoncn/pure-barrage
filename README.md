# 弹幕库 by CSS3 

- 提供弹幕功能
- 对比canvas性能后，采用css3方案，支持移动H5
- 使用ts开发


# 使用说明

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
            speed: 'normal',  // 速度 fast | norma(default) | slow
            className: 'custom'  // 自定义class
        });
    }, 1000);


# 开发说明
开发：
npm run dev

打开 http://localhost:1234/ 



