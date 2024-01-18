window.localStorage.setItem("header","Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJkOWRjOTk3YjM3OWE0NTFhOGNhNTcwNTRhNTI0YzcyYyIsImF1dGgiOiJhZG1pbiIsInN1YiI6IjEifQ.HLIpmGi-8I6CagXiPpOI84vYb3hOC61YXI-jAXZE5sqjoeEzDAkspQCB0ITXUhhnuFX08kkkIPcLsGZNrXNZuQ");
// console.log(localStorage.getItem("header"))
// var header =
// 	"Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyZDg3YTI5ZWM5NjY0YWE5OWEzZWQ2YzMwZDViNjU1NCIsImF1dGgiOiJhZG1pbiIsInN1YiI6IjEifQ.9-6jbfevel_nXdFXqMbOr45npfB1bwsfJU9qjl6r0KhQuM1xxY0vWzK0nEaxc1UNlNWbc4KOhtGztzDp2sqcXA"
$(function() {
	function api() {
		$.ajax({
			url: "http://smpe.linbolun.cn/api/v1/record",
			type: "get",
			data: {
				current: 1,
				size: 10
			},
			headers: {
				Authorization: localStorage.getItem("header")
			},
			
			success: function(data) {
				console.log(data)
				// console.log(data.data[0].recordId);
				var str = '';
				let arrList = [];
				for (var i = 0, length = data.data.length; i < length; i++) {


					if (data.data[i].recognition == '1') {
						str += '<li class="liItem"><a href="' + data.data[i]
							.recordId + '"><img src="http://smpe.linbolun.cn/api/file/download/' +
							data.data[i]
							.recordPicture +
							'" height="70px" width="90px"><span style="margin-left">' + '&emsp;' +
							"健康" + '</span>' + '&emsp;' + data
							.data[i].createTime + '</a></li>';
					} else if (data.data[i].recognition == '2') {
						str += '<li class="liItem"><a href="' + data.data[i]
							.recordId + '"><img src="http://smpe.linbolun.cn/api/file/download/' +
							data.data[i]
							.recordPicture +
							'" height="70px" width="90px"><span style="margin-left">' + '&emsp;' +
							"不健康" + '</span>' + '&emsp;' + data
							.data[i].createTime + '</a></li>';
					} else {
						str += '<li class="liItem"><a href="' + data.data[i]
							.recordId + '"><img src="http://smpe.linbolun.cn/api/file/download/' +
							data.data[i]
							.recordPicture +
							'" height="70px" width="90px"><span style="margin-left">' + '&emsp;' +
							"未识别" + '</span>' + '&emsp;' + data
							.data[i].createTime + '</a></li>';
					}
					arrList[i] =data.data[i].recordId
					console.log('----0' + data.data[i].recordId)
				}
				$(".liItems").html(str);
				let arr = document.getElementsByClassName('liItem')
				for (let i = 0; i < arr.length; i++) {
					console.log(1)
					arr[i].onclick = (e) => {
						console.log(arrList[i])
						// window.location = "http://127.0.0.1:8848/web/record.html?newid="+arrList[i]
						window.location.href= "record.html?newid="+arrList[i]
					}
				}
			}
		});
	}
	api();

	//公告
	function api1() {
		$.ajax({
			url: "http://smpe.linbolun.cn/api/v1/illness-hot",
			type: "get",
			headers: {
				Authorization: localStorage.getItem("header")
			},
			success: function(data) {
				console.log(data);
				console.log(data.data);
				data_test = "公告：当前" + data.data + "热感病";
				// console.log(data_test);
				$('#affiche').html(data_test);
			}
		});
	}
	api1();

})
//绘图
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
}
if (navigator.mediaDevices.getUserMedia === undefined) {
	navigator.mediaDevices.getUserMedia = function(constraints) {

		var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

		if (!getUserMedia) {
			return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
		}
		return new Promise(function(resolve, reject) {
			getUserMedia.call(navigator, constraints, resolve, reject);
		});
	}
}
//默认使用前摄像头，强制使用后置摄像头如下设置
//     let constraints = {video: { facingMode: { exact: "environment" } }};
let constraints = {
	video: true
};
navigator.mediaDevices.getUserMedia(constraints)
	.then(function(stream) {
		if ("srcObject" in video) {
			video.srcObject = stream;
		} else {
			video.src = window.URL.createObjectURL(stream);
		}
		video.onloadedmetadata = function(e) {
			video.play();
		};
	})
	.catch(function(err) {
		console.log(err.name + ": " + err.message);
	});

//注册拍照按钮的单击事件
document.getElementById("capture").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 200, 200);

	UploadPic();
});

//上传图片到后台
function UploadPic() {
	var Pic = document.getElementById("canvas").toDataURL("image/jpg");
	console.log(Pic);
	var file = function(data) {
		let binary = atob(data.split(',')[1]);
		let mime = data.split(',')[0].match(/:(.*?);/)[1];
		let array = [];
		for (let i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		let fileData = new Blob([new Uint8Array(array)], {
			type: mime,
		});

		let file = new File([fileData], `${new Date().getTime()}.png`, {
			type: mime
		});
		return file;
	}(Pic)
	console.log(file);
	api2(file);
}
// 上传文件
function api2(file) {
	var formData = new FormData();
	formData.append("file", file);
	$.ajax({
		url: "http://smpe.linbolun.cn/api/file/uploadImage",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		headers: {
			Authorization: localStorage.getItem("header")
		},
		success: function(data) {
			res = data['data']
			console.log(res);
			api3(res);
		},
	});

}

// 图像识别
function api3(res) {

	$.ajax({
		url: "http://127.0.0.1:5000/url/",
		type: "get",
		data: {
			path: res
		},
		crossDomain: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: localStorage.getItem("header"),
		},
		success: function(illnes) {
			console.log(illnes)
			var x;
			var person = prompt("请输入编号", "1");
			if (person != null && person != "") {
				x = person;
				api4(illnes, x, res);
			}

		}
	});
}

//新增历史记录
function api4(illnes, x, res) {
	//状态
	var illc = illnes.illnessState;
	// console.log(illc);
	//树id
	var tree = x;
	// console.log(res);
     //病id
	var illid = illnes.illnessId;
	// console.log("病id",);
	$.ajax({
		url: "http://smpe.linbolun.cn/api/v1/record",
		type: "post",
		dataType: "json",
		data: JSON.stringify({
			'recognition': illc,
			'recordPicture': res,
			'treeNumber': x,
			'illnessId':illid
		}),
		headers: {
			Authorization: localStorage.getItem("header"),
			"Content-Type": "application/json"
		},
		success: function(id) {
			console.log(id)
			// re_id = id.data;
			// window.location = "http://127.0.0.1:8848/web/record.html?newid=" + id.data
			window.location.href="record.html?newid=" + id.data
			// api5(re_id);
		}
	});

}
