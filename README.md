背景：
因为测试时候需要大量的打开tab页登陆不同的账号跑流程，tabs页多了后就会混乱

相关配置：
vue 3.0.4

限制：
1.应该是只能用在chrome
2.暂时不能搜索
3.代码异常简陋
4.类似goToTab

操作：
1. 在chrome的扩展程序那里【加载已解压的扩展程序】选择changeTabs整个文件夹
2. 开始使用
3. 编辑能够把标签页改成自定义名称，快速跳转
4. 在扩展程序页面左上角的三杠能够设置对应插件的chrome内快捷键

PS:
一开始是用vue-cli-plugin-chrome-ext这个包去做的插件初始化，出来后发现popup一直无法调用background.js
就改用了最最最原始的方式写manifest，一调试就好了，如果有想法想写插件的同志们看到这个东西，希望对您有帮助~~
