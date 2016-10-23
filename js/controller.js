// 点击图标的动作
$('.logo').on('dblclick',function(){
	$('.wrap').css('display','block');
})

/******拖拽部分*******/

// 阻止冒泡(元素拖拽) 
$('.main').mousedown(function(ev){
	ev.stopPropagation();
})

// 拖拽小图标
var logo = new Drag('logo');
logo.init();
addEvent(logo,'按下',function(){});
addEvent(logo,'移动',function(){});
addEvent(logo,'抬起',function(){});

// 拖拽小图标
var wrap = new Drag('wrap');
wrap.init();
addEvent(wrap,'按下',function(){});
addEvent(wrap,'移动',function(){});
addEvent(wrap,'抬起',function(){});


/******调整窗口大小部分*******/


/*******调整窗口大小部分end***********/
/********渲染数据********/
/*左边清单*/
fff();
function fff(){
	var leftData = '<%for(var i=0;i<collection_list.length;i++){%>\
						<li class="collection_item" id="<%=collection_list[i].id%>">\
		 					<a href="javascript:;">\
		 						<i class="iconfont"><%=collection_list[i].icon%></i>\
		 						<span class="task-title"><%=collection_list[i].title%></span>\
		 						<p class="num">\
			 						<%if(collection_list[i].num2){%>\
										<span class="task-num task-num2"><%=collection_list[i].num2%></span>\
									<%}%>\
									<%if(collection_list[i].num1){%>\
										<span class="task-num 	task-num1"><%=collection_list[i].num1%></span>\
			 						<%}%>\
		 						<span class="pen"><i class="iconfont">&#xe61f;</i></span>\
		 						</p>\
		 					</a>\
		 				</li>\
		 			<%}%>';

	var listHtml = template.render(leftData)(data);
	$('#lists-collection').html(listHtml);
}
/**********渲染数据end**************/


/****点击左边的任何一个列表（task）******/
// 点击的时候要把对应li里的文字要写到右边栏的顶部标题里面
$('.task').on('click','li',function(){
	var title = $(this).find('.task-title').html();
	$('.list-toolbar .title').html(title);
})

/****点击左边的任何一个列表end******/
/********每个清单下面的任务*********/
var collectionId = 1;
$('.lists-collection').on('click','.collection_item', function() {
	// 实例化对象把localstorage里的数据先放到data数据里面
	var t1 = new Data('task_list');
	t1.get();

	// 点击每一个清单的时候显示编辑的图标（铅笔），其他的编辑图标隐藏,清单的背景颜色改变
	var pen = $(this).find('.pen');
	if(pen.hasClass('active')){
		pen.removeClass('active');
	}else{
		pen.addClass('active');
	}
	$(this).siblings('li').find('.pen').removeClass('active');
	$(this).css('background','#e0eefa').siblings('li').css('background','');
	$(this).find('.task-num1').css('background','rgba(215,78,72,0.8)').css('color','#f7f7f7');
	$(this).siblings('li').find('.task-num1').css('background','').css('color','');
	$(this).find('.task-num2').css('color','rgba(38,38,38,0.75)');
	$(this)	.siblings('li').find('.task-num2').css('color','');
	collectionId = Number(this.id);
	
	// 点击左边的清单的时候调用xrsj()函数，显示被点击的清单的相关任务
	xrsj(collectionId);
})
/********每个清单下面的任务end********/
$('.lists-collection').on('updateCount','.collection_item', function(event) {
	count = 1111; // jisuan
	console.log('event');
});
// 点击未完成任务的check项
/*
	1.找到被点击的任务的自定义属性id
	2.在把数据里所有的任务项（data.task_list）循环一遍
	3.从里面过滤出id跟自定义属性的id值相同的项，如果相同就把对应的complete改为true
	4.再把本次清单的任务重新渲染一遍
*/
// 用事件委托
$('.task-list').on('click', '.checkbox', function(ev) {
	var Id = ev.target.closest('li').id;
	var t1 = new Data('collection_list');
	t1.replace(collectionId);
	var t2 = new Data('task_list');
	t2.replace(Id);
	xrsj(collectionId);
	$('.collection_item[id='+ Id +']').trigger('updateCount');
});

// 点击已完成任务的check项
/*
	1.找到被点击的任务的自定义属性id
	2.在把数据里所有的任务项（data.task_list）循环一遍
	3.从里面过滤出id跟自定义属性的id值相同的项，如果相同就把对应的complete改为false
	4.再把本次清单的任务重新渲染一遍
*/
// 用事件委托
$('.comp-tasks').on('click','.checkbox',function(ev){
	var Id = ev.target.closest('li').id;
	var t2 = new Data('task_list');
	t2.replace(Id);
	xrsj(collectionId);
});


/********渲染右边任务的数据*******/
function xrsj(collectionId){
	var listFalse = [];
	var listTrue = [];
	$.each(data.task_list, function(i, task) {
		if(collectionId === task.collection_id){
			// 未完成任务
			if(!task.complete){
				var html = '\
							<li id='+task.id+'>\
								<a href="javascript:;" class="checkbox">\
									<i class="iconfont">&#xe60e;</i>\
								</a>\
								<div class="task-wraper">\
									<span>'+ task.content +'</span>\
								</div>\
								<div class="boxs">\
									<i class="icon iconfont">'+ task.subtask +'</i>\
									<span class="time">'+ task.time +'</span>\
									<a href="javascript:;" class="star">\
										<i class="iconfont">'+ task.star +'</i>\
									</a>\
								</div>\
							</li>';
				listFalse.push(html)	
			}else{
				// 已完成任务
				var html = '\
							<li id='+task.id+'>\
								<a href="javascript:;" class="checkbox">\
									<i class="iconfont">&#xe60d;</i>\
								</a>\
								<div class="task-wraper">\
									<span>'+ task.content +'</span>\
								</div>\
								<div class="boxs">\
									<i class="icon iconfont">'+ task.subtask +'</i>\
									<span class="time">'+ task.time +'</span>\
									<a href="javascript:;" class="star">\
										<i class="iconfont">'+ task.star +'</i>\
									</a>\
								</div>\
							</li>';
				listTrue.push(html)
			}	
		}
	});
	$('.task-list').html(listFalse.join(''));
	$('.comp-tasks').html(listTrue.join(''));


	



}
/********渲染右边任务的数据end*******/
	
/******点击已完成任务********/
$('.comp-btn').on('click',function(){
	if($('.comp-tasks').hasClass('active')){
		$('.comp-tasks').removeClass('active');	
	}else{
		$('.comp-tasks').addClass('active');	
	}	
})
// *****点击已完成任务end*******


/******** 创建清单的部分********/

//当点击创建清单
var create = true; //控制按扭的点击次数，只有一次
var nId = 0;  //代表每条清单的id
$('.createlist').on('click',function(){
	if(create){
		var newList = '<li class="collection_item" id="">\
	 						<span class="task-title"><input type="text" class="new_text"/></span>\
	 				</li>';
	 	$('#lists-collection').append(newList);
	 	$('.new_text').focus();
	 	create = false;	
	}
 	/*
	当表单失去焦点的时候
	*/
	$('.new_text').on('blur',function(){
		if(!$(this).val()){
			$(this).focus();
			return;
		}
		create = true;
		nId++;
		var t = new Data('collection_list');
		// 要创建的数据
		var json = {"id":nId,"title":$(this).val(),"icon":"&#xe609;","num1":0,"num2":0};
		t.set(json);
		t.get();
		fff();
	})
})	

/******** 创建清单的部分end********/

	

/***点击铅笔****/
$('.pen').on('click',function(ev){
	ev.stopPropagation();
})
/***点击铅笔end****/
