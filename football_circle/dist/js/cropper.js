!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function i(t){return"number"==typeof t}function e(t){return"undefined"==typeof t}function h(t,e){var h=[];return i(e)&&h.push(e),h.slice.apply(t,h)}function a(t,i){var e=h(arguments,2);return function(){return t.apply(i,e.concat(h(arguments)))}}function o(t){var i=t.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);return i&&(i[1]!==f.protocol||i[2]!==f.hostname||i[3]!==f.port)}function s(t){var i="timestamp="+(new Date).getTime();return t+(t.indexOf("?")===-1?"?":"&")+i}function n(t,i){return i.left<0&&t.width<i.left+i.width&&i.top<0&&t.height<i.top+i.height}function r(t){return t?"rotate("+t+"deg)":"none"}function d(t,i){var e,h,a=N(t.degree)%180,o=(a>90?180-a:a)*Math.PI/180,s=Z(o),n=_(o),r=t.width,d=t.height,p=t.aspectRatio;return i?(e=r/(n+s/p),h=e/p):(e=r*n+d*s,h=r*s+d*n),{width:e,height:h}}function p(i,e){var h=t("<canvas>")[0],a=h.getContext("2d"),o=e.naturalWidth,s=e.naturalHeight,n=e.rotate,r=d({width:o,height:s,degree:n});return n?(h.width=r.width,h.height=r.height,a.save(),a.translate(r.width/2,r.height/2),a.rotate(n*Math.PI/180),a.drawImage(i,-o/2,-s/2,o,s),a.restore()):(h.width=o,h.height=s,a.drawImage(i,0,0,o,s)),h}function l(i,e){this.$element=t(i),this.options=t.extend({},l.DEFAULTS,t.isPlainObject(e)&&e),this.ready=!1,this.built=!1,this.rotated=!1,this.cropped=!1,this.disabled=!1,this.canvas=null,this.cropBox=null,this.load()}var c=t(window),g=t(document),f=window.location,m=".cropper",u="preview"+m,v=/^(e|n|w|s|ne|nw|sw|se|all|crop|move|zoom)$/,w="cropper-modal",x="cropper-hide",b="cropper-hidden",C="cropper-invisible",y="cropper-move",$="cropper-crop",B="cropper-disabled",D="cropper-bg",T="mousedown touchstart",W="mousemove touchmove",L="mouseup mouseleave touchend touchleave touchcancel",H="wheel mousewheel DOMMouseScroll",k="dblclick",z="resize"+m,Y="build"+m,X="built"+m,R="dragstart"+m,E="dragmove"+m,P="dragend"+m,M="zoomin"+m,I="zoomout"+m,O=t.isFunction(t("<canvas>")[0].getContext),j=Math.sqrt,A=Math.min,F=Math.max,N=Math.abs,Z=Math.sin,_=Math.cos,S=parseFloat,q={};q.load=function(i){var e,h,a,n,r=this.options,d=this.$element;if(!i)if(d.is("img")){if(!d.attr("src"))return;i=d.prop("src")}else d.is("canvas")&&O&&(i=d[0].toDataURL());i&&(a=t.Event(Y),d.one(Y,r.build).trigger(a),a.isDefaultPrevented()||(r.checkImageOrigin&&o(i)&&(e="anonymous",d.prop("crossOrigin")||(h=s(i))),this.$clone=n=t("<img>"),n.one("load",t.proxy(function(){var t=n.prop("naturalWidth")||n.width(),e=n.prop("naturalHeight")||n.height();this.image={naturalWidth:t,naturalHeight:e,aspectRatio:t/e,rotate:0},this.url=i,this.ready=!0,this.build()},this)).one("error",function(){n.remove()}).attr({crossOrigin:e,src:h||i}),n.addClass(x).insertAfter(d)))},q.build=function(){var i,e,h=this.$element,a=this.$clone,o=this.options;this.ready&&(this.built&&this.unbuild(),this.$cropper=i=t(l.TEMPLATE),h.addClass(b),a.removeClass(x),this.$container=h.parent().append(i),this.$canvas=i.find(".cropper-canvas").append(a),this.$dragBox=i.find(".cropper-drag-box"),this.$cropBox=e=i.find(".cropper-crop-box"),this.$viewBox=i.find(".cropper-view-box"),this.addListeners(),this.initPreview(),o.aspectRatio=S(o.aspectRatio)||NaN,o.autoCrop?(this.cropped=!0,o.modal&&this.$dragBox.addClass(w)):e.addClass(b),o.background&&i.addClass(D),o.highlight||e.find(".cropper-face").addClass(C),o.guides||e.find(".cropper-dashed").addClass(b),o.movable||e.find(".cropper-face").data("drag","move"),o.resizable||e.find(".cropper-line, .cropper-point").addClass(b),this.setDragMode(o.dragCrop?"crop":"move"),this.built=!0,this.render(),h.one(X,o.built).trigger(X))},q.unbuild=function(){this.built&&(this.built=!1,this.container=null,this.canvas=null,this.cropBox=null,this.removeListeners(),this.resetPreview(),this.$preview=null,this.$viewBox=null,this.$cropBox=null,this.$dragBox=null,this.$canvas=null,this.$container=null,this.$cropper.remove(),this.$cropper=null)},t.extend(q,{render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var t=this.$element,i=this.$container,e=this.$cropper,h=this.options;e.addClass(b),t.removeClass(b),e.css(this.container={width:F(i.width(),S(h.minContainerWidth)||200),height:F(i.height(),S(h.minContainerHeight)||100)}),t.addClass(b),e.removeClass(b)},initCanvas:function(){var i=this.container,e=i.width,h=i.height,a=this.image,o=a.aspectRatio,s={aspectRatio:o,width:e,height:h};h*o>e?s.height=e/o:s.width=h*o,s.oldLeft=s.left=(e-s.width)/2,s.oldTop=s.top=(h-s.height)/2,this.canvas=s,this.limitCanvas(!0,!0),this.initialImage=t.extend({},a),this.initialCanvas=t.extend({},s)},limitCanvas:function(i,e){var h,a,o=this.options,s=o.strict,n=this.container,r=n.width,d=n.height,p=this.canvas,l=p.aspectRatio,c=this.cropBox,g=this.cropped&&c;i&&(h=S(o.minCanvasWidth)||0,a=S(o.minCanvasHeight)||0,h?(s&&(h=F(g?c.width:r,h)),a=h/l):a?(s&&(a=F(g?c.height:d,a)),h=a*l):s&&(g?(h=c.width,a=c.height,a*l>h?h=a*l:a=h/l):(h=r,a=d,a*l>h?a=h/l:h=a*l)),t.extend(p,{minWidth:h,minHeight:a,maxWidth:1/0,maxHeight:1/0})),e&&(s?g?(p.minLeft=A(c.left,c.left+c.width-p.width),p.minTop=A(c.top,c.top+c.height-p.height),p.maxLeft=c.left,p.maxTop=c.top):(p.minLeft=A(0,r-p.width),p.minTop=A(0,d-p.height),p.maxLeft=F(0,r-p.width),p.maxTop=F(0,d-p.height)):(p.minLeft=-p.width,p.minTop=-p.height,p.maxLeft=r,p.maxTop=d))},renderCanvas:function(t){var i,e,h=this.options,a=this.canvas,o=this.image;this.rotated&&(this.rotated=!1,e=d({width:o.width,height:o.height,degree:o.rotate}),i=e.width/e.height,i!==a.aspectRatio&&(a.left-=(e.width-a.width)/2,a.top-=(e.height-a.height)/2,a.width=e.width,a.height=e.height,a.aspectRatio=i,this.limitCanvas(!0,!1))),(a.width>a.maxWidth||a.width<a.minWidth)&&(a.left=a.oldLeft),(a.height>a.maxHeight||a.height<a.minHeight)&&(a.top=a.oldTop),a.width=A(F(a.width,a.minWidth),a.maxWidth),a.height=A(F(a.height,a.minHeight),a.maxHeight),this.limitCanvas(!1,!0),a.oldLeft=a.left=A(F(a.left,a.minLeft),a.maxLeft),a.oldTop=a.top=A(F(a.top,a.minTop),a.maxTop),this.$canvas.css({width:a.width,height:a.height,left:a.left,top:a.top}),this.renderImage(),this.cropped&&h.strict&&!n(this.container,a)&&this.limitCropBox(!0,!0),t&&this.output()},renderImage:function(){var i,e=this.canvas,h=this.image;h.rotate&&(i=d({width:e.width,height:e.height,degree:h.rotate,aspectRatio:h.aspectRatio},!0)),t.extend(h,i?{width:i.width,height:i.height,left:(e.width-i.width)/2,top:(e.height-i.height)/2}:{width:e.width,height:e.height,left:0,top:0}),this.$clone.css({width:h.width,height:h.height,marginLeft:h.left,marginTop:h.top,transform:r(h.rotate)})},initCropBox:function(){var i=this.options,e=this.canvas,h=i.aspectRatio,a=S(i.autoCropArea)||.8,o={width:e.width,height:e.height};h&&(e.height*h>e.width?o.height=o.width/h:o.width=o.height*h),this.cropBox=o,this.limitCropBox(!0,!0),o.width=A(F(o.width,o.minWidth),o.maxWidth),o.height=A(F(o.height,o.minHeight),o.maxHeight),o.width=F(o.minWidth,o.width*a),o.height=F(o.minHeight,o.height*a),o.oldLeft=o.left=e.left+(e.width-o.width)/2,o.oldTop=o.top=e.top+(e.height-o.height)/2,this.initialCropBox=t.extend({},o)},limitCropBox:function(t,i){var e,h,a=this.options,o=a.strict,s=this.container,n=s.width,r=s.height,d=this.canvas,p=this.cropBox,l=a.aspectRatio;t&&(e=S(a.minCropBoxWidth)||0,h=S(a.minCropBoxHeight)||0,p.minWidth=A(n,e),p.minHeight=A(r,h),p.maxWidth=A(n,o?d.width:n),p.maxHeight=A(r,o?d.height:r),l&&(p.maxHeight*l>p.maxWidth?(p.minHeight=p.minWidth/l,p.maxHeight=p.maxWidth/l):(p.minWidth=p.minHeight*l,p.maxWidth=p.maxHeight*l)),p.minWidth=A(p.maxWidth,p.minWidth),p.minHeight=A(p.maxHeight,p.minHeight)),i&&(o?(p.minLeft=F(0,d.left),p.minTop=F(0,d.top),p.maxLeft=A(n,d.left+d.width)-p.width,p.maxTop=A(r,d.top+d.height)-p.height):(p.minLeft=0,p.minTop=0,p.maxLeft=n-p.width,p.maxTop=r-p.height))},renderCropBox:function(){var t=this.options,i=this.container,e=i.width,h=i.height,a=this.$cropBox,o=this.cropBox;(o.width>o.maxWidth||o.width<o.minWidth)&&(o.left=o.oldLeft),(o.height>o.maxHeight||o.height<o.minHeight)&&(o.top=o.oldTop),o.width=A(F(o.width,o.minWidth),o.maxWidth),o.height=A(F(o.height,o.minHeight),o.maxHeight),this.limitCropBox(!1,!0),o.oldLeft=o.left=A(F(o.left,o.minLeft),o.maxLeft),o.oldTop=o.top=A(F(o.top,o.minTop),o.maxTop),t.movable&&a.find(".cropper-face").data("drag",o.width===e&&o.height===h?"move":"all"),a.css({width:o.width,height:o.height,left:o.left,top:o.top}),this.cropped&&t.strict&&!n(i,this.canvas)&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){var t=this.options;this.preview(),t.crop&&t.crop.call(this.$element,this.getData())}}),q.initPreview=function(){var i=this.url;this.$preview=t(this.options.preview),this.$viewBox.html('<img src="'+i+'">'),this.$preview.each(function(){var e=t(this);e.data(u,{width:e.width(),height:e.height(),original:e.html()}).html('<img src="'+i+'" style="display:block;width:100%;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation: 0deg!important">')})},q.resetPreview=function(){this.$preview.each(function(){var i=t(this);i.html(i.data(u).original).removeData(u)})},q.preview=function(){var i=this.image,e=this.canvas,h=this.cropBox,a=i.width,o=i.height,s=h.left-e.left-i.left,n=h.top-e.top-i.top,d=i.rotate;this.cropped&&!this.disabled&&(this.$viewBox.find("img").css({width:a,height:o,marginLeft:-s,marginTop:-n,transform:r(d)}),this.$preview.each(function(){var i=t(this),e=i.data(u),p=e.width/h.width,l=e.width,c=h.height*p;c>e.height&&(p=e.height/h.height,l=h.width*p,c=e.height),i.width(l).height(c).find("img").css({width:a*p,height:o*p,marginLeft:-s*p,marginTop:-n*p,transform:r(d)})}))},q.addListeners=function(){var i=this.options;this.$element.on(R,i.dragstart).on(E,i.dragmove).on(P,i.dragend).on(M,i.zoomin).on(I,i.zoomout),this.$cropper.on(T,t.proxy(this.dragstart,this)).on(k,t.proxy(this.dblclick,this)),i.zoomable&&i.mouseWheelZoom&&this.$cropper.on(H,t.proxy(this.wheel,this)),g.on(W,this._dragmove=a(this.dragmove,this)).on(L,this._dragend=a(this.dragend,this)),i.responsive&&c.on(z,this._resize=a(this.resize,this))},q.removeListeners=function(){var t=this.options;this.$element.off(R,t.dragstart).off(E,t.dragmove).off(P,t.dragend).off(M,t.zoomin).off(I,t.zoomout),this.$cropper.off(T,this.dragstart).off(k,this.dblclick),t.zoomable&&t.mouseWheelZoom&&this.$cropper.off(H,this.wheel),g.off(W,this._dragmove).off(L,this._dragend),t.responsive&&c.off(z,this._resize)},t.extend(q,{resize:function(){var i,e,h,a=this.$container,o=this.container;this.disabled||(h=a.width()/o.width,1===h&&a.height()===o.height||(i=this.getCanvasData(),e=this.getCropBoxData(),this.render(),this.setCanvasData(t.each(i,function(t,e){i[t]=e*h})),this.setCropBoxData(t.each(e,function(t,i){e[t]=i*h}))))},dblclick:function(){this.disabled||(this.$dragBox.hasClass($)?this.setDragMode("move"):this.setDragMode("crop"))},wheel:function(t){var i=t.originalEvent,e=1;this.disabled||(t.preventDefault(),i.deltaY?e=i.deltaY>0?1:-1:i.wheelDelta?e=-i.wheelDelta/120:i.detail&&(e=i.detail>0?1:-1),this.zoom(.1*-e))},dragstart:function(i){var e,h,a,o=this.options,s=i.originalEvent,n=s&&s.touches,r=i;if(!this.disabled){if(n){if(a=n.length,a>1){if(!o.zoomable||!o.touchDragZoom||2!==a)return;r=n[1],this.startX2=r.pageX,this.startY2=r.pageY,e="zoom"}r=n[0]}if(e=e||t(r.target).data("drag"),v.test(e)){if(i.preventDefault(),h=t.Event(R,{originalEvent:s,dragType:e}),this.$element.trigger(h),h.isDefaultPrevented())return;this.dragType=e,this.cropping=!1,this.startX=r.pageX,this.startY=r.pageY,"crop"===e&&(this.cropping=!0,this.$dragBox.addClass(w))}}},dragmove:function(i){var e,h,a=this.options,o=i.originalEvent,s=o&&o.touches,n=i,r=this.dragType;if(!this.disabled){if(s){if(h=s.length,h>1){if(!a.zoomable||!a.touchDragZoom||2!==h)return;n=s[1],this.endX2=n.pageX,this.endY2=n.pageY}n=s[0]}if(r){if(i.preventDefault(),e=t.Event(E,{originalEvent:o,dragType:r}),this.$element.trigger(e),e.isDefaultPrevented())return;this.endX=n.pageX,this.endY=n.pageY,this.change()}}},dragend:function(i){var e,h=this.dragType;if(!this.disabled&&h){if(i.preventDefault(),e=t.Event(P,{originalEvent:i.originalEvent,dragType:h}),this.$element.trigger(e),e.isDefaultPrevented())return;this.cropping&&(this.cropping=!1,this.$dragBox.toggleClass(w,this.cropped&&this.options.modal)),this.dragType=""}}}),t.extend(q,{reset:function(){this.built&&!this.disabled&&(this.image=t.extend({},this.initialImage),this.canvas=t.extend({},this.initialCanvas),this.renderCanvas(),this.cropped&&(this.cropBox=t.extend({},this.initialCropBox),this.renderCropBox()))},clear:function(){this.cropped&&!this.disabled&&(t.extend(this.cropBox,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(),this.renderCanvas(),this.$dragBox.removeClass(w),this.$cropBox.addClass(b))},destroy:function(){var t=this.$element;this.ready?(this.unbuild(),t.removeClass(b)):this.$clone.off("load").remove(),t.removeData("cropper")},replace:function(t){!this.disabled&&t&&this.load(t)},enable:function(){this.built&&(this.disabled=!1,this.$cropper.removeClass(B))},disable:function(){this.built&&(this.disabled=!0,this.$cropper.addClass(B))},move:function(t,e){var h=this.canvas;this.built&&!this.disabled&&i(t)&&i(e)&&(h.left+=t,h.top+=e,this.renderCanvas(!0))},zoom:function(i){var e,h,a,o=this.canvas;if(i=S(i),i&&this.built&&!this.disabled&&this.options.zoomable){if(e=i>0?t.Event(M):t.Event(I),this.$element.trigger(e),e.isDefaultPrevented())return;i=i<=-1?1/(1-i):i<=1?1+i:i,h=o.width*i,a=o.height*i,o.left-=(h-o.width)/2,o.top-=(a-o.height)/2,o.width=h,o.height=a,this.renderCanvas(!0),this.setDragMode("move")}},rotate:function(t){var i=this.image;t=S(t),t&&this.built&&!this.disabled&&this.options.rotatable&&(i.rotate=(i.rotate+t)%360,this.rotated=!0,this.renderCanvas(!0))},getData:function(){var i,e,h=this.cropBox,a=this.canvas,o=this.image;return this.built&&this.cropped?(e={x:h.left-a.left,y:h.top-a.top,width:h.width,height:h.height},i=o.width/o.naturalWidth,t.each(e,function(t,h){h/=i,e[t]=h})):e={x:0,y:0,width:0,height:0},e.rotate=o.rotate,e},getContainerData:function(){return this.built?this.container:{}},getImageData:function(){return this.ready?this.image:{}},getCanvasData:function(){var t,i=this.canvas;return this.built&&(t={left:i.left,top:i.top,width:i.width,height:i.height}),t||{}},setCanvasData:function(e){var h=this.canvas,a=h.aspectRatio;this.built&&!this.disabled&&t.isPlainObject(e)&&(i(e.left)&&(h.left=e.left),i(e.top)&&(h.top=e.top),i(e.width)?(h.width=e.width,h.height=e.width/a):i(e.height)&&(h.height=e.height,h.width=e.height*a),this.renderCanvas(!0))},getCropBoxData:function(){var t,i=this.cropBox;return this.built&&this.cropped&&(t={left:i.left,top:i.top,width:i.width,height:i.height}),t||{}},setCropBoxData:function(e){var h=this.cropBox,a=this.options.aspectRatio;this.built&&this.cropped&&!this.disabled&&t.isPlainObject(e)&&(i(e.left)&&(h.left=e.left),i(e.top)&&(h.top=e.top),a?i(e.width)?(h.width=e.width,h.height=h.width/a):i(e.height)&&(h.height=e.height,h.width=h.height*a):(i(e.width)&&(h.width=e.width),i(e.height)&&(h.height=e.height)),this.renderCropBox())},getCroppedCanvas:function(i){var e,h,a,o,s,n,r,d,l,c,g;if(this.built&&this.cropped&&O)return t.isPlainObject(i)||(i={}),g=this.getData(),e=g.width,h=g.height,d=e/h,t.isPlainObject(i)&&(s=i.width,n=i.height,s?(n=s/d,r=s/e):n&&(s=n*d,r=n/h)),a=s||e,o=n||h,l=t("<canvas>")[0],l.width=a,l.height=o,c=l.getContext("2d"),i.fillColor&&(c.fillStyle=i.fillColor,c.fillRect(0,0,a,o)),c.drawImage.apply(c,function(){var t,i,a,o,s,n,d=p(this.$clone[0],this.image),l=d.width,c=d.height,f=[d],m=g.x,u=g.y;return m<=-e||m>l?m=t=a=s=0:m<=0?(a=-m,m=0,t=s=A(l,e+m)):m<=l&&(a=0,t=s=A(e,l-m)),t<=0||u<=-h||u>c?u=i=o=n=0:u<=0?(o=-u,u=0,i=n=A(c,h+u)):u<=c&&(o=0,i=n=A(h,c-u)),f.push(m,u,t,i),r&&(a*=r,o*=r,s*=r,n*=r),s>0&&n>0&&f.push(a,o,s,n),f}.call(this)),l},setAspectRatio:function(t){var i=this.options;this.disabled||e(t)||(i.aspectRatio=S(t)||NaN,this.built&&(this.initCropBox(),this.cropped&&this.renderCropBox()))},setDragMode:function(t){var i=this.$dragBox,e=!1,h=!1;if(this.ready&&!this.disabled){switch(t){case"crop":this.options.dragCrop?(e=!0,i.data("drag",t)):h=!0;break;case"move":h=!0,i.data("drag",t);break;default:i.removeData("drag")}i.toggleClass($,e).toggleClass(y,h)}}}),q.change=function(){var t,i=this.dragType,e=this.options,h=this.canvas,a=this.container,o=this.cropBox,s=o.width,n=o.height,r=o.left,d=o.top,p=r+s,l=d+n,c=0,g=0,f=a.width,m=a.height,u=!0,v=e.aspectRatio,w={x:this.endX-this.startX,y:this.endY-this.startY};switch(e.strict&&(c=o.minLeft,g=o.minTop,f=c+A(a.width,h.width),m=g+A(a.height,h.height)),v&&(w.X=w.y*v,w.Y=w.x/v),i){case"all":r+=w.x,d+=w.y;break;case"e":if(w.x>=0&&(p>=f||v&&(d<=g||l>=m))){u=!1;break}s+=w.x,v&&(n=s/v,d-=w.Y/2),s<0&&(i="w",s=0);break;case"n":if(w.y<=0&&(d<=g||v&&(r<=c||p>=f))){u=!1;break}n-=w.y,d+=w.y,v&&(s=n*v,r+=w.X/2),n<0&&(i="s",n=0);break;case"w":if(w.x<=0&&(r<=c||v&&(d<=g||l>=m))){u=!1;break}s-=w.x,r+=w.x,v&&(n=s/v,d+=w.Y/2),s<0&&(i="e",s=0);break;case"s":if(w.y>=0&&(l>=m||v&&(r<=c||p>=f))){u=!1;break}n+=w.y,v&&(s=n*v,r-=w.X/2),n<0&&(i="n",n=0);break;case"ne":if(v){if(w.y<=0&&(d<=g||p>=f)){u=!1;break}n-=w.y,d+=w.y,s=n*v}else w.x>=0?p<f?s+=w.x:w.y<=0&&d<=g&&(u=!1):s+=w.x,w.y<=0?d>0&&(n-=w.y,d+=w.y):(n-=w.y,d+=w.y);s<0&&n<0?(i="sw",n=0,s=0):s<0?(i="nw",s=0):n<0&&(i="se",n=0);break;case"nw":if(v){if(w.y<=0&&(d<=g||r<=c)){u=!1;break}n-=w.y,d+=w.y,s=n*v,r+=w.X}else w.x<=0?r>0?(s-=w.x,r+=w.x):w.y<=0&&d<=g&&(u=!1):(s-=w.x,r+=w.x),w.y<=0?d>0&&(n-=w.y,d+=w.y):(n-=w.y,d+=w.y);s<0&&n<0?(i="se",n=0,s=0):s<0?(i="ne",s=0):n<0&&(i="sw",n=0);break;case"sw":if(v){if(w.x<=0&&(r<=c||l>=m)){u=!1;break}s-=w.x,r+=w.x,n=s/v}else w.x<=0?r>0?(s-=w.x,r+=w.x):w.y>=0&&l>=m&&(u=!1):(s-=w.x,r+=w.x),w.y>=0?l<m&&(n+=w.y):n+=w.y;s<0&&n<0?(i="ne",n=0,s=0):s<0?(i="se",s=0):n<0&&(i="nw",n=0);break;case"se":if(v){if(w.x>=0&&(p>=f||l>=m)){u=!1;break}s+=w.x,n=s/v}else w.x>=0?p<f?s+=w.x:w.y>=0&&l>=m&&(u=!1):s+=w.x,w.y>=0?l<m&&(n+=w.y):n+=w.y;s<0&&n<0?(i="nw",n=0,s=0):s<0?(i="sw",s=0):n<0&&(i="ne",n=0);break;case"move":h.left+=w.x,h.top+=w.y,this.renderCanvas(!0),u=!1;break;case"zoom":this.zoom(function(t,i,e,h){var a=j(t*t+i*i),o=j(e*e+h*h);return(o-a)/a}(N(this.startX-this.startX2),N(this.startY-this.startY2),N(this.endX-this.endX2),N(this.endY-this.endY2))),this.startX2=this.endX2,this.startY2=this.endY2,u=!1;break;case"crop":w.x&&w.y&&(t=this.$cropper.offset(),r=this.startX-t.left,d=this.startY-t.top,s=o.minWidth,n=o.minHeight,w.x>0?w.y>0?i="se":(i="ne",d-=n):w.y>0?(i="sw",r-=s):(i="nw",r-=s,d-=n),this.cropped||(this.cropped=!0,this.$cropBox.removeClass(b)))}u&&(o.width=s,o.height=n,o.left=r,o.top=d,this.dragType=i,this.renderCropBox()),this.startX=this.endX,this.startY=this.endY},t.extend(l.prototype,q),l.DEFAULTS={aspectRatio:NaN,autoCropArea:.8,crop:null,preview:"",strict:!0,responsive:!0,checkImageOrigin:!0,modal:!0,guides:!0,highlight:!0,background:!0,autoCrop:!0,dragCrop:!0,movable:!0,resizable:!0,rotatable:!0,zoomable:!0,touchDragZoom:!0,mouseWheelZoom:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:200,minContainerHeight:100,build:null,built:null,dragstart:null,dragmove:null,dragend:null,zoomin:null,zoomout:null},l.setDefaults=function(i){t.extend(l.DEFAULTS,i)},l.TEMPLATE=function(t,i){return i=i.split(","),t.replace(/\d+/g,function(t){return i[t]})}('<0 6="5-container"><0 6="5-canvas"></0><0 6="5-2-9" 3-2="move"></0><0 6="5-crop-9"><1 6="5-view-9"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="all"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>',"div,span,drag,data,point,cropper,class,line,dashed,box"),l.other=t.fn.cropper,t.fn.cropper=function(i){var a,o=h(arguments,1);return this.each(function(){var e,h=t(this),s=h.data("cropper");s||h.data("cropper",s=new l(this,i)),"string"==typeof i&&t.isFunction(e=s[i])&&(a=e.apply(s,o))}),e(a)?this:a},t.fn.cropper.Constructor=l,t.fn.cropper.setDefaults=l.setDefaults,t.fn.cropper.noConflict=function(){return t.fn.cropper=l.other,this}});