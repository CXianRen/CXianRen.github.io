+ 效果
![](./src/自定义导航栏效果01.PNG)

+ app.json设置
```
  将window字段修改为如下

  "window":{
    "navigationStyle": "custom"
  },  

```

+ wxml
```
  <view class="nv_title" style='height: 100px;'>
    <image src="https://pic2.zhimg.com/v2-860e89876e3c003d5d619003e675dffd_r.jpg" style="width: {{sysinfo.windowWidth}}px; height:95px"></image>
  </view>

```

+ wxss
```
.nv_title {
  background-color: white;
}

```

+ 为了自适应不同的屏幕分辨率，我们读取设备的信息,并增加全局变量
+ app.js
```
app回调中增加全局变量 sysinfo

    globalData: {
        sysinfo:null,
    }

在 onluanch中增加读取接口
    onluanch() {
        
        ...

        try {
        const res = wx.getSystemInfoSync()
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        this.globalData.sysinfo=res
        } catch (e) {
        // Do something when catch error
        }

        ...
    }
```

+ 所在页面使用全局变量
```
    data: {
        sysinfo:app.globalData.sysinfo,
  },
  
```