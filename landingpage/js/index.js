 var video = document.getElementById('video');
 var mask = document.getElementById('mask');


 function V(vWidth, vHeight, obj, objBox, mask) {
     var scale = vWidth / vHeight //obj的宽高比例
     if (window.innerWidth || window.innerHeight) {
         winWidth = window.innerWidth;
         winHeight = window.innerHeight;
     } 
     else if ((document.body) && (document.body.clientWidth || document.body.clientHeight)) {
         winWidth = document.body.clientWidth;
         winHeight = document.body.clientHeight;
     }

     obj.style.width = winWidth + 'px';
     obj.style.height = winWidth / scale + 'px';
     mask.style.width = winWidth + 'px';
     mask.style.height = winWidth / scale + 'px';
     objBox.style.width = winWidth + 'px';
     objBox.style.height = winHeight + 'px';
 }

 window.onresize = function() {
     V(596, 336, video, videoBox, mask);
 }

 
 
 
