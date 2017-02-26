requirejs.config({
	baseUrl: '/',
	paths: {
		
		// 第三方库的路径配置
		jquery: 'lib/jquery/jquery.min',
		bootstrap: 'lib/bootstrap/js/bootstrap.min',
		jqueryCookie: 'lib/jquery-cookie/jquery.cookie',
		
		// 自己写的路径配置
		userList: 'js/user/list',
		userProfile: 'js/user/profile',
		common: 'js/common/common',
		login: 'js/home/login'
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		}
	}
});

// 所有的页面都需要这两个js，先加载他们。
require(['jquery', 'bootstrap', 'common']);

/*
 *这里获取页面的pathname，然后对应的加载js。
 * */
(function(window) {
	
	// 获取路径
	var pathname = window.location.pathname;
	
	/**
	 * 判断登陆状态:
	 * 
	 * 1、登陆页
	 * 1.1、没有SESSID，不用管
	 * 1.2、有SESSID，跳转到首页
	 * 
	 * 2、其它页
	 * 2.1、没有SESSID，跳转到登陆页
	 * 2.2、有SESSID，不用管
	 */
	
	require(['jquery', 'jqueryCookie'], function($, undefined) {
		var sessID = $.cookie('PHPSESSID');

		// 登陆状态前端效验
		if(pathname === '/html/home/login.html' && sessID) {
			location.href = '/';
		}else if(pathname !== '/html/home/login.html' && !sessID) {
			location.href = '/html/home/login.html';
		}
		
		// 如果没有发生页面跳转，就加载对应的js模块
		switch(pathname) {
			case '/html/user/list.html': 
				require(['userList']);
				break;
			case '/html/user/profile.html': 
				require(['userProfile']);
				break;
			case '/html/home/login.html':
				require(['login']);
				break;
		}
	});
	
})(window);
