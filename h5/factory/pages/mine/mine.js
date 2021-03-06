
// 余效俭 2016-01-07 17:26:56 创建
// H5微信端 --- 我的

require(['router', 'api','h5-view','check','h5-view-address-mine','h5-view-address-wallet','h5-alert','h5-text', 'h5-weixin'], function(router, api,View,check,address_mine,address_wallet) {

    router.init(true);

    var gopToken = $.cookie('gopToken');
	var mine = $('.mine');
	var setting_address = new View('setting-address');
	var setting=new View('setting');
	var nicknameView = new View('nickname');
	var setting_about=new View('setting-about');
	var setting_us=new View('setting-us');
	var setting_feedback=new View('setting-feedback');
	var setting_agreement=new View('setting-agreement');
		
	var vm = avalon.define({
		$id: 'mine',
		name: '',
		phone: '',
		photo: './images/picture.png',
		setnick:'未设置',
		nickname:'',
		feedback:'',
		setMarketAddressTip:'未设置',
		setWallet:'未设置',
		setRealName:false,//是否实名认证标志
		hasMarketAddress:false,//是否有果仁市场地址标志
		setMarketAddress:false,//正在设置果仁市场地址标志
		marketGopAddress:'',//果仁市场地址
		nick_click:function(){
			nick.nickname=vm.nickname;
			router.go('/view/nickname');
		},
        address_mine_click:function(){//果仁市场跳转
            var nowData={};
            if(vm.marketGopAddress!=''){
                nowData.marketGopAddress=vm.marketGopAddress;
                nowData.hasMarketAddress=true;
            }  else{
                nowData.hasMarketAddress=false;
            }         
            $.extend(address_mine.vm, nowData); 
            router.go('/view/address-mine');
        },
        walletAddress_click:function(){//钱包地址跳转
            var nowData={};
            nowData.walletList=[];
            api.walletList({
                gopToken: gopToken
            }, function(data) {
                if (data.status == 200) {
                    for (var i=0;i<data.data.walletList.length;i++) {
                        var item=data.data.walletList[i]; 
                        if(item.defaultWallet){
                            nowData.walletList.unshift(item);
                        }else{
                            nowData.walletList.push(item);
                        }                       
                    } 
                    $.extend(address_wallet.vm, nowData); 
                    router.go('/view/address-wallet');                 
                } else {
                    console.log(data);
                }
            });       
            
        },
        address_back_click: function () {//返回
        	router.go('/');
        },
        feedback_click: function () {//问题反馈
        	if(check.empty(vm.feedback) || vm.feedback=='＃果仁宝意见反馈＃' || vm.feedback.length<10 || vm.feedback.length>140){
        		$.alert("用户可输入10-140个汉字");
        	}
        	api.fankui({
        		gopToken: gopToken,
        		fankuiContext:vm.feedback
        	}, function(data) {
        		if (data.status == 200) {
        			$.alert('谢谢您的意见反馈!');
        			//router.go('/');
        			vm.feedback = "";
        			window.history.back();

        		} else {
        			console.log(data);
        			$.alert(data.msg);
        		}
        	});	
        },

	});
	
	var nick=avalon.define({
		$id: 'nickname',
		nickname: '',
		nickname_click: function() {
			if(!check.empty(nick.nickname)){
				 api.updateNick({
		        		gopToken: gopToken,
		        		nick:nick.nickname
		        	}, function(data) {
		        		if (data.status == 200) {
		        			$.alert('设置成功!');
		        			if(!vm.setRealName){
		        				vm.name=nick.nickname;
		        			}
		        			if(vm.setnick=='未设置'){
		        				vm.setnick=='修改';
		        			}
		        			vm.nickname=nick.nickname;
		        			router.go('/');
		        		} else {
		        			console.log(data);
		        		}
		        	});
			}else{
				$.alert('请输入昵称!');
			}
		}
	});
	
	//初始加载用户信息
	api.info({
		gopToken: gopToken
	}, function(data) {
		if (data.status == 200) {			
			vm.phone = data.data.phone;
			if(data.data.photo){				
				vm.photo = data.data.photo;
			}			
			if(data.data.nickname){
				vm.setnick='修改';//昵称。null或空字符串都表示未设置
				vm.name = data.data.nickname;
				vm.nickname=data.data.nickname;
			}
			if(data.data.realname){
				vm.name = data.data.realname;
				vm.setRealName=true;
			}
			if(data.data.marketGopAddress){
				vm.setMarketAddressTip='已设置';//果仁市场地址。null或空字符串都表示未设置
				vm.hasMarketAddress=true;
				vm.marketGopAddress=data.data.marketGopAddress.substring(0,10)+"*************************************";
			}
			if(data.data.hasWallet){
				vm.setWallet='已设置';//果仁市场地址。null或空字符串都表示未设置
			}
			vm.internalGopAddress=data.data.internalGopAddress;//内部果仁地址。null或空字符串都表示未设置

		} else {
			console.log(data);
		}
	});

	avalon.scan();
	setTimeout(function() {
		mine.addClass('on');
	}, 100);
});


