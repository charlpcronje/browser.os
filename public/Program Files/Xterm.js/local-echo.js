var LocalEchoController;(()=>{var t={121:(t,e)=>{for(var r="(?:"+["\\|\\|","\\&\\&",";;","\\|\\&","\\<\\(",">>",">\\&","[&;()|<>]"].join("|")+")",i="",s=0;s<4;s++)i+=(Math.pow(16,8)*Math.random()).toString(16);e.Q=function(t,e,s){var n=function(t,e,s){var n=new RegExp(["("+r+")","((\\\\['\"|&;()<> \\t]|[^\\s'\"|&;()<> \\t])+|\"((\\\\\"|[^\"])*?)\"|'((\\\\'|[^'])*?)')*"].join("|"),"g"),o=t.match(n).filter(Boolean),a=!1;return o?(e||(e={}),s||(s={}),o.map((function(t,n){if(!a){if(RegExp("^"+r+"$").test(t))return{op:t};for(var h=s.escape||"\\",u=!1,l=!1,c="",p=!1,f=0,v=t.length;f<v;f++){var m=t.charAt(f);if(p=p||!u&&("*"===m||"?"===m),l)c+=m,l=!1;else if(u)m===u?u=!1:"'"==u?c+=m:m===h?(f+=1,c+='"'===(m=t.charAt(f))||m===h||"$"===m?m:h+m):c+="$"===m?d():m;else if('"'===m||"'"===m)u=m;else{if(RegExp("^"+r+"$").test(m))return{op:t};if(RegExp("^#$").test(m))return a=!0,c.length?[c,{comment:t.slice(f+1)+o.slice(n+1).join(" ")}]:[{comment:t.slice(f+1)+o.slice(n+1).join(" ")}];m===h?l=!0:c+="$"===m?d():m}}return p?{op:"glob",pattern:c}:c}function d(){var r,s,n,o,a;if(f+=1,"{"===t.charAt(f)){if(f+=1,"}"===t.charAt(f))throw new Error("Bad substitution: "+t.substr(f-2,3));if((r=t.indexOf("}",f))<0)throw new Error("Bad substitution: "+t.substr(f));s=t.substr(f,r-f),f=r}else/[*@#?$!_\-]/.test(t.charAt(f))?(s=t.charAt(f),f+=1):(r=t.substr(f).match(/[^\w\d_]/))?(s=t.substr(f,r.index),f+=r.index-1):(s=t.substr(f),f=t.length);return n="",o=s,void 0===(a="function"==typeof e?e(o):e[o])&&""!=o?a="":void 0===a&&(a="$"),"object"==typeof a?n+i+JSON.stringify(a)+i:n+a}})).reduce((function(t,e){return void 0===e?t:t.concat(e)}),[])):[]}(t,e,s);return"function"!=typeof e?n:n.reduce((function(t,e){if("object"==typeof e)return t.concat(e);var r=e.split(RegExp("("+i+".*?"+i+")","g"));return 1===r.length?t.concat(r[0]):t.concat(r.filter(Boolean).map((function(t){return RegExp("^"+i).test(t)?JSON.parse(t.split(i)[1]):t})))}),[])}}},e={};function r(i){var s=e[i];if(void 0!==s)return s.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,r),n.exports}r.d=(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var i={};(()=>{"use strict";function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}r.d(i,{default:()=>d});var e=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.size=t,this.entries=[],this.cursor=0}var r,i;return r=e,(i=[{key:"push",value:function(t){""!==t.trim()&&(t!==this.entries[this.entries.length-1]?(this.entries.push(t),this.entries.length>this.size&&this.entries.shift(0),this.cursor=this.entries.length):this.cursor=this.entries.length)}},{key:"rewind",value:function(){this.cursor=this.entries.length}},{key:"getPrevious",value:function(){var t=Math.max(0,this.cursor-1);return this.cursor=t,this.entries[t]}},{key:"getNext",value:function(){var t=Math.min(this.entries.length,this.cursor+1);return this.cursor=t,this.entries[t]}}])&&t(r.prototype,i),e}(),s=r(121);function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}function o(t){for(var e,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[],s=/\w+/g;e=s.exec(t);)r?i.push(e.index):i.push(e.index+e[0].length);return i}function a(t,e){var r=o(t,!0).reverse().find((function(t){return t<e}));return null==r?0:r}function h(t,e,r){for(var i=0,s=0,n=0;n<e;++n)("\n"==t.charAt(n)||(s+=1)>r)&&(s=0,i+=1);return{row:i,col:s}}function u(t,e){return h(t,t.length,e).row+1}function l(t){return null!=t.match(/[^\\][ \t]$/m)}function c(t){return""===t.trim()||l(t)?"":(0,s.Q)(t).pop()||""}function p(t,e){if(t.length>=e[0].length)return t;var r=t;t+=e[0].slice(t.length,t.length+1);for(var i=0;i<e.length;i++){if(!e[i].startsWith(r))return null;if(!e[i].startsWith(t))return r}return p(t,e)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var m=function(){function t(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,t),this.term=r,this._handleTermData=this.handleTermData.bind(this),this._handleTermResize=this.handleTermResize.bind(this),this.history=new e(i.historySize||10),this.maxAutocompleteEntries=i.maxAutocompleteEntries||100,this._autocompleteHandlers=[],this._active=!1,this._input="",this._cursor=0,this._activePrompt=null,this._activeCharPrompt=null,this._termSize={cols:0,rows:0},this._disposables=[],r&&(r.loadAddon?r.loadAddon(this):this.attach())}var r,i;return r=t,i=[{key:"activate",value:function(t){this.term=t,this.attach()}},{key:"dispose",value:function(){this.detach()}},{key:"detach",value:function(){this.term.off?(this.term.off("data",this._handleTermData),this.term.off("resize",this._handleTermResize)):(this._disposables.forEach((function(t){return t.dispose()})),this._disposables=[])}},{key:"attach",value:function(){this.term.on?(this.term.on("data",this._handleTermData),this.term.on("resize",this._handleTermResize)):(this._disposables.push(this.term.onData(this._handleTermData)),this._disposables.push(this.term.onResize(this._handleTermResize))),this._termSize={cols:this.term.cols,rows:this.term.rows}}},{key:"addAutocompleteHandler",value:function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];this._autocompleteHandlers.push({fn:t,args:r})}},{key:"removeAutocompleteHandler",value:function(t){var e=this._autocompleteHandlers.findIndex((function(e){return e.fn===t}));-1!==e&&this._autocompleteHandlers.splice(e,1)}},{key:"read",value:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"> ";return new Promise((function(i,s){e.term.write(t),e._activePrompt={prompt:t,continuationPrompt:r,resolve:i,reject:s},e._input="",e._cursor=0,e._active=!0}))}},{key:"readChar",value:function(t){var e=this;return new Promise((function(r,i){e.term.write(t),e._activeCharPrompt={prompt:t,resolve:r,reject:i}}))}},{key:"abortRead",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"aborted";null==this._activePrompt&&null==this._activeCharPrompt||this.term.write("\r\n"),null!=this._activePrompt&&(this._activePrompt.reject(t),this._activePrompt=null),null!=this._activeCharPrompt&&(this._activeCharPrompt.reject(t),this._activeCharPrompt=null),this._active=!1}},{key:"println",value:function(t){this.print(t+"\n")}},{key:"print",value:function(t){var e=t.replace(/[\r\n]+/g,"\n");this.term.write(e.replace(/\n/g,"\r\n"))}},{key:"printWide",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0==t.length)return println("");for(var r=t.reduce((function(t,e){return Math.max(t,e.length)}),0)+e,i=Math.floor(this._termSize.cols/r),s=Math.ceil(t.length/i),n=0,o=0;o<=s;++o){for(var a="",h=0;h<i;++h)if(n<t.length){var u=t[n++];a+=u+=" ".repeat(r-u.length)}this.println(a)}}},{key:"applyPrompts",value:function(t){var e=(this._activePrompt||{}).prompt||"",r=(this._activePrompt||{}).continuationPrompt||"";return e+t.replace(/\n/g,"\n"+r)}},{key:"applyPromptOffset",value:function(t,e){return this.applyPrompts(t.substr(0,e)).length}},{key:"clearInput",value:function(){for(var t=this.applyPrompts(this._input),e=u(t,this._termSize.cols),r=h(t,this.applyPromptOffset(this._input,this._cursor),this._termSize.cols),i=(r.col,e-r.row-1),s=0;s<i;++s)this.term.write("[E");for(this.term.write("\r[K"),s=1;s<e;++s)this.term.write("[F[K")}},{key:"setInput",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e&&this.clearInput();var r=this.applyPrompts(t);this.print(r),this._cursor>t.length&&(this._cursor=t.length);var i=this.applyPromptOffset(t,this._cursor),s=u(r,this._termSize.cols),n=h(r,i,this._termSize.cols),o=n.col,a=n.row,l=s-a-1;this.term.write("\r");for(var c=0;c<l;++c)this.term.write("[F");for(c=0;c<o;++c)this.term.write("[C");this._input=t}},{key:"printAndRestartPrompt",value:function(t){var e=this,r=this._cursor;this.setCursor(this._input.length),this.term.write("\r\n");var i=function(){e._cursor=r,e.setInput(e._input)},s=t();null==s?i():s.then(i)}},{key:"setCursor",value:function(t){t<0&&(t=0),t>this._input.length&&(t=this._input.length);var e=this.applyPrompts(this._input),r=(u(e,this._termSize.cols),h(e,this.applyPromptOffset(this._input,this._cursor),this._termSize.cols)),i=r.col,s=r.row,n=h(e,this.applyPromptOffset(this._input,t),this._termSize.cols),o=n.col,a=n.row;if(a>s)for(var l=s;l<a;++l)this.term.write("[B");else for(var c=a;c<s;++c)this.term.write("[A");if(o>i)for(var p=i;p<o;++p)this.term.write("[C");else for(var f=o;f<i;++f)this.term.write("[D");this._cursor=t}},{key:"handleCursorMove",value:function(t){if(t>0){var e=Math.min(t,this._input.length-this._cursor);this.setCursor(this._cursor+e)}else if(t<0){var r=Math.max(t,-this._cursor);this.setCursor(this._cursor+r)}}},{key:"handleCursorErase",value:function(t){var e=this._cursor,r=this._input;if(t){if(e<=0)return;var i=r.substr(0,e-1)+r.substr(e);this.clearInput(),this._cursor-=1,this.setInput(i,!1)}else{var s=r.substr(0,e)+r.substr(e+1);this.setInput(s)}}},{key:"handleCursorInsert",value:function(t){var e=this._cursor,r=this._input,i=r.substr(0,e)+t+r.substr(e);this._cursor+=t.length,this.setInput(i)}},{key:"handleReadComplete",value:function(){this.history&&this.history.push(this._input),this._activePrompt&&(this._activePrompt.resolve(this._input),this._activePrompt=null),this.term.write("\r\n"),this._active=!1}},{key:"handleTermResize",value:function(t){var e=t.rows,r=t.cols;this.clearInput(),this._termSize={cols:r,rows:e},this.setInput(this._input,!1)}},{key:"handleTermData",value:function(t){var e=this;if(this._active){if(null!=this._activeCharPrompt)return this._activeCharPrompt.resolve(t),this._activeCharPrompt=null,void this.term.write("\r\n");if(t.length>3&&27!==t.charCodeAt(0)){var r=t.replace(/[\r\n]+/g,"\r");Array.from(r).forEach((function(t){return e.handleData(t)}))}else this.handleData(t)}}},{key:"handleData",value:function(t){var e=this;if(this._active){var r,i,h,u,f=t.charCodeAt(0);if(27==f)switch(t.substr(1)){case"[A":if(this.history){var v=this.history.getPrevious();v&&(this.setInput(v),this.setCursor(v.length))}break;case"[B":if(this.history){var m=this.history.getNext();m||(m=""),this.setInput(m),this.setCursor(m.length)}break;case"[D":this.handleCursorMove(-1);break;case"[C":this.handleCursorMove(1);break;case"[3~":this.handleCursorErase(!1);break;case"[F":this.setCursor(this._input.length);break;case"[H":this.setCursor(0);break;case"b":null!=(r=a(this._input,this._cursor))&&this.setCursor(r);break;case"f":i=this._input,h=this._cursor,null!=(r=null==(u=o(i,!1).find((function(t){return t>h})))?i.length:u)&&this.setCursor(r);break;case"":null!=(r=a(this._input,this._cursor))&&(this.setInput(this._input.substr(0,r)+this._input.substr(this._cursor)),this.setCursor(r))}else if(f<32||127===f)switch(t){case"\r":!function(t){return""!=t.trim()&&((t.match(/'/g)||[]).length%2!=0||(t.match(/"/g)||[]).length%2!=0||""==t.split(/(\|\||\||&&)/g).pop().trim()||!(!t.endsWith("\\")||t.endsWith("\\\\")))}(this._input)?this.handleReadComplete():this.handleCursorInsert("\n");break;case"":this.handleCursorErase(!0);break;case"\t":if(this._autocompleteHandlers.length>0){var d=this._input.substr(0,this._cursor),_=function(t,e){var r=(0,s.Q)(e),i=r.length-1,o=r[i]||"";return""===e.trim()?(i=0,o=""):l(e)&&(i+=1,o=""),t.reduce((function(t,e){var s,o=e.fn,a=e.args;try{return t.concat(o.apply(void 0,[i,r].concat(function(t){if(Array.isArray(t))return n(t)}(s=a)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(s)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())))}catch(e){return console.error("Auto-complete error:",e),t}}),[]).filter((function(t){return t.startsWith(o)}))}(this._autocompleteHandlers,d);if(_.sort(),0===_.length);else if(1===_.length){var g=c(d);if(_[0].includes(" ")){var y="".concat(this._input.slice(0,-g.length),'"').concat(_[0],'"');this.setInput(y),this.setCursor(y.length)}else this.handleCursorInsert(_[0].substr(g.length))}else if(_.length<=this.maxAutocompleteEntries){var b=p(d,_);if(b){var w=c(d);this.handleCursorInsert(b.substr(w.length))}this.printAndRestartPrompt((function(){e.printWide(_)}))}else this.printAndRestartPrompt((function(){return e.readChar("Display all ".concat(_.length," possibilities? (y or n)")).then((function(t){"y"!=t&&"Y"!=t||e.printWide(_)}))}))}else this.handleCursorInsert("    ");break;case"":this.setCursor(this._input.length),this.term.write("^C\r\n"+((this._activePrompt||{}).prompt||"")),this._input="",this._cursor=0,this.history&&this.history.rewind()}else this.handleCursorInsert(t)}}}],i&&v(r.prototype,i),t}();const d=m})(),LocalEchoController=i.default})();