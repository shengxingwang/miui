//获取属性值
		function getStyle(obj,name){
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}else{
				return getComputedStyle(obj,false)[name];
			}
		}
		function animate(dom,dataobj,iTime,step,fn){
			clearInterval(dom.timer);
			dom.timer = setInterval(function(){
				var flag = true;
				for(var attr in dataobj){
					if(attr=="opacity"){
					var currentValue = getStyle(dom,"opacity")*100;
					}else{
						var currentValue = parseInt(getStyle(dom,attr));
					}
					//匀速运动
					if(currentValue>dataobj[attr]){
						var speed = -step;
					}else{
						var speed = step;
					}
					
					//缓冲运动
					/*var speed = (dataobj[attr]-currentValue)/10;
					if(speed>0){
						speed = Math.ceil(speed);
					}else{
						speed = Math.floor(speed);
					}*/
					
					if (currentValue == dataobj[attr]) {

							continue; //结束本次函数的执行
					}
					if(currentValue!=dataobj[attr]){
							flag = false;
					}
					if(attr=="opacity"){
						currentValue+=speed;
						dom.style["opacity"]=currentValue/100;
						dom.style["filter"]="alpha(opacity="+currentValue+")";
					}else{
						currentValue+=speed;
						dom.style[attr]=currentValue+"px";
					}
				}
				if(flag){
					clearInterval(dom.timer);
					if(fn){
						fn();
					}
				}
			},iTime);
		}