[TOC]

## 流行框架 angular第四天

### 反馈
- 自定义指令在过一下
- 服务那块还是不太明白,自定义服务中的this怎么理解
- 再讲一下$scope.$apply的用法
- Angular中过滤器的使用方式 应用场景不太明白
- angularjs版本说明
- 总体感觉不错，就像问一句 ，在以后的开发中，我们是不是这么个流程，$http 获取api的数据后，然后就是跟指令打交道，该遍历的遍历，该显示的显示，该隐藏的隐藏 就是这样吗？
- 这两天学了好多指令，记不住怎么解...
- 单个知识点都明白，但是没有做过整个的单页应用，所以有点朦胧得感觉
- 讲完知识点给练习时间

- 控制器
    + 控制器页面中的某一个区域 写这块区域的业务逻辑
- 服务
    + 自定义服务
        * 抽象公共代码
    + 系统内置服务
        * 在控制中辅助我写业务逻辑
- 过滤器
    + 对数据格式进行处理
- 指令
    + 操作DOM


### 1.[Todomvc](http://todomvc.com/examples/angularjs/#/)
- 展示数据
- 添加数据
- 修改任务(状态和任务名称)
- 删除任务(单个删除和多个删除)
- 筛选任务
- 全选 全不选
- *angular不推崇DOM操作 一切以数据为中心*
- 以数据驱动DOM

### 2.路由传递参数
- 在实际的项目中,访问文章详情页面的时候,一般地址栏上都会显示当前文章的ID
- 让控制器知道我们当前访问的是哪篇文章,得到文章ID,去请求具体的文章数据

### 3.ui-router [第三方路由神器](https://github.com/angular-ui/ui-router)
- 用法和ngRoute相似,功能比其强大
- 基本使用
```html
<body ng-app="myApp">
    <!--
        在A标签中可以直接以#!/的形式书写 但是不建议
    -->
    <a href="#!/index">首页</a>
    <a href="#!/list">列表页</a>
    <br/>

    <!--
        在ui-router中 提供了一个ui-sref指令
        将路由的name值填在这里即可
        ui-router会自动查找name至对应的锚点链接
        并生成对应的链接地址
    -->

    <a ui-sref="index">首页</a>
    <a ui-sref="list">列表页</a>
    <div ui-view></div>
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-ui-router/angular-ui-router.min.js"></script>
    <script>
        /*
            路由模块的名字是ui.router 把这个名字作为主模块的依赖模块
        */
        angular.module('myApp',['ui.router'])

            /*
                ui-router中提供了一个$stateProvider对象,用来配置路由

                state方法负责具体的配置 

                参数以对象的形式存在

                name:当前路由的名字(状态)

                url:当前路由的url锚点值

                template:当前路由的模板

                这里也有templateUrl属性 和ngRoute中的意思一样

             */
            .config(['$stateProvider',function($stateProvider){

                $stateProvider
                    .state({
                        name:'index',
                        url:'/index',
                        template:'<div>首页</div>'
                    })
                    .state({
                        name:'list',
                        url:'/list',
                        template:'<div>列表页</div>'
                    })

            }])
    </script>
</body>
```

- ui-router 多view用法
```html
<body ng-app="myApp">
    <a ui-sref="index">首页</a>
    <a ui-sref="list">列表页</a>
    
    <!--
        在ui-router中可以存在多个 ui-view
        为了区分 可以给每个ui-view起一个不同的名字
    -->
    <div ui-view="view-a"></div>
    <div ui-view="view-b"></div>

    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-ui-router/angular-ui-router.min.js"></script>
    <script>
        angular.module('myApp',['ui.router'])

            .config(['$stateProvider',function($stateProvider){

                /*
                    当页面中有多个ui-view时,在路由配置中可以使用views属性配置
                    views属性的值是对象的形式,属性名是view的名字,其值又是一个对象
                    是当前view的具体配置 比如templateUrl controller等等

                 */

                $stateProvider
                    .state({
                        name:'index',
                        url:'/index',
                        views:{
                            'view-a':{
                                template:'<div>首页a</div>'
                            },
                            'view-b':{
                                template:'<div>首页b</div>'
                            }
                        }
                    })
                    .state({
                        name:'list',
                        url:'/list',
                        views:{
                            'view-a':{
                                template:'<div>列表页A</div>'
                            },
                            'view-b':{
                                template:'<div>列表页B</div>'
                            }
                        }
                    })

            }])
    </script>
</body>
```
   
- ui-router传参
```html
<body ng-app="myApp">
    
    <!--
        
        在路由名字的后面加上一个小括号  -> 类似于函数小括号

        在小括号中写一个对象 并把参数写在对象中  -> 类似于给函数传递了一个对象类型的值

    -->

    <a ui-sref="index">首页</a>
    <a ui-sref="list({pagenumber:1,pagesize:10})">列表页</a>
    
    <div ui-view></div>

    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-ui-router/angular-ui-router.min.js"></script>
    <script>
        angular.module('myApp',['ui.router'])

            .config(['$stateProvider',function($stateProvider){

                $stateProvider
                    .state({
                        name:'index',
                        url:'/index',
                        template:'<div>首页</div>'
                    })
                    .state({
                        name:'list',
                        // 路由配置中参数的配置和ngRoute一样
                        url:'/list/:pagesize/:pagenumber',
                        template:'<div>列表页</div>',
                        controller:'listCtrl'
                    })

            }])
            .controller('listCtrl',['$stateParams',function($stateParams){

                /*
                    在获取的参数的时候 ui-router提供了一个 $stateParams 对象

                 */

            }])
    </script>
</body>
```

### 4.ui-router路由嵌套
- 需求:首页、列表页显示导航,详情页不显示导航
```html
<body ng-app="myApp">
    <!-- html入口文件的ui-view -->
    <div ui-view></div>
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-ui-router/angular-ui-router.min.js"></script>
    <script>
        angular.module('myApp',['ui.router'])
            .config(['$stateProvider',function($stateProvider){

                $stateProvider
                    .state({
                        url:'/tab',
                        name:'tab',
                         // 此参数代表当前路由需要和其他路由配合使用
                         // 不能单独使用
                         // 当前模板会被插入到html入口文件中的ui-view指令所在标签
                        abstract:true,
                        template:'<a ui-sref="tab.index">首页</a>\
                                  <a ui-sref="tab.list">列表页</a>\z
                                  <a ui-sref="article">文章页</a>\
                                  <div ui-view></div>' 
                        // tab模板中的ui-view 和当前路由配合使用的路由模板被插入到这里
                    })
                    .state({
                        url:'/index',
                         // tab.index表示当前路由需要和tab路由配合使用
                         // 当前路由的模板被插入到tab模板中的ui-view指令所在标签
                        name:'tab.index',
                        template:'<div>首页</div>'
                    })
                    .state({
                        url:'/list',
                        // tab.list表示当前路由需要和tab路由配合使用
                        // 当前路由的模板被插入到tab模板中的ui-view指令所在标签
                        name:'tab.list',
                        template:'<div>列表页</div>'
                    })
                    .state({
                        url:'/article',
                        // 当前路由可以独立使用
                        // 模板被插入到html入口文件中的ui-view指令所在标签
                        name:'article',
                        template:'<div>列表页</div>'
                    })

            }])
    </script>
</body>
```

- 实现步骤
    + 将导航写成一个单独的路由(因为路由要控制他的显示和隐藏)
    + 设置导航路由不能单独使用
    + 将显示导航的页面和导航路由做关联
    + 在导航路由模板中添加ng-view
        * 路由模板会显示在index.html页面的ng-view指令所在的标签中
        * 和导航路由关联的页面会显示在路由模板中的ng-view指令所在的标签中
        * 这个时候导航和页面会同时展示在页面中
        * 当点击进入详情页面的时候,由于当前页面没有和导航路由做关联,所以当前会页面会显示在index.html页面的ng-view指令所在的标签中,这个时候详情页面会替换掉之前的页面,所以导航就不会显示在页面中了.

### 5.ui-router $urlRouterProvider
```html
<body ng-app="myApp">
    <a ui-sref="index">首页</a>
    <a ui-sref="list">列表页</a>
    <div ui-view></div>
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-ui-router/angular-ui-router.min.js"></script>
    <script>
        angular.module('myApp',['ui.router'])

            .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

                $stateProvider
                    .state({
                        name:'index',
                        url:'/index',
                        template:'<div>首页</div>'
                    })
                    .state({
                        name:'list',
                        url:'/list',
                        template:'<div>列表页</div>'
                    })

                // 当以上路由都不能匹配的时候 跳转到index页面
                $urlRouterProvider.otherwise('index');

            }])
    </script>
</body>
```

### 6.ui-router路由配置
- onEnter: function () {alert('进入') }
- onExit: function () {alert('退出') }

### 7.run 方法
- 初始化全局的数据,只对$rootScope起作用,$scope不起作用
- 只执行一次

### 8.视图加载完成事件
- $scope.$on("$viewContentLoaded",function(){});
