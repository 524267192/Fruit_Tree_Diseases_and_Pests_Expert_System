$(function() {
	
function getUrlParam(name) {
		       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		       var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		       if (r != null) return unescape(r[2]); return null; //返回参数值
		   	};
		
		var id = getUrlParam('newid');
		    console.log('id:'+id);
	function api() {
		$.ajax({
			url: "http://smpe.linbolun.cn/api/v1/record/"+id,
			type: "get",
			headers:{
				Authorization:localStorage.getItem("header")
			},
			success: function(data) {
				console.log(data);
				console.log(typeof (data.data));
				var str = '';
				

					if (data.data['recognition'] =="2") {
						str +='<table class="table table-condensed" width="80%">\
							<tbody>\
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
								  <td width="350"><h5>识别结果：</h5></td>\
								</tr>\
								<tr>\
						        <td width="350"><center>不健康</center></td>\
						      </tr>\
								<tr>\
						        <td width="350"><h5>识别图片：</h5></td>\
						      </tr>\
						      <tr>\
						        <td width="350" align="center"><img src="http://smpe.linbolun.cn/api/file/download/'+data.data['recordPicture']+'" alt="" width="350"/></td>\
						      </tr>\
								<tr>\
						        <td width="350"><h5>树编号：</h5></td>\
						      </tr>\
						      <tr class="tr1">\
						        <td align="center">'+data.data['treeNumber']+'</td>\
						      </tr>\
							  <tr>\
							    <td width="350"><h5>识别时间：</h5></td>\
							  </tr>\
							  <tr class ="createtime">\
							    <td width="350" align="center">'+data.data['createTime']+'</td>\
							  </tr>\
								<tr>\
						        <td width="350"><h5>树种类：</h5></td>\
						      </tr>\
						      <tr>\
						        <td width="350" align="center">'+data.data['treeType']+'</td>\
						      </tr>\
							  <tr>\
							    <td width="350"><h5>树描述：</h5></td>\
							  </tr>\
							  <tr>\
							    <td width="350">'+data.data['treeDescribe']+'</td>\
							  </tr>\
							</tbody>\
						</table>'
					}else if(data.data['recognition'] =="1"){
						str +='<table class="table table-condensed" width="80%">\
							<tbody>\
	<tr>\
			  <td width="350"><h5>识别结果：</h5></td>\
			</tr>\
			<tr>\
	        <td width="350"><center>健康</center></td>\
	      </tr>\
			<tr>\
	        <td width="350"><h5>识别图片：</h5></td>\
	      </tr>\
	      <tr>\
	        <td width="350" align="center"><img src="http://smpe.linbolun.cn/api/file/download/'+data.data['recordPicture']+'" alt="" width="350"/></td>\
	      </tr>\
			<tr>\
	        <td width="350"><h5>树编号：</h5></td>\
	      </tr>\
	      <tr class="tr1">\
	        <td align="center">'+data.data['treeNumber']+'</td>\
	      </tr>\
		  <tr>\
		    <td width="350"><h5>识别时间：</h5></td>\
		  </tr>\
		  <tr class ="createtime">\
		    <td width="350" align="center">'+data.data['createTime']+'</td>\
		  </tr>\
			<tr>\
	        <td width="350"><h5>树种类：</h5></td>\
	      </tr>\
	      <tr>\
	        <td width="350" align="center">'+data.data['treeType']+'</td>\
	      </tr>\
		  <tr>\
		    <td width="350"><h5>树描述：</h5></td>\
		  </tr>\
		  <tr>\
		    <td width="350">'+data.data['treeDescribe']+'</td>\
		  </tr>\
		</tbody>\
	</table>'
					}else{
						str +='<table class="table table-condensed" width="80%">\
							<tbody>\
	<tr>\
			  <td width="350"><h5>识别结果：</h5></td>\
			</tr>\
			<tr>\
	        <td width="350"><center>未识别</center></td>\
	      </tr>\
			<tr>\
	        <td width="350"><h5>识别图片：</h5></td>\
	      </tr>\
	      <tr>\
	        <td width="350" align="center"><img src="http://smpe.linbolun.cn/api/file/download/'+data.data['recordPicture']+'" alt="" width="350"/></td>\
	      </tr>\
			<tr>\
	        <td width="350"><h5>树编号：</h5></td>\
	      </tr>\
	      <tr class="tr1">\
	        <td align="center">'+data.data['treeNumber']+'</td>\
	      </tr>\
		  <tr>\
		    <td width="350"><h5>识别时间：</h5></td>\
		  </tr>\
		  <tr class ="createtime">\
		    <td width="350" align="center">'+data.data['createTime']+'</td>\
		  </tr>\
			<tr>\
	        <td width="350"><h5>树种类：</h5></td>\
	      </tr>\
	      <tr>\
	        <td width="350" align="center">'+data.data['treeType']+'</td>\
	      </tr>\
		  <tr>\
		    <td width="350"><h5>树描述：</h5></td>\
		  </tr>\
		  <tr>\
		    <td width="350">'+data.data['treeDescribe']+'</td>\
		  </tr>\
		</tbody>\
	</table>'
					}
				// }
				console.log(str);
				$(".row_clearfix").html(str);
				
			}
		});
	}
	api();

})