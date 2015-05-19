 var puzzle=document.getElementById("puzzle");
 var context=puzzle.getContext("2d"); 
 //设置图片，并添加事件监听器，当图片导入时，触发drawTiles方法
 var img=new Image();
 img.src="img/game.png";
 img.addEventListener('load',drawTiles,false);
 var boardSize=document.getElementById('puzzle').width;//获得面板的宽度
 var tileCount=3;
 var tileSize=boardSize/tileCount;//计算小拼图的大小
//记录鼠标点击的位置
 var clickLoc=new Object;
 clickLoc.x=0;
 clickLoc.y=0;
 //记录空白的位置
 var emptyLoc=new Object;
 emptyLoc.x=0;
 emptyLoc.y=0;
 //记录自动移动时，图片将要移动的位置
 var moveLoc=new Object;
 moveLoc.x=0;
 moveLoc.y=0;

 var solved=false;
 var boardParts;
 setBoard();
var Interval=null;
var toHtml;
var timer=null;
//双击打开网页
puzzle.ondblclick=function(e)
{
 clearTimeout(timer);
 clickLoc.x=Math.floor((e.pageX-this.offsetLeft)/tileSize);
 clickLoc.y=Math.floor((e.pageY-this.offsetTop)/tileSize);
 toHtml=boardParts[clickLoc.x][clickLoc.y].src;
// window.location.href="resume.html"+"?backurl="+window.location.href+"&anchor="+toHtml; 
 window.location.href="resume.html"+"?anchor="+toHtml+"&backurl="+window.location.href;
}
 //单击进行图片移动
puzzle.onclick=function(e)
 {
	 clickLoc.x=Math.floor((e.pageX-this.offsetLeft)/tileSize);
	 clickLoc.y=Math.floor((e.pageY-this.offsetTop)/tileSize);
	  clearTimeout(timer);
      //单击事件延时300ms触发
     timer = setTimeout(function(){
	  if(distanceABS(clickLoc.x,clickLoc.y,emptyLoc.x,emptyLoc.y)==1)
	 {
      slideTile(emptyLoc,clickLoc);
	  drawTiles();
	 }
	 if(solved)
	 {
	 setTimeout(function(){alert("You are amazing");},100);
	 setBoard();
     drawTiles();
	 }
	 },300);  
 }
 //鼠标移出画板，删除定时器
puzzle.onmouseover=function()
 {
	 clearInterval(Interval);
	 Interval=null;
 }
 //鼠标移入画板，设置定时器，移动（变换）图片
 puzzle.onmouseout=function()
 {
	 Interval=setInterval(autoSlide,1000);
 }

//创建画板，用二维数组表示分割图片的位置坐标
function setBoard()
 {
  boardParts=new Array(tileCount);
  for(var i=0;i<tileCount;++i)
	 {
		 boardParts[i]=new Array(tileCount);
		 for(var j=0;j<tileCount;++j)
		 {
			 boardParts[i][j]=new Object;
			 boardParts[i][j].x=(tileCount-1)-i;
			 boardParts[i][j].y=(tileCount-1)-j;
		 }
	 }
	 emptyLoc.x=boardParts[tileCount-1][tileCount-1].x;
	 emptyLoc.y=boardParts[tileCount-1][tileCount-1].y;
	 solved=false;
 }
     //实现图片有规律的自由移动的效果
     function autoSlide()
      {
		    
		    if(emptyLoc.x<tileCount-1&&emptyLoc.y==0)
			{
              moveLoc.x=emptyLoc.x+1;
			  moveLoc.y=0;
			}else if(emptyLoc.x==tileCount-1&&emptyLoc.y<tileCount-1)
			{
              moveLoc.x=2;
			  moveLoc.y=emptyLoc.y+1;
			}else if(emptyLoc.x>0&&emptyLoc.y==tileCount-1)
			{
			  moveLoc.x=emptyLoc.x-1;
              moveLoc.y=tileCount-1;    
			}else if(emptyLoc.x==0&&emptyLoc.y>0)
			{
              moveLoc.x=0;
              moveLoc.y=emptyLoc.y-1;  
			}
			 slideTile(emptyLoc,moveLoc);
	         drawTiles();
			 if(solved)
		     {
				setTimeout("",500);
                setBoard();
                drawTiles();
			 }

		
	 }

//将图片分割放在相应的位置上
 function drawTiles()
	 {
     context.clearRect(0,0,boardSize,boardSize);
	 for(var i=0;i<tileCount;++i)
		 {
			 for(var j=0;j<tileCount;++j)
			 {
                var x=boardParts[i][j].x;
				var y=boardParts[i][j].y;
				boardParts[i][j].src=x+"_"+y;
				if(i!=emptyLoc.x||j!=emptyLoc.y||solved==true){
                     context.drawImage(img,x*tileSize,y*tileSize,tileSize,tileSize,i*tileSize,j*tileSize,tileSize,tileSize);
					}
			 }
		 }
	 }

//计算点击图片与空白位置的绝对距离
 function distanceABS(x1,y1,x2,y2)
 {
	 return Math.abs(x1-x2)+Math.abs(y1-y2);
 }
 //记录空白位置
 function slideTile(toLoc,fromLoc)
 {
  if(!solved)
	 {
       boardParts[toLoc.x][toLoc.y].x=boardParts[fromLoc.x][fromLoc.y].x;
	   boardParts[toLoc.x][toLoc.y].y=boardParts[fromLoc.x][fromLoc.y].y;
	   boardParts[fromLoc.x][fromLoc.y].x=tileCount-1;
	   boardParts[fromLoc.x][fromLoc.y].y=tileCount-1;
	   toLoc.x=fromLoc.x;
	   toLoc.y=fromLoc.y;
	   checkSolved();
	 }
 }
 //检查拼图是否正确
 function checkSolved()
 {
	 var flag=true;
	 for(var i=0;i<tileCount;++i)
	 {
		 for(var j=0;j<tileCount;++j)
		 {
           if(boardParts[i][j].x!=i||boardParts[i][j].y!=j)
			 {
                  flag=false;
			 }
		 }
	 }
       solved=flag;
	 }
	 window.onload=function(){Interval=setInterval(autoSlide,1000)};