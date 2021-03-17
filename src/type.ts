declare var require: any



/**
 * 构造函数config参数数据结构
 */

interface config {
  container: any;//  弹幕容器dom对象
  overTimeBase?: number;//   弹幕划过的时间基准 6000ms
}

interface EmitConfig{
  notice?: boolean;  //  是否是重点弹幕（加大加粗）
  fontSize?: string; //  字号 “12px”
  fontColor?: string;  //  字色“#ff0”
  className?: string;  //  样式名
  speed?: string; //  划过的速度描述 normal（default） | fast | slow
}
