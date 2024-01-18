$(function() {
	console.log(localStorage.getItem("header"))
	function api_tree() {
		$.ajax({
			url:"http://smpe.linbolun.cn/api/v1/tree",
			type: "get",
			headers:{
				Authorization:localStorage.getItem("header")
			},
			success: function(data) {
				console.log(data);
				console.log(data.data);

				
				var str = '';
				let arrList = []
				for (var i = 0, length = data.data.length; i < length; i++) {
					//console.log(i);
					
					str += '<li class="mmm mui-table-view-cell mui-media"><p href="tree.html?newid='+data.data[i].id+'">\
							<img class="mui-media-object mui-pull-left" src="' + data.data[i].treePicture +'">\
							<div class="mui-media-body">\
								<p style="font-size: 16px;color:darkgreen" >'+data.data[i].treeNumber+'<span class="glyphicon glyphicon-tree-conifer" ></span><small class="mui-pull-right"><span class="glyphicon glyphicon-th-list"></span></small></p>\
								<p>&nbsp;</p>\
								<p class="mui-ellipsis" style="color:steelblue">'+data.data[i].treeDescribe+'</p>\
								<p>&nbsp;</p>\
								<p class="mui-ellipsis" style="color: #DD524D;">'+data.data[i].treeType+'<span class="mui-pull-right">'+data.data[i].createTime+'</span>\
								</p>\
							</div>\
					</p></li>';
					arrList[i] = 'tree.html?newid='+data.data[i].id
					console.log('----0'+data.data[i].id)
				}

				// console.log(data.data[4].id);
				$(".mui-table-view").html(str);
				let arr = document.getElementsByClassName('mmm')
				for(let i = 0; i < arr.length; i++){
					console.log(1)
					arr[i].onclick = (e) => {
						// console.log(e.target.childNodes[i])
						console.log(arrList[i])
						window.location.href = arrList[i]
						
					}
				}
			}
		}); 
	}
	
	api_tree();
})
