!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){(function(){function Lexer(options){this.tokens=[],this.tokens.links={},this.options=options||marked.defaults,this.rules=block.normal,this.options.gfm&&(this.options.tables?this.rules=block.tables:this.rules=block.gfm)}function InlineLexer(links,options){if(this.options=options||marked.defaults,this.links=links,this.rules=inline.normal,this.renderer=this.options.renderer||new Renderer,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=inline.breaks:this.rules=inline.gfm:this.options.pedantic&&(this.rules=inline.pedantic)}function Renderer(options){this.options=options||{}}function Parser(options){this.tokens=[],this.token=null,this.options=options||marked.defaults,this.options.renderer=this.options.renderer||new Renderer,this.renderer=this.options.renderer,this.renderer.options=this.options}function escape(html,encode){return html.replace(encode?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){return n=n.toLowerCase(),"colon"===n?":":"#"===n.charAt(0)?"x"===n.charAt(1)?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""})}function replace(regex,opt){return regex=regex.source,opt=opt||"",function self(name,val){return name?(val=val.source||val,val=val.replace(/(^|[^\[])\^/g,"$1"),regex=regex.replace(name,val),self):new RegExp(regex,opt)}}function noop(){}function merge(obj){for(var target,key,i=1;i<arguments.length;i++){target=arguments[i];for(key in target)Object.prototype.hasOwnProperty.call(target,key)&&(obj[key]=target[key])}return obj}function marked(src,opt,callback){if(callback||"function"==typeof opt){callback||(callback=opt,opt=null),opt=merge({},marked.defaults,opt||{});var tokens,pending,highlight=opt.highlight,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err)return opt.highlight=highlight,callback(err);var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}return opt.highlight=highlight,err?callback(err):callback(null,out)};if(!highlight||highlight.length<3)return done();if(delete opt.highlight,!pending)return done();for(;i<tokens.length;i++)!function(token){return"code"!==token.type?--pending||done():highlight(token.text,token.lang,function(err,code){return err?done(err):null==code||code===token.text?--pending||done():(token.text=code,token.escaped=!0,void(--pending||done()))})}(tokens[i])}else try{return opt&&(opt=merge({},marked.defaults,opt)),Parser.parse(Lexer.lex(src,opt),opt)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(opt||marked.defaults).silent)return"<p>An error occured:</p><pre>"+escape(e.message+"",!0)+"</pre>";throw e}}var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/,block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,block.item=replace(block.item,"gm")(/bull/g,block.bullet)(),block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")(),block.blockquote=replace(block.blockquote)("def",block.def)(),block._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)(),block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)(),block.normal=merge({},block),block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")(),block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),Lexer.rules=block,Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)},Lexer.prototype.lex=function(src){return src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(src,!0)},Lexer.prototype.token=function(src,top,bq){for(var next,loose,cap,bull,b,item,space,i,l,src=src.replace(/^ +$/gm,"");src;)if((cap=this.rules.newline.exec(src))&&(src=src.substring(cap[0].length),cap[0].length>1&&this.tokens.push({type:"space"})),cap=this.rules.code.exec(src))src=src.substring(cap[0].length),cap=cap[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?cap:cap.replace(/\n+$/,"")});else if(cap=this.rules.fences.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});else if(cap=this.rules.heading.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});else if(top&&(cap=this.rules.nptable.exec(src))){for(src=src.substring(cap[0].length),item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")},i=0;i<item.align.length;i++)/^ *-+: *$/.test(item.align[i])?item.align[i]="right":/^ *:-+: *$/.test(item.align[i])?item.align[i]="center":/^ *:-+ *$/.test(item.align[i])?item.align[i]="left":item.align[i]=null;for(i=0;i<item.cells.length;i++)item.cells[i]=item.cells[i].split(/ *\| */);this.tokens.push(item)}else if(cap=this.rules.lheading.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"heading",depth:"="===cap[2]?1:2,text:cap[1]});else if(cap=this.rules.hr.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"hr"});else if(cap=this.rules.blockquote.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"blockquote_start"}),cap=cap[0].replace(/^ *> ?/gm,""),this.token(cap,top,!0),this.tokens.push({type:"blockquote_end"});else if(cap=this.rules.list.exec(src)){for(src=src.substring(cap[0].length),bull=cap[2],this.tokens.push({type:"list_start",ordered:bull.length>1}),cap=cap[0].match(this.rules.item),next=!1,l=cap.length,i=0;i<l;i++)item=cap[i],space=item.length,item=item.replace(/^ *([*+-]|\d+\.) +/,""),~item.indexOf("\n ")&&(space-=item.length,item=this.options.pedantic?item.replace(/^ {1,4}/gm,""):item.replace(new RegExp("^ {1,"+space+"}","gm"),"")),this.options.smartLists&&i!==l-1&&(b=block.bullet.exec(cap[i+1])[0],bull===b||bull.length>1&&b.length>1||(src=cap.slice(i+1).join("\n")+src,i=l-1)),loose=next||/\n\n(?!\s*$)/.test(item),i!==l-1&&(next="\n"===item.charAt(item.length-1),loose||(loose=next)),this.tokens.push({type:loose?"loose_item_start":"list_item_start"}),this.token(item,!1,bq),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(cap=this.rules.html.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===cap[1]||"script"===cap[1]||"style"===cap[1]),text:cap[0]});else if(!bq&&top&&(cap=this.rules.def.exec(src)))src=src.substring(cap[0].length),this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};else if(top&&(cap=this.rules.table.exec(src))){for(src=src.substring(cap[0].length),item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")},i=0;i<item.align.length;i++)/^ *-+: *$/.test(item.align[i])?item.align[i]="right":/^ *:-+: *$/.test(item.align[i])?item.align[i]="center":/^ *:-+ *$/.test(item.align[i])?item.align[i]="left":item.align[i]=null;for(i=0;i<item.cells.length;i++)item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(item)}else if(top&&(cap=this.rules.paragraph.exec(src)))src=src.substring(cap[0].length),this.tokens.push({type:"paragraph",text:"\n"===cap[1].charAt(cap[1].length-1)?cap[1].slice(0,-1):cap[1]});else if(cap=this.rules.text.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"text",text:cap[0]});else if(src)throw new Error("Infinite loop on byte: "+src.charCodeAt(0));return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)(),inline.reflink=replace(inline.reflink)("inside",inline._inside)(),inline.normal=merge({},inline),inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()}),inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()}),InlineLexer.rules=inline,InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)},InlineLexer.prototype.output=function(src){for(var link,text,href,cap,out="";src;)if(cap=this.rules.escape.exec(src))src=src.substring(cap[0].length),out+=cap[1];else if(cap=this.rules.autolink.exec(src))src=src.substring(cap[0].length),"@"===cap[2]?(text=":"===cap[1].charAt(6)?this.mangle(cap[1].substring(7)):this.mangle(cap[1]),href=this.mangle("mailto:")+text):(text=escape(cap[1]),href=text),out+=this.renderer.link(href,null,text);else if(this.inLink||!(cap=this.rules.url.exec(src))){if(cap=this.rules.tag.exec(src))!this.inLink&&/^<a /i.test(cap[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(cap[0])&&(this.inLink=!1),src=src.substring(cap[0].length),out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];else if(cap=this.rules.link.exec(src))src=src.substring(cap[0].length),this.inLink=!0,out+=this.outputLink(cap,{href:cap[2],title:cap[3]}),this.inLink=!1;else if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){if(src=src.substring(cap[0].length),link=(cap[2]||cap[1]).replace(/\s+/g," "),link=this.links[link.toLowerCase()],!link||!link.href){out+=cap[0].charAt(0),src=cap[0].substring(1)+src;continue}this.inLink=!0,out+=this.outputLink(cap,link),this.inLink=!1}else if(cap=this.rules.strong.exec(src))src=src.substring(cap[0].length),out+=this.renderer.strong(this.output(cap[2]||cap[1]));else if(cap=this.rules.em.exec(src))src=src.substring(cap[0].length),out+=this.renderer.em(this.output(cap[2]||cap[1]));else if(cap=this.rules.code.exec(src))src=src.substring(cap[0].length),out+=this.renderer.codespan(escape(cap[2],!0));else if(cap=this.rules.br.exec(src))src=src.substring(cap[0].length),out+=this.renderer.br();else if(cap=this.rules.del.exec(src))src=src.substring(cap[0].length),out+=this.renderer.del(this.output(cap[1]));else if(cap=this.rules.text.exec(src))src=src.substring(cap[0].length),out+=this.renderer.text(escape(this.smartypants(cap[0])));else if(src)throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}else src=src.substring(cap[0].length),text=escape(cap[1]),href=text,out+=this.renderer.link(href,null,text);return out},InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return"!"!==cap[0].charAt(0)?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))},InlineLexer.prototype.smartypants=function(text){return this.options.smartypants?text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):text},InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;for(var ch,out="",l=text.length,i=0;i<l;i++)ch=text.charCodeAt(i),Math.random()>.5&&(ch="x"+ch.toString(16)),out+="&#"+ch+";";return out},Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);null!=out&&out!==code&&(escaped=!0,code=out)}return lang?'<pre><code class="'+this.options.langPrefix+escape(lang,!0)+'">'+(escaped?code:escape(code,!0))+"\n</code></pre>\n":"<pre><code>"+(escaped?code:escape(code,!0))+"\n</code></pre>"},Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"},Renderer.prototype.html=function(html){return html},Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"},Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"},Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"},Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"},Renderer.prototype.table=function(header,body){return"<table>\n<thead>\n"+header+"</thead>\n<tbody>\n"+body+"</tbody>\n</table>\n"},Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"},Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td",tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"},Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"},Renderer.prototype.em=function(text){return"<em>"+text+"</em>"},Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"},Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},Renderer.prototype.del=function(text){return"<del>"+text+"</del>"},Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(0===prot.indexOf("javascript:")||0===prot.indexOf("vbscript:"))return""}var out='<a href="'+href+'"';return title&&(out+=' title="'+title+'"'),out+=">"+text+"</a>"},Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';return title&&(out+=' title="'+title+'"'),out+=this.options.xhtml?"/>":">"},Renderer.prototype.text=function(text){return text},Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)},Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer),this.tokens=src.reverse();for(var out="";this.next();)out+=this.tok();return out},Parser.prototype.next=function(){return this.token=this.tokens.pop()},Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},Parser.prototype.parseText=function(){for(var body=this.token.text;"text"===this.peek().type;)body+="\n"+this.next().text;return this.inline.output(body)},Parser.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var i,row,cell,flags,j,header="",body="";for(cell="",i=0;i<this.token.header.length;i++)flags={header:!0,align:this.token.align[i]},cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:!0,align:this.token.align[i]});for(header+=this.renderer.tablerow(cell),i=0;i<this.token.cells.length;i++){for(row=this.token.cells[i],cell="",j=0;j<row.length;j++)cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:!1,align:this.token.align[j]});body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body);case"blockquote_start":for(var body="";"blockquote_end"!==this.next().type;)body+=this.tok();return this.renderer.blockquote(body);case"list_start":for(var body="",ordered=this.token.ordered;"list_end"!==this.next().type;)body+=this.tok();return this.renderer.list(body,ordered);case"list_item_start":for(var body="";"list_item_end"!==this.next().type;)body+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(body);case"loose_item_start":for(var body="";"list_item_end"!==this.next().type;)body+=this.tok();return this.renderer.listitem(body);case"html":var html=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(html);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},noop.exec=noop,marked.options=marked.setOptions=function(opt){return merge(marked.defaults,opt),marked},marked.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new Renderer,xhtml:!1},marked.Parser=Parser,marked.parser=Parser.parse,marked.Renderer=Renderer,marked.Lexer=Lexer,marked.lexer=Lexer.lex,marked.InlineLexer=InlineLexer,marked.inlineLexer=InlineLexer.output,marked.parse=marked,"undefined"!=typeof module&&"object"==typeof exports?module.exports=marked:"function"==typeof define&&define.amd?define(function(){return marked}):this.marked=marked}).call(function(){return this||("undefined"!=typeof window?window:global)}())}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _index=require("./client/index.js"),_index2=_interopRequireDefault(_index);_index2["default"].render()},{"./client/index.js":4}],3:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){var werk=window.chartwerk,chart=$("#chart");chart.css({position:"relative"}),$("#chart .annotation.label").remove(),werk.text.annotations.forEach(function(d,i){if("d"===d.size&&"double"===werk.ui.size||"s"===d.size&&"single"===werk.ui.size){var text=_utils2["default"].inlineLexer(d.text,[]),annotation='<div class="annotation label" data-id="'+i+'">\n        <div class="inner center">\n          <p>'+text+"</p>\n        </div>\n      </div>";$(annotation).css({position:"absolute",left:d.x,top:d.y,width:d.w,height:"auto",color:d.color||_colors.black}).addClass(function(){var cls=d.align+" "+d.fontSize;return cls=d.background?cls+" bg":cls}).appendTo(chart)}})};var _utils=require("./../misc/utils"),_utils2=_interopRequireDefault(_utils),_colors=require("./../constants/colors")},{"./../constants/colors":8,"./../misc/utils":9}],4:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _size=require("./size"),_size2=_interopRequireDefault(_size),_text=require("./text"),_text2=_interopRequireDefault(_text),_legend=require("./legend"),_legend2=_interopRequireDefault(_legend),_annotations=require("./annotations"),_annotations2=_interopRequireDefault(_annotations);exports["default"]={render:function(){(0,_size2["default"])(),window.draw(),(0,_text2["default"])(),(0,_legend2["default"])(),(0,_annotations2["default"])()}}},{"./annotations":3,"./legend":5,"./size":6,"./text":7}],5:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){var werk=window.chartwerk;if(werk.text.legend.active){var display=werk.text.legend[werk.ui.size],background=display.background?"bg":"",align=display.align,position=display.position,legendContainer=display.inside?$("#chart"):$("#chart-legend"),legendStyles=display.inside?{width:display.width,top:position.y,left:position.x,position:"absolute"}:{width:display.width},legend='<div class="chart-legend-container clearfix '+align+" "+background+'">\n        <div class="title">\n          '+_utils2["default"].inlineLexer(werk.text.legend.title,[])+"\n        </div>\n      </div>";$(legend).css(legendStyles).appendTo(legendContainer),werk.text.legend.keys.forEach(function(k){var spread=100/werk.axes.color.range.length,key=werk.axes.color.quantize?'<div\n          class="key quantized"\n          style="width: '+spread+'%;"\n        >\n          <div\n            class="key-label"\n            style="border-top: 12px solid '+k.color+';"\n          >'+_utils2["default"].inlineLexer(k.text,[])+"</div>\n        </div>":'<div class="key">\n          <div\n            class="key-color"\n            style="color: '+k.color+';"\n          >&#9724;</div>\n          <div class="key-label">'+_utils2["default"].inlineLexer(k.text,[])+"</div>\n        </div>";$(key).appendTo($(".chart-legend-container"))})}};var _utils=require("./../misc/utils"),_utils2=_interopRequireDefault(_utils)},{"./../misc/utils":9}],6:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){"single"===window.chartwerk.ui.size&&$("#chartwerk").addClass("single")}},{}],7:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){$("#chartwerk #headline").html(_utils2["default"].inlineLexer(window.chartwerk.text.headline,[])),$("#chartwerk #chatter").html(_utils2["default"].inlineLexer(window.chartwerk.text.chatter,[])),$("#chartwerk #footnote").html(_utils2["default"].inlineLexer(window.chartwerk.text.footnote,[])),$("#chartwerk #source").html(_utils2["default"].inlineLexer(window.chartwerk.text.source,[])),$("#chartwerk #author").html(_utils2["default"].inlineLexer(window.chartwerk.text.author,[]))};var _utils=require("./../misc/utils"),_utils2=_interopRequireDefault(_utils)},{"./../misc/utils":9}],8:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={categorical:{"default":["#329CEB","#E34E36","#FF8F24","#FEC44F","#52B033","#8554BF","#6DCCF2","#C9C9C9"]},sequential:{red:["#f5c8c1","#eea89e","#e8887a","#e26856","#dc4730","#c13621","#9d2c1b","#700f00"],blue:["#cfebff","#a5dbff","#7bc2f2","#5cb5f2","#359fe6","#2487c9","#0267ab","#004a7a"],green:["#d9ebc3","#bde388","#a2cf63","#7bc049","#65a835","#4e941b","#327303","#245400"],warm:["#ffe261","#ffc226","#ffa310","#f57f00","#e35000","#cc3300","#a31600","#700f00"],cool:["#d4f2cb","#ace6b1","#8bd9b9","#5ac9c1","#2cb9c7","#0c94c2","#0275c2","#004a7a"]},diverging:{redBlue:["#0078d1","#299aee","#5ab5fa","#99d3ff","#f7a699","#f57864","#e34e36","#c42c14"],redBlueMix:["#0064c2","#2985f2","#7e94f7","#aea4fc","#d99ee8","#de7cbf","#ce5269","#ba230b"],redGreen:["#c12e17","#ea652b","#fc9943","#fcc857","#bee16d","#99cf51","#6ebe34","#539f1e"],orangePurple:["#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788"]}};exports.black="#2d3035"},{}],9:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _marked=require("marked"),_marked2=_interopRequireDefault(_marked);_marked2["default"].setOptions({smartypants:!0}),exports["default"]=_marked2["default"]},{marked:1}]},{},[2]);
//# sourceMappingURL=client.bundle.js.map
