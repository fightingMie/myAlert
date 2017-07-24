//这个文件被引入到了index.html中，路径要相对于index.html来写
angular.module('myApp', [])
    .controller('dmeoCtl', ['$scope', '$http', function ($scope, $http) {

        //$scope.taskList =  localStorage.taskList ? JSON.parse(localStorage.taskList) : [];

        $scope.taskList = [];

        $scope.getNum = function () {
            if (localStorage.getItem('localList')) {
                var list1 = localStorage.getItem('localList')
                list1 = JSON.parse(list1);
                for (var i = 0; i < list1.length; i++) {
                    $scope.taskList.push(list1[i])
                }
                
                for (var i = 0; i < $scope.taskList.length; i++) {
                    $scope.taskList[i]['isEdit'] = false;
                }
            }
        }
        
        $scope.getNum();
        console.log($scope.taskList)

        //1渲染初始数据
        // $scope.taskList = [];

        // $http({
        //     url: './js/data.json',
        //     method: 'get'
        // }).then(function (res) {
        //     for (var i = 0; i < res.data.length; i++) {
        //         res.data[i]['isEdit'] = false;
        //         $scope.taskList.push(res.data[i])
        //     }
        //     // for(var i=0;i<res.data.length;i++){
		// 	// 	res.data[i].isEdit = false;
		// 	// }
		// 	// $scope.taskList = res.data;
        //     // console.log(res.data)
        //     console.log(res.data)
        //     console.log($scope.taskList)
        // });
        

        //2添加数据

        

        $scope.addTask = function () {
            var random = new Date().getSeconds();
            $scope.taskList.push({
                id: random + Math.random(),
                name: $scope.addval,
                isCompleted: false,
                isEdit: false
            });
            $scope.addval = ""

            //使用本地存储,本地存储里面要存储字符串类型的值
            
            // var list = JSON.stringify($scope.taskList);
            // console.log(list)
            // window.localStorage.setItem("localList", list
           
        }

       




        //3删除
        $scope.deltask = function (id) {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].id == id) {
                    $scope.taskList.splice(i, 1)
                }
            }
  
        }

        //4状态:根据isComplate的值判断
        $scope.addCount = function () {
            var count = 0;
            for (var i = 0; i < $scope.taskList.length; i++) {
                if (!$scope.taskList[i].isComplate) {
                    count++;
                }
            }
            return count;
        }

        //5处理状态


        //6显示还有多少未完成

        $scope.condition = ""

        $scope.showState = function (condition) {
            switch (condition) {
                case 'All':
                    $scope.condition = "";
                    break;

                case 'Active':
                    $scope.condition = false;
                    break;
                case 'Completed':
                    $scope.condition = true;
                    break;
            }
        }

        //清除已完成
        $scope.clearCom = function () {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].isCompleted) {
                    $scope.taskList.splice(i, 1)
                    i--;
                }
            }
        }

        //设置全选
        $scope.choseAll = function () {
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isCompleted = $scope.chosedAll;
            }

        }

        //设置高亮状态的更改
        $scope.changeLight = function () {
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.chosedAll = true;
                if (!$scope.taskList[i].isCompleted) {
                    $scope.chosedAll = false;
                    return false;
                }
            }
        }

        //双击编辑状态
        $scope.edit = function (id) {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].id == id) {
                    $scope.taskList[i].isEdit = true;
                }
                else {
                    $scope.taskList[i].isEdit = false;
                }
            }
        }

        //光标离开，只显示修改内容
        $scope.leaveBlur = function (id) {
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isEdit = false;
            }
        }

        //监听字符串的变化，字符串一旦变化就更新本地存储的数据
        $scope.$watch('taskList',function(){
            console.log($scope.taskList)
            var list = JSON.stringify($scope.taskList);
            console.log(list)
            window.localStorage.setItem("localList", list)
        },true)

    }])
