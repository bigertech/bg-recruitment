
var jobs = {};

jQuery(function($) {
  if (navigator.userAgent.indexOf("MSIE") < 0) {
      //IE8 不支持console
      console.log("^_^ 想加入笔戈科技开发团队？请发送邮件到 liuxing@meizu.com");
  }
});

function getJob(id) {
  if (jobs[id]) {
      $('#detail-name').html(jobs[id].name);
      $('#detail-address').html(jobs[id].address);
      $('#detail-desc').html(jobs[id].description);
  } else {
    $.get('/job/' + id, function(job) {
      if (job) {
          $('#detail-name').html(job.name);
          $('#detail-address').html(job.address);
          $('#detail-desc').html(job.description);
          jobs[id] = job;
      }
    });
  }

  openNew();
};

function openNew() {
    //获取页面的高度和宽度
    var sWidth = document.body.scrollWidth;
    var sHeight = document.body.scrollHeight;

    var oMask = document.createElement("div");
        oMask.id = "mask";
        oMask.style.height = sHeight+"px";
        oMask.style.width = sWidth+"px";
        document.body.appendChild(oMask);

    var oDetail = document.getElementById('detail');
        oDetail.style.display = "block";

    //获取页面的可视区域高度
    var wWidth = document.documentElement.clientWidth;
    var wHeight = document.documentElement.clientHeight;
    //获取工作详情的宽和高
      var dHeight = oDetail.offsetHeight;
      var dWidth = oDetail.offsetWidth;
      //设置工作详情的left和top
      oDetail.style.left = wWidth / 2 - dWidth / 2 + "px";
      oDetail.style.top  = wHeight / 2 - dHeight / 2 + "px";



    //点击关闭按钮
    var oClose = document.getElementsByClassName("close");

    //点击工作详情以外的区域也可以关闭登陆框
    for ( var j = 0; j < oClose.length; j++) {
      oClose[j].onclick = oMask.onclick = function() {
        oDetail.style.display = "none";
        document.body.removeChild(oMask);
      };
    }
}

window.onload = function() {
  var oBtn = document.getElementsByClassName("job-name");

  //点击查看工作详情
  for ( var i = 0; i < oBtn.length; i++) {
    oBtn[i].onclick = function() {
      getJob($(this).attr('id'));
      return false;
    }
  }
}
