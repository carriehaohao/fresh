
// 定义模块，书写应用Yike的逻辑，依赖路由模块
var Yike = angular.module('Yike',['ngRoute']);

/*配置路由*/
Yike.config(['$routeProvider', function($routeProvider){
    // 为路由配置视图
    $routeProvider.when('/today', {
        templateUrl: './views/today.html',
        controller: 'TodayCtrl'
    })
    .when('/older', {
        templateUrl: './views/older.html',
        controller: 'OlderCtrl'
    })
    .when('/author', {
        templateUrl: './views/author.html',
        controller: 'AuthorCtrl'
    })
    .when('/category', {
        templateUrl: './views/category.html'
    })
    .when('/like', {
        templateUrl: './views/like.html'
    })
    .when('/settings', {
        templateUrl: './views/settings.html'
    })
    .otherwise({
        redirectTo: '/today'
    });
}]);

/*添加一个全局方法用来实现页面交互*/
Yike.run(['$rootScope', function($rootScope){
    // 导航初始状态
    $rootScope.collapsed = false;
    // 导航交互
    $rootScope.navToggle = function(){
        // 打开/关闭
        $rootScope.collapsed = !$rootScope.collapsed;
        // 所有导航
        var navs = document.querySelectorAll('.navs dd');
        // 判断是打开还是关闭
        if($rootScope.collapsed){
            // 所有dd位置从 -100% --> 0
            for(var i=0; i<navs.length; i++){
                navs[i].style.transform = 'translate(0)';
                navs[i].style.transitionDelay = '0.2s';
                navs[i].style.transitionDuration = (i+1)*0.15+'s';
            }
        } else {
            // 所有dd位置从 0 --> -100%
            for(var j=navs.length-1; j>=0; j--){
                navs[j].style.transform = 'translate(-100%)';
                navs[j].style.transitionDelay = '';//必须清掉打开的delay
                navs[j].style.transitionDuration = (navs.length-j)*0.15+'s';
            }            
        }
    }
}]);

/*导航控制器*/
Yike.controller('NavsCtrl', ['$scope', function($scope){
    $scope.navs = [
        {text: '今日一刻', link: '#/today', icon: 'icon-home'},
        {text: '往期内容', link: '#/older', icon: 'icon-file-empty'},
        {text: '热门作者', link: '#/author', icon: 'icon-pencil'},
        {text: '栏目浏览', link: '#/category', icon: 'icon-menu'},
        {text: '我的喜欢', link: '#/like', icon: 'icon-heart'},
        {text: '设置', link: '#/settings', icon: 'icon-cog'}
    ];
}]);

/*“今日一刻”控制器*/
Yike.controller('TodayCtrl', ['$scope','$http','$filter','$rootScope',function($scope,$http,$filter,$rootScope){
    // 格式化数据（交给后端做更方便）
    // var today = $filter('date')(new Date, 'yyyy-MM-dd');

    // 是否加载完成
    $rootScope.loaded = false;
    // 当前选中导航
    $rootScope.key = 0;
    // 当前标题
    $rootScope.title = '今日一刻';

    $http({
        url: './api/today.php',
        // params: {today: today}
    }).success(function(info){
        // console.log(info);
        $scope.posts = info.posts;
        $scope.date = info.date;
        // 加载完成就去掉loading图片
        $rootScope.loaded = true;
    });

}]);

/*“往期内容”控制器*/
Yike.controller('OlderCtrl', ['$scope','$http','$rootScope',function($scope,$http,$rootScope){

    // 是否加载完成
    $rootScope.loaded = false;
    // 当前选中导航
    $rootScope.key = 1;
    // 当前标题
    $rootScope.title = '往期内容';

    $http({
        url: './api/older.php'
    }).success(function(info){
        // console.log(info);
        $scope.posts = info.posts;
        $scope.date = info.date;
        // 加载完成就去掉loading图片
        $rootScope.loaded = true;
    });

}]);

/*“热门作者”控制器*/
Yike.controller('AuthorCtrl', ['$scope','$http','$rootScope',function($scope,$http,$rootScope){

    // 是否加载完成
    $rootScope.loaded = false;
    // 当前选中导航
    $rootScope.key = 2;
    // 当前标题
    $rootScope.title = '热门作者';

    $http({
        url: './api/author.php'
    }).success(function(info){
        // console.log(info);
        $scope.rec = info.rec.authors;
        $scope.all = info.all.authors;
        // 加载完成就去掉loading图片
        $rootScope.loaded = true;
    });

}]);