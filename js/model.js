/* collection_list 
	清单数据
	id 唯一标识符
	title 标题
	icon 图标

*/
// 注意，，，， data是只读，不可直接操作，必须用setData
var data = {
	collection_list:[],
	task_list:[]
}
// 构造函数
function Data(key){
	this.key = key;
}
Data.prototype.get = function(){
	try{
		data[this.key] = JSON.parse(localStorage.getItem(this.key));
	}catch(ev){}
}

Data.prototype.set = function(json){
	try{
		data[this.key] = JSON.parse(localStorage.getItem(this.key));
		data[this.key].push(json);
		localStorage.setItem(this.key,JSON.stringify(data[this.key]));
	}catch(ev){}
}


Data.prototype.replace = function(Id){
	var id=Number(Id);
		var that = this.key;
		var arr= [],obj={};
	try{
		data[this.key] = JSON.parse(localStorage.getItem(this.key));
	}catch(ev){}
	arr = data[this.key]; 
	// 如果是左边的就走if
	if(this.key==='collection_list'){
		data[this.key].forEach(function(e,i){
			if(e.id === id){
				obj = e;
				// obj.num1++;
				// obj.complete = !e.complete;
				// arr.splice(i,1,obj);
				// localStorage.setItem(that,JSON.stringify(arr));
				// data[that] = JSON.parse(localStorage.getItem(that));
			}
		});
	}else{
		data[this.key].forEach(function(e,i){
			if(e.id === id){
				obj = e;
				obj.complete = !e.complete;
				arr.splice(i,1,obj);
				localStorage.setItem(that,JSON.stringify(arr));
				try{
					data[that] = JSON.parse(localStorage.getItem(that));	
				}catch(e){}
			}
		});
	}
}
// 刚开始的时候就先把左边的数据从 localstorage里的数据放到data的collection_list里面
var t = new Data('collection_list');
t.get();






// data = {
// 	collection_list:[
// 		{"id":1,"title":"杂货购物","icon":"&#xe609;","num1":1,"num2":0},
// 		{"id":2,"title":"新清单","icon":"&#xe609;","num1":1,"num2":0},
// 		{"id":3,"title":"想看的电影","icon":"&#xe609;","num1":2,"num2":1},
// 		{"id":4,"title":"旅游","icon":"&#xe609;","num1":0,"num2":2},
// 		{"id":5,"title":"旅游","icon":"&#xe609;","num1":0,"num2":0}
// 	],
// 	task_list:[
	// 	{"id":1,"collection_id":1,"content":"开会1","time":"2015.3.4","star":"&#xe61e;","subtask":"&#xe61d;","complete":false},
	// 	{"id":2,"collection_id":2,"content":"开会2","time":"2015.3.4","star":"&#xe61e;","subtask":"&#xe61d;","complete":false},
	// 	{"id":3,"collection_id":3,"content":"开会3","time":"2015.3.4","star":"&#xe61e;","subtask":"&#xe61d;","complete":false},
	// 	{"id":4,"collection_id":3,"content":"开会3.2","time":"2015.3.4","star":"&#xe61e;","subtask":"&#xe61d;","complete":true},
	// 	{"id":5,"collection_id":3,"content":"开会3.3","time":"2015.3.4","star":"&#xe61e;","subtask":"&#xe61d;","complete":false},
	// 	{"id":6,"collection_id":4,"content":"开会4","time":"2015.3.4","star":"&#xe61e;","subtask":"&#xe61d;","complete":true},
	// 	{"id":7,"collection_id":4,"content":"开会4.2","time":"2015.3.4","star":"&#xe61e;","subtask":"&#xe61d;","complete":true}
	// ]
// }