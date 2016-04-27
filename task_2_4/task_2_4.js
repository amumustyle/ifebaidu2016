/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var oCity = document.getElementById('aqi-city-input').value;
	var oValue = document.getElementById('aqi-value-input').value;

	var RegCity = /^[A-Za-z\u4e00-\u9fa5]{0,}$/;//城市名必须为中英文字符
	var RegValue = /^[0-9]{0,}$/;//空气质量指数必须为整数
	var Regblank = /^\s+|\s+$/g;  // 删除字符串两侧的空白字符

	var oCityV = oCity.replace(Regblank,'');
	var oValueV =oValue.replace(Regblank,'');
    
    if (oCity==""||!RegCity.test(oCityV)) {
    	alert('请输入中英文字符的城市名');
    	return false;
    }
    else if (oValue==""||!RegValue.test(oValueV)) {
    	alert('请输入整数的空气质量指数');
    	return false;
    }
    console.log(oCityV,oValueV);//测试两侧是否存在空白字符
    aqiData[oCityV] = oValueV;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var oList = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var oCity in aqiData) {
        oList += "<tr><td>" + oCity + "</td><td>" + aqiData[oCity] + "</td><td><button>删除</button></td></tr>";
    }
    document.getElementById('aqi-table').innerHTML = oList;

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var OAqiList = this.sTarget.parentNode.parentNode.childNodes[0].innerHTML;
  delete aqiData[OAqiList];
  console.log('删除');
  renderAqiList();
}

//兼容的事件函数
function myAddEvent(obj,sEvent,fn){
        if (obj.attachEvent) {
            obj.attachEvent('on'+sEvent,fn);
        }
        else{
            obj.addEventListener(sEvent,fn,false);
        }
    }

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var oBtn=document.getElementById('add-btn');
  var oTab=document.getElementById('aqi-table');
  var oBtn1=oTab.getElementsByTagName('button');

  myAddEvent(oBtn,"click", addBtnHandle);
  myAddEvent(oTab,"click", function(e){
    sTarget=e.target||e.srcElement;//捕获当前事件作用的对象兼容处理
  	console.log(sTarget.tagName);
  	if (sTarget.tagName=='BUTTON') //捕获活动标记名称BUTTON
  	{
  		delBtnHandle();
  	}
  });
  
}

init();