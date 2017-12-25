## babel-plugin-remove-console
RN中的console.log与chrome实现不一致，safrai 的JSC中 console时会进行JSON.stringify,损耗性能，可以通过环境判断，Jenkin打包是linux平台，本地开发多为win/mac，本地环境时不remove console。

npm包名：babel-plugin-remove-console

```js

const babel = require('babel-core');

const code = `
class A{
    change(){
        var a = 1
    }

    onPress(){
        var w= 2
        console.log(1111)
    }
}`


const result = babel.transform(code,{
    plugins:['./babel-plugin-remove-console.js']
})

//转换后
class A{
    change(){
        var a = 1
    }

    onPress(){
        var w= 2
    }
}


```

