# WebGL: canvas 绘图中的 3D 版本

> WebGL

### WebGL（全写 Web Graphics Library ）是一种 3D 绘图标准，可以为 HTML5 Canvas 提供硬件 3D加速渲染，这样 Web 开发人员就可以借助系统显卡来在浏览器里更流畅地展示 3D 场景和模型了,还能创建复杂的导航和数据视觉化。

***

## 优点

1. 通过HTML脚本本身实现 Web 交互式三维动画的制作，无需任何浏览器插件支持，可被用于创建具有复杂 3D 结构的网站页面，甚至可以用来设计 3D 网页游戏等等。
2. 利用底层的图形硬件加速功能进行的图形渲染，是通过统一的、标准的、跨平台的OpenGL接口实现的。

## 三种变量

1. attibute(全局): 数据将从着色器外部传递给变量， **只有顶点着色器可以使用**，传输与顶点相关的数据。
2. uniform(全局): 限定于顶点着色器与片元着色器，是一个只读变量。
3. varing: 用于顶点着色器和片段着色器之间的插值数据，它们随着像素的不同而不同。

## 矩阵

在 WebGL中，矩阵用来改变顶点位置信息的， 用 4 维矩阵表示 (x, y, z, w)。

其中, x, y, z 点的坐标, w 是判断此矩阵为点还是向量。

## 着色器

> 采用了下面两种着色器小程序 的 数据传输处理计算的渲染过程，称之为 **可编程管线**。

![WebGL](https://idsbllp.com/blog/artiles/img/webgl.png)

1. 顶点着色器（vertex shader）这个是告诉电脑如何打线稿的——如何处理顶点、法线等的数据。
2. 片面着色器（fragment shader）这个是告诉电脑如何上色的——如何处理光、阴影、遮挡、环境等等对物体表面的影响，最终生成一副图像。

## 光照

WebGL 没有为光照提供任何内置的方法，需要开发者在着色器中实现光照算法。

光是有颜色的，模型也是有颜色的。在光照下，最终物体呈现的颜色是两者共同作用的结果。

实现光照的方式是：将光照的数据(点光源的位置，平行光的方向，以及光的颜色和强度)作为 uniform 变量传入着色器中，将物体表面每个顶点处的法线作为 attribute 变量传入着色器，遵循光照规则，修订最终片元呈现的颜色。

### Three.js 常见光源

1. AmbientLight: 环境光，基础光源，它的颜色会被加载到整个场景和所有对象的当前颜色上。
2. PointLight：点光源，朝着所有方向都发射光线
3. SpotLight ：聚光灯光源：类型台灯，天花板上的吊灯，手电筒等
4. DirectionalLight：方向光，又称无限光，从这个发出的光源可以看做是平行光.

### Three.js 常见优化

1. 减少drawCall，尽量将静态的对象的geometry合并为一个geometry。
2. 离镜头较远的物体可以渲染的不那么圆滑
3. 将计算量大的放在 shader(着色器) 中干，而不用 JS 计算。
4. 将 modelMatrix 区分成 moveMatrix 和 rotateMatrix。

### 参考:

[WebGL 工作原理](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-how-it-works.html)

[如何理解 OpenGL 中着色器、渲染管线、光栅化等概念？](https://www.zhihu.com/question/29163054)

[differences between an attribute, a uniform, and a varying variable](https://stackoverflow.com/questions/17537879/in-webgl-what-are-the-differences-between-an-attribute-a-uniform-and-a-varying)

[矩阵与坐标变换](http://www.cnblogs.com/dojo-lzz/p/7223364.html)