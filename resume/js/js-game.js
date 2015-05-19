 var puzzle=document.getElementById("puzzle");
 var context=puzzle.getContext("2d"); 
 //����ͼƬ��������¼�����������ͼƬ����ʱ������drawTiles����
 var img=new Image();
 img.src="img/game.png";
 img.addEventListener('load',drawTiles,false);
 var boardSize=document.getElementById('puzzle').width;//������Ŀ��
 var tileCount=3;
 var tileSize=boardSize/tileCount;//����Сƴͼ�Ĵ�С
//��¼�������λ��
 var clickLoc=new Object;
 clickLoc.x=0;
 clickLoc.y=0;
 //��¼�հ׵�λ��
 var emptyLoc=new Object;
 emptyLoc.x=0;
 emptyLoc.y=0;
 //��¼�Զ��ƶ�ʱ��ͼƬ��Ҫ�ƶ���λ��
 var moveLoc=new Object;
 moveLoc.x=0;
 moveLoc.y=0;

 var solved=false;
 var boardParts;
 setBoard();
var Interval=null;
var toHtml;
var timer=null;
//˫������ҳ
puzzle.ondblclick=function(e)
{
 clearTimeout(timer);
 clickLoc.x=Math.floor((e.pageX-this.offsetLeft)/tileSize);
 clickLoc.y=Math.floor((e.pageY-this.offsetTop)/tileSize);
 toHtml=boardParts[clickLoc.x][clickLoc.y].src;
// window.location.href="resume.html"+"?backurl="+window.location.href+"&anchor="+toHtml; 
 window.location.href="resume.html"+"?anchor="+toHtml+"&backurl="+window.location.href;
}
 //��������ͼƬ�ƶ�
puzzle.onclick=function(e)
 {
	 clickLoc.x=Math.floor((e.pageX-this.offsetLeft)/tileSize);
	 clickLoc.y=Math.floor((e.pageY-this.offsetTop)/tileSize);
	  clearTimeout(timer);
      //�����¼���ʱ300ms����
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
 //����Ƴ����壬ɾ����ʱ��
puzzle.onmouseover=function()
 {
	 clearInterval(Interval);
	 Interval=null;
 }
 //������뻭�壬���ö�ʱ�����ƶ����任��ͼƬ
 puzzle.onmouseout=function()
 {
	 Interval=setInterval(autoSlide,1000);
 }

//�������壬�ö�ά�����ʾ�ָ�ͼƬ��λ������
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
     //ʵ��ͼƬ�й��ɵ������ƶ���Ч��
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

//��ͼƬ�ָ������Ӧ��λ����
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

//������ͼƬ��հ�λ�õľ��Ծ���
 function distanceABS(x1,y1,x2,y2)
 {
	 return Math.abs(x1-x2)+Math.abs(y1-y2);
 }
 //��¼�հ�λ��
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
 //���ƴͼ�Ƿ���ȷ
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