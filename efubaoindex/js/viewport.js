//动态计算像素比
var iScale                                                  =   1;
iScale                                                      =   iScale/window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + ',user-scalable=no" />');

//动态计算rem比
var iWidth                                                  =   document.documentElement.clientWidth;
//640 / 16 = 40
//元素rem计算：元素实际像素 / 40
document.getElementsByTagName('html')[0].style.fontSize     =   iWidth / 16 + 'px';





