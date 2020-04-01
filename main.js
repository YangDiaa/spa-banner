var $banner = (function(){
    var $html = $(''
      +'<div class="slider" id="slider">'
        +'<div class="slide"><img src="img/b5.png" alt=""></div>'
        +'<div class="slide"><img src="img/b1.png" alt=""></div>'
        +'<div class="slide"><img src="img/b2.png" alt=""></div>'
        +'<div class="slide"><img src="img/b3.png" alt=""></div>'
        +'<div class="slide"><img src="img/b4.png" alt=""></div>'
        +'<div class="slide"><img src="img/b5.png" alt=""></div>'
        +'<div class="slide"><img src="img/b1.png" alt=""></div>'
      +'</div>'
      +'<span id="left"><</span>'
      +'<span id="right">></span>'
      +'<ul class="nav" id="navs">'
        +'<li>1</li>'
        +'<li>2</li>'
        +'<li>3</li>'
        +'<li>4</li>'
        +'<li>5</li>'
      +'</ul>');
  var $navList = $html.find('li');
  var timer,container,time,left,right;
  var index = 1; //打开页面生效的图片下标为1
  var isMoving = false;
  var cfg = {
      container:'body',
      time: 3000
  }

  function next() {
    if(isMoving) {
      return;
    }
    isMoving = true;
    index++;
    navmove();
    animate(slider,{
      left: -1200*index
    },function() {
      if(index == 6) {
        slider.style.left = '-1200px';
        index = 1;
      }
      isMoving = false;
    });
  }
  
  function prev() {
    if(isMoving) {
      return;
    }
    isMoving = true;
    index--;
    navmove();
    animate(slider,{
      left: -1200*index
    },function() {
      if(index == 0) {
        slider.style.left = '-6000px';
        index = 5;
      }
      isMoving = false;
    });
  }
  //按钮点击切换事件
  function navClick(){
    for(var i = 0; i < $navList.length; i++) {
      $navList[i].index = i;
      $navList[i].onclick = function() {
        index = this.index + 1;
        navmove();
        animate(slider,{ left: -1200*index });
      }
    }
  }
    
  //图片切换时按钮样式跟着切换
  function navmove() {
    for(var i = 0; i < $navList.length; i++) {
      $navList[i].className = "";
    }
    if(index > 5) {
      $navList[0].className = "active";
    } 
    else if(index <= 0) {
      $navList[4].className = "active";
    } 
    else{
      $navList[index - 1].className = "active";
    }
  }
  
  function getStyle(obj,attr) { //返回值带有单位px
    if(obj.currentStyle) {
      return obj.currentStyle[attr];
    } 
    else{
      return getComputedStyle(obj,null)[attr];
    }
  }
  
  function animate(obj,json,callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var flag = true;
      for(var attr in json) {
        (function(attr) {
          if(attr == "opacity") {
            var now = parseInt(getStyle(obj, attr) * 100);
            var dest = json[attr] * 100;
          } 
          else{
            var now = parseInt(getStyle(obj, attr));
            var dest = json[attr];
          }
          var speed = (dest - now) / 6;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          if(now != dest) {
            flag = false;
            if(attr == "opacity") {
              obj.style[attr] = (now + speed) / 100;
            } 
            else{
              obj.style[attr] = now + speed + "px";
            }
          }
        })(attr);
      }
      if(flag) {
        clearInterval(obj.timer);
        callback && callback(); //如果回调函数存在，就调用回调函数
      }
    }, 30);
  }
  
  function show(conf){
    $.extend(cfg,conf);
    container = $(cfg.container);
    time = cfg.time;
    container.append($html);
    $navList[0].className = "active";
    navClick();
    
    container.mouseover(function() {
      animate(left,{opacity: 0.6});
      animate(right,{opacity: 0.6});
      clearInterval(timer); 
    });

    container.mouseout(function () {
      animate(left,{opacity: 0});
      animate(right,{opacity: 0});
      timer = setInterval(next, time); 
    });
      
    timer = setInterval(next, time);
    left = document.getElementById('left');
    right = document.getElementById('right');
    
    left.onclick = prev;
    right.onclick = next;
  }
  return{
    show:show
  }
}())