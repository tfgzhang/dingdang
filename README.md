# dingdang 

## 一个管理react数据层的产品

### 设计思路

- store 分为3个级别
    - 单页面store （store 随着单个页面的生命周期而变动！）
    - 场景store（多个页面共享的一个store ， 当用户的操作一直处于场景内时，store数据会常驻内存中，多个页面共享，当用户离开了场景页面时store数据清空！）
    - 全局store （ 全局store 内的数据 为只读数据 ， 只有当项目初次加载时才拥有一次赋值的机会！）
    
    
### 已完成部分
- 单页面store

### API

Page装饰器： 需要放置一个store参数， store对象必须拥有 namespace 、 state 、 pure 、 effect 4个指定字段

Component装饰器： 一般用来装饰 Page 装饰的页面的字组件， 可以直接获取到store内的state数据

state：主要用来存储数据

pure：这里只能用来放置纯函数， 并且最后要返回一个全新的state

effect： 副作用， 一般用来对服务端进行交互 ， 这里的方法最终会返回一个promise对象 ， 同时在这里可以直接去调用pure ， 但是不可以调用其他的effect

namespace： 保留关键字（值为一个字符串）， 建议赋予有意义的值