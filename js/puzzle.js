var diamonds = {
    "0": {
        id: 1,
        direct: [2, 4],
        pos: [0, 0]
    },
    "1": {
        id: 2,
        direct: [1, 3, 5],
        pos: [150, 0]
    },
    "2": {
        id: 3,
        direct: [2, 6],
        pos: [300, 0]
    },
    "3": {
        id: 4,
        direct: [1, 5, 7],
        pos: [0, 150]
    },
    "4": {
        id: 5,
        direct: [2, 4, 6, 8],
        pos: [150, 150]
    },
    "5": {
        id: 6,
        direct: [3, 5, 9],
        pos: [300, 150]
    },
    "6": {
        id: 7,
        direct: [4, 8],
        pos: [0, 300]
    },
    "7": {
        id: 8,
        direct: [5, 7, 9],
        pos: [150, 300]
    },
    "8": {
        id: 9,
        direct: [6, 8],
        pos: [300, 300]
    }
}

var timeId;
var sec = 0;
var min = 0;
var arr = [];
var push = false;

//格子随机排列函数
function random() {
    //一个随机数组，开始前清空数组
    arr = [];
    //随机数循环
    for (var i = 0; i < 8; i++) {
        var num = parseInt(Math.random() * 9);
        if (arr.indexOf(num) === -1) {
            arr.push(num);
        } else {
            i--;
        }
    }
    //修改格子位置
    for (var j = 0; j < arr.length; j++) {
        let ele = document.getElementById("d" + (j + 1))
        ele.style.left = diamonds[arr[j]].pos[0] + "px";
        ele.style.top = diamonds[arr[j]].pos[1] + "px";
    }
}

//移动函数
function move(id) {
    var space = 0;
    //找到实际点击的格子的序号0-8
    var pos = arr[parseInt(id) - 1];
    //找到空白的格子，也就是数组中不存在的序号
    for (var i = 0; i <= arr.length; i++) {
        if(arr.indexOf(i) === -1){
            space = i;
            break;
        }  
    }
    //判断当前点击格子是不是往空白盒子可走
    var direct = diamonds[space].direct;
    
    for (var j = 0; j < direct.length; j++) {
       if(pos === (direct[j] - 1)){
        document.getElementById("d" + id ).style.left = diamonds[space].pos[0] + "px";
        document.getElementById("d" + id ).style.top = diamonds[space].pos[1] + "px";
        arr[id - 1] = space;//arr的index对应格子的id-1
        break;
       }
    }
    //格子全部归位判断
    var complate = true;

    for (var n = 0; n < 8; n++) {
        if(arr[n] != n){
            complate = false;
            break;
        }
    }

    if (complate) {
        alert("恭喜完成，游戏结束")
        reset();
    }
}


function timer() {
    timeId = setInterval(function() {
        sec = sec + 1;
        if (sec === 60) {
            min = min + 1;
            sec = 0;
        }
        document.getElementById("timer").innerHTML = min + "分" + sec + "秒";
    }, 1000);
}

//开始函数，判断暂停
function start() {
    if (!push) {
        document.getElementById("start").innerHTML = "暂停计时";
        document.getElementById("game").className = "";
        timer();
        push = true;
    } else if (push) {
        document.getElementById("start").innerHTML = "开始计时";
        document.getElementById("game").className = "dispointer";
        clearInterval(timeId);
        push = false;
    }
}
//复位函数
function reset() {
    sec = 0;
    min = 0;
    push = false;
    clearInterval(timeId);
    document.getElementById("timer").innerHTML = "0分0秒";
    document.getElementById("start").innerHTML = "开始计时";
    document.getElementById("game").className = "dispointer";
    random();
}


for (var n = 1; n < 9; n++) {
    document.getElementById("d" + n).onclick = function() {
        move(this.innerHTML);
    }
}

document.getElementById("start").onclick = function() {
    start();
}

document.getElementById("reset").onclick = function() {
    reset();
}

window.onload = function() {
    reset();
}
