/**
 * 创造浮出层组件
 * @mm {String} title 浮出层标题
 * @mm {String} content 浮出层内容
 * @mm {Function} confirmback 点击确定按钮后的回调函数
 */

function Surface(title,content,confirmback){
	var shade = document.createElement('div');//创建一个遮罩层
	shade.className = "shade";

	var surface = document.createElement('div');//创建一个浮出层
	surface.id = "surface";
	surface.innerHTML = "<header id='Header'>"+title+"</header><article><p>"+content+"</p></article><footer><button class='surface-button' id='cancel'>取消</button><button class='surface-button' id='confirm'>确定</button></footer>";
    
	shade.appendChild(surface);
	document.body.appendChild(shade);

	// 为遮罩绑定移除事件
    shade.addEventListener("click", function (ev) {
        var target = ev.target || ev.srcElement;
        // 目标点不在浮出层上关闭浮出层
        if(target === this){
            this.parentNode.removeChild(this);
        }
    });

	 // 为确定、取消按钮绑定事件
    document.getElementById("confirm").addEventListener("click", function () {
        shade.parentNode.removeChild(shade);
        confirmback();
    });
    document.getElementById("cancel").addEventListener("click", function () {
        shade.parentNode.removeChild(shade);
        
    });

    //拖拽
    var oheader = document.getElementById('Header');
	oheader.onmousedown = function(ev){
    		var oEvent = ev||event;

    		disX=oEvent.clientX-surface.offsetLeft;
    		disY=oEvent.clientY-surface.offsetTop;

    		document.onmousemove = function(ev){
    			var oEvent = ev||event;
    			//限制浮出层在可视区拖拽
                var l = oEvent.clientX-disX;
                var t = oEvent.clientY-disY;

                if (l<0) {
                    l=0;
                }
                else if (l>document.documentElement.clientWidth-surface.offsetWidth) {
                    l=document.documentElement.clientWidth-surface.offsetWidth;
                }

                if (t<0) {
                    t=0;
                }
                else if (t>document.documentElement.clientHeight-surface.offsetHeight) {
                    t=document.documentElement.clientHeight-surface.offsetHeight;
                }

    			surface.style.left = l+'px';
    			surface.style.top = t+'px';
    		}

    		document.onmouseup = function(){
    			document.onmousemove=null;
    			document.onmouseup=null;
    		}

            return false;// 阻止浏览器默认事件，兼容火狐
    	}

	return shade;
}

document.querySelector("#showSurface").addEventListener("click", function () {
    Surface("这是一个浮出层","浮出层内容区",function () {},function () {});
});