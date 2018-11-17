// 保存定时时间
var time = 0;
// 设置是否暂停的标识，true表示暂停
var pause = true;
// 设置定时函数
var setTimer;
// 创建一个数组，保存游戏大盒子装的小盒子
var arr = new Array(10);
// 数组每一项表示每一个小盒子能移动的位置
var arrSort = new Array(
		[0], //第一个元素不使用
		[2,4], // 表示编号为1的小盒子能移动的位置，以下都是如此
		[1,3,5],
		[2,6],
		[1,5,7],
		[2,4,6,8],
		[3,5,9],
		[4,8],
		[5,7,9],
		[6,8]
	);
// 没一个小盒子的位置坐标
var arrPosXY = new Array(
		[0], // 第一个元素不使用
		[0,0], // 第一个参数表示top，第二个参数表示left
		[0,150],
		[0,300],
		[150,0],
		[150,150],
		[150,300],
		[300,0],
		[300,150],
		[300,300]
	);
// 一共只有8块小盒子，按找顺序排好，第9块没有所以用0表示
arr[1] = 1;
arr[2] = 2;
arr[3] = 3;
arr[4] = 4;
arr[5] = 5;
arr[6] = 6;
arr[7] = 7;
arr[8] = 8;
arr[9] = 0;

// 定义移动小盒子的函数
var move = function(id) {
	// for循环,找到小盒子的位置
	for (var i = 1; i < 10; i++) {
		if(arr[i] === id) {
			break;
		}
	}
	// 申明小盒子可以去的编号，0表示不能移动
	var goArr = 0;
	goArr = whereTo(i);
	if(goArr !== 0) {
		arr[i] = 0;
		arr[goArr] = id;
		document.getElementById("d" + id).style.left = arrPosXY[goArr][1] + "px";
		document.getElementById("d" + id).style.top = arrPosXY[goArr][0] + "px";				
	}
	// 假设游戏完成，true表示完成
	var flag = true;
	for (var j = 1; j < 9; j++) {
		if(arr[j] !== j) {
			flag = false;
			break;
		}
	}
	if(flag === true) {
		if(!pause) {
			start();
			alert("congratulation");
		}
	}
}
var whereTo = function(wt) {
	var k = 0;
	var moveFlag = false;
	for(k = 0; k < arrSort[wt].length; k++) {
		if(arr[arrSort[wt][k]] === 0) {
			moveFlag = true;
			break;
		}
	}
	if(moveFlag === true){
    return arrSort[wt][k];
  }else{
    return 0;
  }
}
// 定时函数，每一秒执行一次
var timer = function() {
	time += 1;
	var min = parseInt(time/60);
	var sec = time % 60;
	document.getElementById("timer").innerHTML = min + "分" + sec + "秒";
}

// 开始暂停函数
var start = function() {
	var pause = false;
	if (pause) {
		document.getElementById("start").innerHTML = "暂停";
		pause = flase;
		// 启动定时器
		setTimer = setInterval(timer, 1000);
	} else {
		document.getElementById("start").innerHTML = "开始";
		pause = true;
		clearInterval(setTimer);
	}
}

// 重置函数
var restart = function() {
	time = 0;
	randomArr();
	if(pause){
		start();
	}
}
var randomArr = function() {
	for (var i = 9; i > 1; i--) {
		var to = parseInt(Math.random() * (i - 1) + 1);
		if(arr[i] !== 0) {
			document.getElementById("d" + arr[i]).style.left = arrPosXY[to][1] + "px";
			document.getElementById("d" + arr[i]).style.top = arrPosXY[to][0] + "px";
		}
		if (arr[to] !== 0) {
			document.getElementById("d" + arr[to]).style.left = arrPosXY[i][1] + "px";
			document.getElementById("d" + arr[to]).style.top = arrPosXY[i][0] + "px";
		}
		var temp = arr[to];
		arr[to] = arr[i];
		arr[i] = temp;
	}
}
// 初始化函数，页面加载的时候调用重置函数，重新开始
window.onload = function() {
	restart();
}