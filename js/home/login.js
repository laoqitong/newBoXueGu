define(['jquery', 'jqueryCookie'], function($, undefined) {
	/*
	 * 1、先监听form表单的提交事件，
	 * 2、事件回调中return false阻止默认的提交
	 * 3、事件回调中通过ajax的方式发送表单数据
	 * 4、如果返回结果中的code为200，证明登陆成功，跳转到首页
	 * */
	
	$('#form-login').on('submit', function() {
		
		$.ajax({
			url: '/v6/login',
			type: 'post',
			data: $(this).serialize(),
			success: function(data) {
				
				// 如果登陆成功，使用cookie的方式保存用户信息，
				// 注意：cookie值必须为字符串，我们得到的是js对象，需要使用JSON.stringify进行转换
				if(data.code === 200) {
					$.cookie('userInfo', JSON.stringify(data.result), {path: '/'});
					location.href = '/';
				}
			}
		});
		
		return false;
	});
});
