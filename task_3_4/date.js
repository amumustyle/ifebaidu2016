function Nowdate(){
	var oTab=document.getElementById('tab');
	var oNowdate=document.getElementById('nowdate');
	var oSpan=document.getElementsByTagName('span');
	oTab.style.display='block';
    //获取当前日期
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth();
	var day=now.getDate();
	var firstday=new Date(year,month,01);
    var week=firstday.getDay();
    console.log(now.getDay());
    
    //显示当前日期
	oNowdate.innerHTML=year+"年"+(month+1)+"月";
	// 绘制表格
    drawTable(oTab);
    // 绘制并渲染日历
    drawCalendar(year,month,day,week);
    // 点击日期，返回所选日期
    backDate(oTab,year,month);

    for (var i=0;i<oSpan.length;i++) {
        oSpan[i].index=i;
        oSpan[i].onclick=function () {
          switch (this.index) {
          case 0:
                year--;
              break;
          case 1:
                month--;
              break;
          case 3:
                month++;
              break;
          case 4:
                year++;
              break;
          default:
              break;
            }
            // 判断年，月是否超限
            if (month<0) {
                year--; // 去年
                month=11; // 12月
            }
            if (month>11) {
              year++; // 明年
              month=0; // 1月
            }
            // if (year<1700 || year>8888) {
            //     year=2016;
            //     console.log("超过设置年限");
            // }
            firstday=new Date(year,month,01);
            week=firstday.getDay();        
            // 默认显示
            oNowdate.innerHTML=year+"年"+(month+1)+"月";
            // 绘制表格
            drawTable(oTab);
            // 绘制并渲染日历
            drawCalendar(year,month,day,week);
            // 点击日期，返回所选日期
            backDate(oTab,year,month);
        };
    }
}

// 绘制表格
function drawTable(oTab) {
    var tr,td;
    oTab.tBodies[0].innerHTML=" ";// 清除原有数据
    for (var i=0;i<6;i++) {
        tr=document.createElement("tr");
        oTab.tBodies[0].appendChild(tr);
        for (var j=0;j<=6;j++) {
            td=document.createElement("td");
            tr.appendChild(td);
            td.innerHTML="&nbsp;";
        }
    }
}

// 绘制并渲染日历  参数: 2016(年),3(四月),26(日),5(月初的星期)
function drawCalendar(year,month,day,week) {
    var atr=tab.tBodies[0].rows;
    var c=1;
    var i,j,k,n,last;

    // 绘制第一行
    for (j=week;j<=6;j++) {
        atr[0].cells[week+c-1].innerHTML=c;
        c++;
    }
    // 绘制剩余行
    for (i=1;i<6;i++) {
        for (j=0;j<=6;j++) {
        atr[i].cells[j].innerHTML=c;
        c++;
        }   
    } 
    
    // 判断单月(31)，双月(30) 二月, 0-11(一月到十二月)
    switch (month) {
    	case 1:
            if (year%400==0 || (year%4==0 && year%100!=0)) {
                last=29;// 闰年二月
            }
            else {
                last=28;// 平年二月
            }
            break;
        case 0://1
        case 2://3
        case 4://5
        case 6://7
        case 7://8
        case 9://10
        case 11://12
            last=31;// 单月
            break;
        case 3://4
        case 5://6
        case 8://9
        case 10://11
            last=30;// 双月
            break;
        default:
            break;
    }
    
    // 清除非法日期 并渲染当前日期
    for (k=0;k<atr.length;k++) {
        for (n=0;n<atr[k].cells.length;n++) {
           if (atr[k].cells[n].innerHTML>last) {
               atr[k].cells[n].innerHTML="&nbsp;";
           }
           else if (atr[k].cells[n].innerHTML==day) {
               atr[k].cells[n].style.color="#fff";
               atr[k].cells[n].style.background="#6fa3ff";  
           }
        }
    }    
        
}

// 点击日期，返回所选日期
function backDate(oTab,year,month) {
    var atr=oTab.tBodies[0].rows;
    var k,n;
    var selectdate;
    var oTab=document.getElementById('tab');
    var showdate=document.getElementById("date");

    showdate.value=null; // 初始化
    for (k=0;k<atr.length;k++) {
        for (n=0;n<atr[k].cells.length;n++) {
           atr[k].cells[n].onclick=function () {
               var d=this.innerHTML;
               if (d!="&nbsp;") {
                   selectdate=new Date(year,(month+1),d);
                   var select=selectdate.getFullYear()+"-"+
                   selectdate.getMonth()+"-"+
                   selectdate.getDate();
                   showdate.value=select;
                   oTab.style.display='none';
               }
           }
        }
    } 
}
//绑定事件
function myAddEvent(obj,sEvent,fn){
        if (obj.attachEvent) {
            obj.attachEvent('on'+sEvent,fn);
        }
        else{
            obj.addEventListener(sEvent,fn,false);
        }
    }
window.onload=function(){
	var oDate=document.getElementById('date');
	myAddEvent(oDate,"click",function(){Nowdate();});
}