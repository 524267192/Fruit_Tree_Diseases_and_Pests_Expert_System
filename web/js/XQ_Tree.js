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
			url: "http://smpe.linbolun.cn/api/v1/tree/"+id,
			type: "get",
			headers:{
				Authorization: localStorage.getItem("header")
			},
			success: function(data) {
				console.log(data);
				console.log(typeof (data.data));
				
				var str = '';
				if (data.data['treeState'] =="0") {
					str +='<table class="table table-condensed" width="80%">\
								<tbody>\
								<tr>\
					        <td width="350"><h5>树图片：</h5></td>\
					      </tr>\
					      <tr>\
					        <td width="350"><img src="' + data.data['treePicture'] + '" alt="" width="350"/></td>\
					      </tr>\
							<tr>\
					        <td width="350"><h5>树编号：</h5></td>\
					      </tr>\
					      <tr class="tr1">\
					        <td align="center">'+data.data['treeNumber']+'</td>\
					      </tr>\
						  <tr>\
						    <td width="350"><h5>创建时间：</h5></td>\
						  </tr>\
						  <tr class ="createtime">\
						    <td width="350" align="center">'+data.data['createTime']+'</td>\
						  </tr>\
							<tr>\
					        <td width="350"><h5>树种类：</h5></td>\
					      </tr>\
					      <tr class ="">\
					        <td width="350" align="center">'+data.data['treeType']+'</td>\
					      </tr>    \
						  <tr>\
						    <td width="350"><h5>树描述：</h5></td>\
						  </tr>\
						  <tr>\
					    <td width="350"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['treeDescribe']+'</p></td>\
						  </tr>\
						  </tbody>\
					</table>'
				}else{
			
			str +='<table class="table table-condensed" width="80%">\
						<tbody>\
						<tr>\
			        <td width="350"><h5>树图片：</h5></td>\
			      </tr>\
			      <tr>\
			        <td width="350"><img src="' + data.data['treePicture'] + '" alt="" width="350"/></td>\
			      </tr>\
					<tr>\
			        <td width="350"><h5>树编号：</h5></td>\
			      </tr>\
			      <tr class="tr1">\
			        <td align="center">'+data.data['treeNumber']+'</td>\
			      </tr>\
				  <tr>\
				    <td width="350"><h5>创建时间：</h5></td>\
				  </tr>\
				  <tr class ="createtime">\
				    <td width="350" align="center">'+data.data['createTime']+'</td>\
				  </tr>\
					<tr>\
			        <td width="350"><h5>树种类：</h5></td>\
			      </tr>\
			      <tr class ="">\
			        <td width="350" align="center">'+data.data['treeType']+'</td>\
			      </tr>    \
				  <tr>\
				    <td width="350"><h5>树描述：</h5></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['treeDescribe']+'</p></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><h5>树得的病：</h5></td>\
				  </tr>\
				  <tr>\
				    <td width="350" align="center">'+data.data['illnessName']+'</td>\
				  </tr>\
				  <tr>\
				    <td width="350"><h5>病图片：</h5></td>\
				  </tr>\
				  <tr>\
			        <td width="350"><img src="' + data.data['illnessPicture'] + '" alt="" width="350"/></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><h5>病描述：</h5></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['illnessDescribe']+'</p></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><h5>病措施：</h5></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['illnessMeasures']+'</p></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><h5>疾病规律：</h5></td>\
				  </tr>\
				  <tr>\
				    <td width="350"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data['illnessRegular']+'</p></td>\
				  </tr>\
				  </tbody>\
			</table>'
					}
				$(".row_clearfix").html(str);
				// console.log(str);
			}
		});
	}
	api();

})