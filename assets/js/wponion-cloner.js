"use strict";!function(a){a.fn.WPOnionCloner=function(e){var n=a.extend({limit:!1,add_btn:!1,remove_btn:!1,clone_elem:!1,template:!1,sortable:!1,onLimitReached:!1,templateBeforeRender:!1,templateAfterRender:!1,onRemove:!1,onRemoveBefore:!1,onRemoveAfter:!1,show_animation:!1,hide_animation:!1},e);n.add_btn="string"==typeof n.add_btn?this.find(n.add_btn):n.add_btn,n.remove_btn_jquery="string"==typeof n.remove_btn?this.find(n.remove_btn):n.remove_btn_jquery;function o(){if(!a(this).hasClass("removing")){a(this).addClass("removing");var e=parseInt(i.attr("data-wponion-clone-count"))-1;i.attr("data-wponion-clone-count",e),!1!==n.onRemoveBefore&&n.onRemoveBefore(a(this)),!1!==n.onRemove?n.onRemove(a(this)):!1!==n.hide_animation?a(this).parent().parent().animateCss(n.hide_animation,function(e){e.remove()}):a(this).parent().parent().remove(),!1!==n.onRemoveAfter&&n.onRemoveAfter(a(this))}}var i=a(this);n.remove_btn_jquery.on("click",o),n.add_btn.on("click",function(){var e=parseInt(i.attr("data-wponion-clone-count")),t=JSON.parse(JSON.stringify(n.template));if(0<n.limit&&(e===n.limit||e>=n.limit))return!1!==n.onLimitReached&&n.onLimitReached(),!1;e+=1,i.attr("data-wponion-clone-count",e),t=t.replace(/{wponionCloneID}/g,e),!1!==n.templateBeforeRender&&(t=n.templateBeforeRender(t,e,this)),t=a(t),!1!==n.show_animation&&t.animateCss(n.show_animation),i.append(t),!1!==n.templateAfterRender&&n.templateAfterRender(i,e,this),i.find(n.remove_btn).on("click",o)}),!1!==n.sortable&&i.sortable(a.extend({cursor:"move",axis:"y",scrollSensitivity:40,forcePlaceholderSize:!0,helper:"clone",opacity:.65},n.sortable))}}(jQuery);