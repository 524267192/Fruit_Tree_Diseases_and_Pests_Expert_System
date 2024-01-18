function getLocalTime(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     */
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

$(function() {
	function api() {
		$.ajax({
			url: "http://smpe.linbolun.cn/api/v1/illness",
			type: "get",
			headers: {
				Authorization:localStorage.getItem("header")
				
					    },
			success: function(data) {
				console.log(data);
				console.log(data.data);
				var str = '';
				let arrList = []
				for (var i = 0, length = data.data.length; i < length; i++) {
					ill_id=data.data[1].id					
					// console.log();
					str += '<li class="mmm mui-table-view-cell mui-media"><p href="illness.html?newid='+data.data[i].id+'"><img class="mui-media-object mui-pull-left" src="'+data.data[i].illnessPicture+'"><div class="mui-media-body"><p style="font-size: 16px;color:darkgreen" >'+data.data[i].illnessName+'&nbsp;<span class="glyphicon glyphicon-leaf" ></span><small class="mui-pull-right"><span class="glyphicon glyphicon-th-list"></span></small></p><p>&nbsp;</p><p class="mui-ellipsis" style="color:steelblue">'+data.data[i].illnessDescribe+'</p><p>&nbsp;</p><p class="mui-ellipsis" style="color: #DD524D;"><span class="mui-pull-right">'+getLocalTime(data.data[i].createTime)+'</span></p></div></p></li>'
					;
					arrList[i] = 'illness.html?newid='+data.data[i].id
					//console.log('----0'+data.data[i].id)
				}
					
					// arrList[i] = 'illness.html?newid='+data.data[i].id
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
	
	api();


})
