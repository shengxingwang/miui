function ajax(o){
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest(); 
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(o.method=="get"){
		if(o.params){//有请求参数时
			xhr.open("GET",o.url+"?random="+new Date().getTime()+"&"+getStr(o.params),o.isAsyc);
		}else{
			xhr.open("GET",o.url+"?random="+new Date().getTime(),o.isAsyc);
		}
		xhr.send();
	}else{
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.open("POST",o.url,o.isAsyc);
		var params = getStr(o.params);
		xhr.send(params)
	}
	if(o.isAsyc){
		xhr.onreadystatechange=function(){
			handler();
		}
	}else{
		handler();
	}
	//封装同步异步监听	
	function handler(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				o.success(xhr.responseText);
			}else{
				o.error(xhr.status);
			}
		}
	}
}

//拼接参数
function getStr(param){
	var arr = [];
	var str = "";
	for(var item in param){
		arr.push(item+"="+param[item])
	}
	str = arr.join("&");
	return str;
}

