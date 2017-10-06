/*
* @Author: Administrator
* @Date:   2017-09-19 13:36:26
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-19 17:08:25
*/
//兼容性：先判断document.getElementsByTagName("*");是否兼容--如果兼容，就用已经定义好的方
//--如果不兼容，先获取所有元素，再把它赋给新数组

	function getClass(classname,ranger){//默认值：传的是对象
		ranger=ranger?ranger:document;
		if(document.getElementsByClassName==false){
			return ranger.getElementsByClassName(classname);
		}else{
			let all=ranger.getElementsByTagName("*");
			let newarr=[];
			for(var i=0;i<all.length;i++){
				if(checkClass(all[i].className,classname)){//类名是否包含你要找的这个类名
					 newarr.push(all[i]);
				}			
			}
			return newarr;
		}
	}
	function checkClass(className,classname){
		let arr=className.split(" ");
		for(var i=0;i<arr.length;i++){
			if(arr[i]==classname){
				return true;
			}		
		}
		return false;
	}

/*$(select)  select是一个字符串
/^[a-z][a-z1-6]{0,7}$/.test(select)
^表示开头;
第一个[]表示第一位范围;
第二个[]表示第二位范围;
{}表示第二位字符串的长度范围;
test是正则的一个方法，用来判断select是否符合正则规则*/
	function $(select,ranger){
		ranger=ranger||document;
		let first=select.charAt(0);
		if(first=="."){
			return getClass(select.substring(1),ranger);
		}else if(first=="#"){
			return document.getElementById(select.substring(1));
		}else if(/^[a-z][a-z1-6]{0,7}$/.test(select)){
			return ranger.getElementsByTagName(select);
		}
	}

