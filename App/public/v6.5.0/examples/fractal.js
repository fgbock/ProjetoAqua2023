(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{278:function(n,t,e){"use strict";e.r(t);var o=e(16),a=e(36),r=e(3),i=e(19),c=e(10),u=e(2),s=1e7,w=Math.cos(Math.PI/6),p=s*Math.sin(Math.PI/6),h=s*w,x=new a.a([[0,s],[h,-p],[-h,-p],[0,s]]),f=new o.a(x),d=new i.a({source:new c.a({features:[f]})});new r.a({layers:[d],target:"map",view:new u.a({center:[0,0],zoom:1})});function v(n){var t=n.next,e=n.point,o=n.next.point,a=o[0]-e[0],r=o[1]-e[1],i={point:[e[0]+a/3,e[1]+r/3]},c=Math.sqrt(a*a+r*r)/(2*w),u=Math.atan2(r,a)+Math.PI/6,s={point:[e[0]+c*Math.cos(u),e[1]+c*Math.sin(u)]},p={point:[o[0]-a/3,o[1]-r/3]};n.next=i,i.next=s,s.next=p,p.next=t}var m,M=document.getElementById("depth");function l(){!function(n){for(var t=x.clone(),e=function(n){for(var t={point:n[0]},e=n.length,o=0,a=t;o<e-1;++o)a.next={point:n[o+1]},a=a.next;return t}(t.getCoordinates()),o=0;o<n;++o)for(var a=e;a.next;){var r=a.next;v(a),a=r}var i=function(n){for(var t=[n.point],e=n,o=1;e.next;e=e.next,++o)t[o]=e.next.point;return t}(e);document.getElementById("count").innerHTML=i.length,t.setCoordinates(i),f.setGeometry(t)}(Number(M.value))}M.onchange=function(){window.clearTimeout(m),m=window.setTimeout(l,200)},l()}},[[278,0]]]);
//# sourceMappingURL=fractal.js.map