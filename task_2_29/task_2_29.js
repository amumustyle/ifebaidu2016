
function btnHandle() {
	
	var oname1 = document.getElementById('name1');
	var oname2 = document.getElementById('name2');

    var Regchinese = /[\u4E00-\u9FA5]/g;//汉字
    var regochinese = /[^\u4E00-\u9FA5\uf900-\ufa2d]/g; //匹配非中文
    var Regblank = /^\s+|\s+$/g;  // 删除字符串两侧的空白字符

    // 计算中文字符长度
    var source = oname1.value;
    var otemp = source.replace(Regblank,'').replace(Regchinese, '');
    var itxt = otemp.length;

    // 计算非中文字符长度
    var temp = source.replace(Regblank,'').replace(regochinese,''); 
    var txt = temp.length;

    //中文和非中文加起来总字符数
    var otxt = txt + itxt;

	if (otxt==0) {
		oname1.style.border = "solid 2px #DE0012";
		oname2.innerHTML = "姓名不能为空";
		oname2.style.color = "#DE0012";
	}else {
		if (otxt>=4 && otxt<=16) {
			oname1.style.borderColor = "green";
 		    oname2.innerHTML = "名称格式正确";
 		    oname2.style.color = "green";
		
	}else{	
 		oname2.innerHTML = "必填，长度为4~16个字符";
		oname1.style.border = "solid 2px #DE0012";
		oname2.style.color = "#DE0012";
        }
	}
}
