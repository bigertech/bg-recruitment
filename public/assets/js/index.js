
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

    var oDetailWrapper = document.getElementById("job-detail-wrapper");
        oDetailWrapper.style.display = "block";

    var oMaskBackground = document.createElement("div");
        oMaskBackground.id = "maskBackground";
        document.body.appendChild(oMaskBackground);

    //点击关闭按钮
    var oClose = $(".close");

    //点击工作详情以外的区域也可以关闭登陆框
    for ( var j = 0; j < oClose.length; j++) {
      oClose[j].onclick = oMaskBackground.onclick = function() {
        oDetailWrapper.style.display = "none";
        document.body.removeChild(oMaskBackground);
      };
    }
}

window.onload = function() {
  var oBtn = $(".job-name");

  //点击查看工作详情
  for ( var i = 0; i < oBtn.length; i++) {
    oBtn[i].onclick = function() {
      getJob($(this).attr('id'));
      return false;
    }
  }
}

$(document).ready(function(){

  $('.carousel').unslider({
    arrows: true,
    fluid: true,
    dots: true
  });

  var unslider = $('.carousel').unslider();

  $('.carousel-control').click(function() {
      var fn = this.className.split(' ')[1];

      //  Either do unslider.data('unslider').next() or .prev() depending on the className
      unslider.data('unslider')[fn]();
  });
});
