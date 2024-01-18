function getLocal(time) {
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
		function getUrlParam(name) {
		       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		       var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		       if (r != null) return unescape(r[2]); return null; //返回参数值
		   	};
		
		var id = getUrlParam('newid');
		    console.log('id:'+id);
		
		$.ajax({
			url: "http://smpe.linbolun.cn/api/v1/illness/"+id,
			type: "get",
			headers:{
				Authorization: localStorage.getItem("header")
			},
			success: function(data) {
				console.log(data);
				console.log(typeof (data.data));
				var str = '';
				
				str +='<table class="table table-condensed" width="80%">\
							<tbody>\
					<tr>\
        <td width="350"><h5>病图片：</h5></td>\
      </tr>\
      <tr>\
        <td width="350"><img src="'+data.data['illnessPicture']+'" alt="" width="350"/></td>\
      </tr>\
								<tr>\
						  <td width="350"><h5>病虫害名称：</h5></td>\
						</tr>\
						<tr class="tr1">\
						  <td align="center">'+data.data['illnessName']+'</td>\
						</tr>\
						<tr>\
						  <td width="350"><h5>病害特征:</h5></td>\
						</tr>\
						<tr>\
						  <td><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['illnessDescribe']+'</p></td>\
						</tr>\
						<tr>\
						  <td><h5>发病规律:</h5></td>\
						</tr>\
						<tr>\
						  <td><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['illnessRegular']+'</p></td>\
						</tr>\
						<tr>\
						  <td><h5>防治措施:</h5></td>\
						</tr>\
						<tr>\
						  <td><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['illnessMeasures']+'</p></td>\
						</tr>\
						  <tr>\
						    <td width="350"><h5>病虫害收录时间:</h5></td>\
						  </tr>\
						  <tr class ="createtime">\
						    <td width="350" align="center">'+getLocal(data.data['createTime'])+'</td>\
						  </tr>\
				    </tbody>\
				</table></center>'
				
				$(".row_clearfix").html(str);

			}
		});
	}
	api();

})