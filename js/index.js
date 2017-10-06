window.onload=function(){
	let aside=$(".beside")[0];
	let ul=$("ul",aside)[0];
	// console.log(ul)
	let lis=$("li",ul);

	let rul=$(".beside-right");

	let baotu=$(".banner-bottom")[0];
	let tulis=$("li",baotu);
	let dians=$(".quan"); 

	let dirL=$(".left-direct")[0];
	let dirR=$(".right-direct")[0];
	let ban=$(".banner")[0];
	let wid=parseInt(getComputedStyle(ban,null).width);
	// console.log(dirR);
	let now=0;
	let next=0;
	//console.log(tulis.length);

	//console.log(lis);

/////////////////////////////////////////////////////////侧导航
	for(let i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			rul[i].style.display="block";
			//animate(rul[i],{display:"block"});
		}
		lis[i].onmouseout=function(){
			rul[i].style.display="none";
			//animate(rul[i],{display:"none"});
		}
	}

///////////////////////////////////////////////////////////////自动轮播：时间函数
	/*
	next 初始位置(width,0)
	
	动画：
		now  (0,0)  ->  (-width,0)
		next (width,0)  ->  (0,0)

	更新下标：
		now=next
	 */	
	let t;
	t=setInterval(move, 3000);

	function move(){
		next++;
		if(next==tulis.length){
			next=0;
			//move();
		}
		dians[now].style.background="gray";
		dians[next].style.background="#fff";
		tulis[next].style.left=`${wid}px`;//wid+"px"
		animate(tulis[now],{left:-wid});//json对象不用加单位,animate.js内部已经处理了
		animate(tulis[next],{left:0},function(){//动画结束后flag=true
			flag=true;
		});
		now=next;
	}
		
	function moveL(){
		// if(now==0){
		// 	return;
		// }
		
		next--;
		if(next==-1){
			next=tulis.length-1;
			//move();
		}
		dians[now].style.background="gray";
		dians[next].style.background="#fff";
		tulis[next].style.left=`${-wid}px`;//`${wid}px`
		animate(tulis[now],{left:wid});//json对象不用加单位,animate.js内部已经处理了
		animate(tulis[next],{left:0},function(){//动画结束后flag=true
			flag=true;
		});
		now=next;
	}

/////////////////////////////////////////鼠标移入时：不动；移出时：动
	ban.onmouseover=function(){
		clearInterval(t);
	}
	ban.onmouseout=function(){
		t=setInterval(move, 3000);
	}
////////////////////////////////////////点击左右按钮变
	let flag=true;
	dirR.onclick=function(){	
		/*if(flag){
			move();
			flag=false;
		}*/
		if(!flag){
			return;
		}
		move();
		flag=false;
	}

	dirL.onclick=function(){
		if(!flag){
			return;
		}
		moveL();
		flag=false;
	}
/////////////////////////////////////////////////////轮播图：点圆点出现相应的图片

	for(let i=0;i<tulis.length;i++){
		/*dians[i].onmouseover=function(){
			animate(dians[i],{background:"gray"});
		}*/
		dians[i].onclick=function(){
			// now++; 
			if(now==i){
				return;
			}
			dians[now].style.background="gray";
			dians[i].style.background="#fff";
			tulis[i].style.left=`${wid}px`;//`${wid}px`
			animate(tulis[now],{left:-wid});//json对象不用加单位,animate.js内部已经处理了
			animate(tulis[i],{left:0},function(){//动画结束后flag=true
				flag=true;
			});
			now=next=i;
		}
		
	}
////////////////////////////////////////////////////////////////小米明星单品
	let starBon=$(".star-top-right")[0];
	let fyL=$(".kuai",starBon)[0];
	let fyLi=$("i",fyL)[0];
	let fyR=$(".kuai-1",starBon)[0];
	let fyRi=$("i",fyR)[0];
	let star=$(".star")[0];
	let pic=$("ul",star)[0];
	let liP=$("li",pic);
	let widS=parseInt(getComputedStyle(star,null).width);//1226
	let widP=parseInt(getComputedStyle(pic,null).width);//2452

	pic.innerHTML+=pic.innerHTML;
	pic.style.width=`${widP*2}px`;
	let i=0;
	fyRi.onclick=function(){
		//pic.style.transiton="all 0.5s";
		//pic.style.transform=`translateX(-${widS}px)`;
		//yidong();
		if(pic.offsetLeft==(`${i*-widS}`)){
			if(i==3){
				return;//终止函数执行，return后面的代码都不会执行
			}
			i++;
			//console.log(i);
			animate(pic,{left:`${-widS*i}`});
		}
	}
	fyLi.onclick=function(){
		//yidong();
		if(pic.offsetLeft==(`${-widS*i}`)){
			if(i==0){
				return;
			}
			i--;
			//console.log(i);
			animate(pic,{left:`${-widS*i}`});
		}
	}	
	
	
	//let t1=setInterval(yidong,3000);
	function yidong(){	
		if(pic.offsetLeft==(`${i*-widS}`)){
			/*if(i==3){
				return;
			}
			i++;
			console.log(i);*/
			i++;
			animate(pic,{left:`${-widS*i}`});
		}
		
		if(pic.offsetLeft==(`${-widS*3}`)){
			/*if(i==0){
				return;
			}
			i--;*/
			i--;
			animate(pic,{left:`${-widS*i}`});
		}
	}

//////////////////////////////////////////////////////////////////按需加载：滚动到哪块，再显示哪块
	/*
	按需加载：减少发送请求的次数
	楼层出现：
		innerHeight + scrollTop =offsetTop
	 */
	let winH=innerHeight;
	let floors=document.querySelectorAll(".floor");//nodelist
	let floorsArr=[];
	floors.forEach((element)=>{
		floorsArr.push(element.offsetTop);
	});
	// for(let i=0;i<floors.length;i++){
	// 	floorsArr.push(floors[i].offsetTop);
	// }
	window.onscroll=function(){
		// console.log(document.body.scrollTop);
		let scrolls=document.documentElement.scrollTop;//滚动的距离
		floorsArr.forEach((value,index)=>{
			if(winH+scrolls>=value+100){
				//let imgs=document.querySelectorAll(".imgF");
				let imgs=floors[index].getElementsByTagName("img");
				for(let i=0;i<imgs.length;i++){
					imgs[i].src=imgs[i].getAttribute("srcPath");
				}
				
			}
		})
	}

//////////////////////////////////////////////////////////////////////购物车
	let gouwu=$(".buy-box")[0];
	let gouwuZ=$(".buy")[0];
	let gouwuK=$(".buy-chu")[0];

	gouwu.onmouseover=function(){
		gouwuK.style.display="block";
		gouwuZ.style.color="#FF6700";
	}
	gouwu.onmouseout=function(){
		gouwuK.style.display="none";
		gouwuZ.style.color="#B0B0B0";
	}

//////////////////////////////////////////////////////////////////////导航
	let nav=$(".nav")[0];
	let nav_zi=$(".nav-zi")[0];
	let zi=$(".zi-center",nav_zi);
	let nav_chus=$(".nav-chu");
	// let chu_li=$("ul",nav_chus);console.log(chu_li);
	for(let i=0;i<zi.length;i++){
		zi[i].onmouseover=function(){
			nav_chus[i].style.display="block";
		}
		zi[i].onmouseout=function(){
			nav_chus[i].style.display="none";
		}
	}
///////////////////////////////////////////////////////////////内容
///////////////////////////////////////////////////////////////第一张
	let leftDJ=$(".content-bottom-left")[0];		
	let rightDJ=$(".content-bottom-right")[0];	
	let nei1=$(".hali-1")[0];
	let neilis=$("li",nei1);
	let haliW=nei1.offsetWidth;
	let nei_dians=$(".bottom-one-66")[0];
	// let nei_dian=document.querySelectorAll(".nei_dian");
	let nei_dian=$(".nei-dian");
	let next1=0;
	let now1=0;

	rightDJ.onclick=function(){		
		if(next1==neilis.length-1){
			return;
		}
		next1++;
		nei_dian[next1].style.background="#ff7010";
		nei_dian[now1].style.background="#B0B0B0";
		neilis[next1].style.left=`${haliW}px`;//wid+"px"
		animate(neilis[now1],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(neilis[next1],{left:0});
		now1=next1;
	}
	leftDJ.onclick=function(){		
		if(next1==0){
			return;
		}
		next1--;
		nei_dian[next1].style.background="#ff7010";
		nei_dian[now1].style.background="#B0B0B0";
		neilis[next1].style.left=`${-haliW}px`;//wid+"px"
		animate(neilis[now1],{left:haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(neilis[next1],{left:0});
		now1=next1;
	}

	for(let i=0;i<neilis.length;i++){
		nei_dian[i].onclick=function(){ 
			if(now1==i){
				return;
			}
			nei_dian[now1].style.background="#B0B0B0";
			nei_dian[i].style.background="#ff7010";
			neilis[i].style.left=`${haliW}px`;//`${wid}px`
			animate(neilis[now1],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
			animate(neilis[i],{left:0});
			now1=next=i;
		}
		
	}
/////////////////////////////////////////////////////////////第二张
	let MLbot=document.querySelector(".content-botton-left");
	let MRbot=document.querySelector(".content-botton-right");
	let MIUIs=document.querySelectorAll(".MIUI-first");
	let MIUI=document.querySelector(".MIUI-1");
	let MIUI_dian=document.querySelectorAll(".MIUI-dian");
	let next2=0;
	let now2=0;

	MRbot.onclick=function(){		
		if(next2==neilis.length-1){
			return;
		}
		next2++;
		MIUI_dian[next2].style.background="#ff7010";
		MIUI_dian[now2].style.background="#B0B0B0";
		MIUIs[next2].style.left=`${haliW}px`;//wid+"px"
		animate(MIUIs[now2],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(MIUIs[next2],{left:0});
		now2=next2;
	}
	MLbot.onclick=function(){		
		if(next2==0){
			return;
		}
		next2--;
		MIUI_dian[next2].style.background="#ff7010";
		MIUI_dian[now2].style.background="#B0B0B0";
		MIUIs[next2].style.left=`${-haliW}px`;//wid+"px"
		animate(MIUIs[now2],{left:haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(MIUIs[next2],{left:0});
		now2=next2;
	}

	for(let i=0;i<MIUIs.length;i++){
		MIUI_dian[i].onclick=function(){ 
			if(now2==i){
				return;
			}
			MIUI_dian[now2].style.background="#B0B0B0";
			MIUI_dian[i].style.background="#ff7010";
			MIUIs[i].style.left=`${haliW}px`;//`${wid}px`
			animate(MIUIs[now2],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
			animate(MIUIs[i],{left:0});
			now2=next2=i;
		}
		
	}

/////////////////////////////////////////////////////////////第三张
	let miyoubotL=document.querySelector(".miyou-botton-left");console.log(miyoubotL)
	let miyoubotR=document.querySelector(".miyou-botton-right");
	let miyous=document.querySelectorAll(".miyou-first");
	let miyou=document.querySelector(".miyou-1");
	let miyou_dian=document.querySelectorAll(".miyou-dian");
	let next3=0;
	let now3=0;

	miyoubotR.onclick=function(){		
		if(next3==miyous.length-1){
			return;
		}
		next3++;
		miyou_dian[next3].style.background="#ff7010";
		miyou_dian[now3].style.background="#B0B0B0";
		miyous[next3].style.left=`${haliW}px`;//wid+"px"
		animate(miyous[now3],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(miyous[next3],{left:0});
		now3=next3;
	}
	miyoubotL.onclick=function(){		
		if(next3==0){
			return;
		}
		next3--;
		miyou_dian[next3].style.background="#ff7010";
		miyou_dian[now3].style.background="#B0B0B0";
		miyous[next3].style.left=`${-haliW}px`;//wid+"px"
		animate(miyous[now3],{left:haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(miyous[next3],{left:0});
		now3=next3;
	}
	for(let i=0;i<miyous.length;i++){
		miyou_dian[i].onclick=function(){ 
			if(now3==i){
				return;
			}
			miyou_dian[now3].style.background="#B0B0B0";
			miyou_dian[i].style.background="#ff7010";
			miyous[i].style.left=`${haliW}px`;//`${wid}px`
			animate(miyous[now3],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
			animate(miyous[i],{left:0});
			now3=next3=i;
		}
		
	}


/////////////////////////////////////////////////////////////第三张
	let yingyongbotL=document.querySelector(".yingyong-botton-left");
	let yingyongbotR=document.querySelector(".yingyong-botton-right");
	let yingyongs=document.querySelectorAll(".yingyong-first");
	let yingyong=document.querySelector(".yingyong-1");
	let yingyong_dian=document.querySelectorAll(".yingyong-dian");
	let next4=0;
	let now4=0;

	yingyongbotR.onclick=function(){		
		if(next4==yingyongs.length-1){
			return;
		}
		next4++;
		yingyong_dian[next4].style.background="#ff7010";
		yingyong_dian[now4].style.background="#B0B0B0";
		yingyongs[next4].style.left=`${haliW}px`;//wid+"px"
		animate(yingyongs[now4],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(yingyongs[next4],{left:0});
		now4=next4;
	}
	yingyongbotL.onclick=function(){		
		if(next4==0){
			return;
		}
		next4--;
		yingyong_dian[next4].style.background="#ff7010";
		yingyong_dian[now4].style.background="#B0B0B0";
		yingyongs[next4].style.left=`${-haliW}px`;//wid+"px"
		animate(yingyongs[now4],{left:haliW});//json对象不用加单位,animate.js内部已经处理了
		animate(yingyongs[next4],{left:0});
		now4=next4;
	}

	for(let i=0;i<yingyongs.length;i++){
		yingyong_dian[i].onclick=function(){ 
			if(now4==i){
				return;
			}
			yingyong_dian[now4].style.background="#B0B0B0";
			yingyong_dian[i].style.background="#ff7010";
			yingyongs[i].style.left=`${haliW}px`;//`${wid}px`
			animate(yingyongs[now4],{left:-haliW});//json对象不用加单位,animate.js内部已经处理了
			animate(yingyongs[i],{left:0});
			now4=next4=i;
		}
		
	}





}

