# throttle和debounce的差异

> 

### 防抖（Debounce）和节流阀（throttle）都是用来控制某个函数在一定时间内执行多少次的技巧。

***

throttle（节流阀） 是在间隔时间内调用，时间到了之后就会运行该函数。用例： 窗口滚动事件， 图片懒加载等。

```
function debounce(fn, delay) {
  var timer = 0;
  return function () {

    var context = this;
    var args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
```

debounce （防抖） 是触发事件之后再次等待间隔时间之后才调用。 用例： 监听 input， mousemove 事件 等。


```
function throttle(fn, interval) {
  var last = 0;

  var timer = null;

  interval = interval || 250;

  return function () {

    var that = this;
    var args = arguments;

    var now = new Date().getTime();

    if (last && now < last + interval) {
      clearTimeout(timer)

      timer = setTimeout(function () {
        last = now;
        fn.apply(that, args);
      }, interval);

    } else {
      last = now;
      fn.apply(that, args);
    }
  }
}
```
