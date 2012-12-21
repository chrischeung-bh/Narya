(function(a,b){typeof exports!="undefined"?b(a,exports,require("underscore")):typeof define=="function"&&define.amd?define(["underscore","exports"],function(c,d){a.Backbone=b(a,d,c,$)}):a.Backbone=b(a,{},a._)})(this,function(a,b,c){var d=a.Backbone,e=Array.prototype.slice,f=Array.prototype.splice;b.VERSION="0.9.2",b.setDomLibrary=function(a){$=a},b.noConflict=function(){return a.Backbone=d,b},b.emulateHTTP=!1,b.emulateJSON=!1;var g=/\s+/,h=b.Events={on:function(a,b,c){var d,e,f,h,i;if(!b)return this;a=a.split(g),d=this._callbacks||(this._callbacks={});while(e=a.shift())i=d[e],f=i?i.tail:{},f.next=h={},f.context=c,f.callback=b,d[e]={tail:h,next:i?i.next:f};return this},off:function(a,b,d){var e,f,h,i,j,k;if(!(f=this._callbacks))return;if(!(a||b||d))return delete this._callbacks,this;a=a?a.split(g):c.keys(f);while(e=a.shift()){h=f[e],delete f[e];if(!h||!b&&!d)continue;i=h.tail;while((h=h.next)!==i)j=h.callback,k=h.context,(b&&j!==b||d&&k!==d)&&this.on(e,j,k)}return this},trigger:function(a){var b,c,d,f,h,i,j;if(!(d=this._callbacks))return this;i=d.all,a=a.split(g),j=e.call(arguments,1);while(b=a.shift()){if(c=d[b]){f=c.tail;while((c=c.next)!==f)c.callback.apply(c.context||this,j)}if(c=i){f=c.tail,h=[b].concat(j);while((c=c.next)!==f)c.callback.apply(c.context||this,h)}}return this}};h.bind=h.on,h.unbind=h.off;var i=b.Model=function(a,b){var d;a||(a={}),b&&b.parse&&(a=this.parse(a));if(d=z(this,"defaults"))a=c.extend({},d,a);b&&b.collection&&(this.collection=b.collection),this.attributes={},this._escapedAttributes={},this.cid=c.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(a,{silent:!0}),this.changed={},this._silent={},this._pending={},this._previousAttributes=c.clone(this.attributes),this.initialize.apply(this,arguments)};c.extend(i.prototype,h,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(a){return c.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;var d=this.get(a);return this._escapedAttributes[a]=c.escape(d==null?"":""+d)},has:function(a){return this.get(a)!=null},set:function(a,b,d){var e,f,g;c.isObject(a)||a==null?(e=a,d=b):(e={},e[a]=b),d||(d={});if(!e)return this;e instanceof i&&(e=e.attributes);if(d.unset)for(f in e)e[f]=void 0;if(!this._validate(e,d))return!1;this.idAttribute in e&&(this.id=e[this.idAttribute]);var h=d.changes={},j=this.attributes,k=this._escapedAttributes,l=this._previousAttributes||{};for(f in e){g=e[f];if(!c.isEqual(j[f],g)||d.unset&&c.has(j,f))delete k[f],(d.silent?this._silent:h)[f]=!0;d.unset?delete j[f]:j[f]=g,!c.isEqual(l[f],g)||c.has(j,f)!=c.has(l,f)?(this.changed[f]=g,d.silent||(this._pending[f]=!0)):(delete this.changed[f],delete this._pending[f])}return d.silent||this.change(d),this},unset:function(a,b){return(b||(b={})).unset=!0,this.set(a,null,b)},clear:function(a){return(a||(a={})).unset=!0,this.set(c.clone(this.attributes),a)},fetch:function(a){a=a?c.clone(a):{};var d=this,e=a.success;return a.success=function(b,c,f){if(!d.set(d.parse(b,f),a))return!1;e&&e(d,b)},a.error=b.wrapError(a.error,d,a),(this.sync||b.sync).call(this,"read",this,a)},save:function(a,d,e){var f,g;c.isObject(a)||a==null?(f=a,e=d):(f={},f[a]=d),e=e?c.clone(e):{};if(e.wait){if(!this._validate(f,e))return!1;g=c.clone(this.attributes)}var h=c.extend({},e,{silent:!0});if(f&&!this.set(f,e.wait?h:e))return!1;var i=this,j=e.success;e.success=function(a,b,d){var g=i.parse(a,d);e.wait&&(delete e.wait,g=c.extend(f||{},g));if(!i.set(g,e))return!1;j?j(i,a):i.trigger("sync",i,a,e)},e.error=b.wrapError(e.error,i,e);var k=this.isNew()?"create":"update",l=(this.sync||b.sync).call(this,k,this,e);return e.wait&&this.set(g,h),l},destroy:function(a){a=a?c.clone(a):{};var d=this,e=a.success,f=function(){d.trigger("destroy",d,d.collection,a)};if(this.isNew())return f(),!1;a.success=function(b){a.wait&&f(),e?e(d,b):d.trigger("sync",d,b,a)},a.error=b.wrapError(a.error,d,a);var g=(this.sync||b.sync).call(this,"delete",this,a);return a.wait||f(),g},url:function(){var a=z(this,"urlRoot")||z(this.collection,"url")||A();return this.isNew()?a:a+(a.charAt(a.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a,b){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var d in this._silent)this._pending[d]=!0;var e=c.extend({},a.changes,this._silent);this._silent={};for(var d in e)this.trigger("change:"+d,this,this.get(d),a);if(b)return this;while(!c.isEmpty(this._pending)){this._pending={},this.trigger("change",this,a);for(var d in this.changed){if(this._pending[d]||this._silent[d])continue;delete this.changed[d]}this._previousAttributes=c.clone(this.attributes)}return this._changing=!1,this},hasChanged:function(a){return arguments.length?c.has(this.changed,a):!c.isEmpty(this.changed)},changedAttributes:function(a){if(!a)return this.hasChanged()?c.clone(this.changed):!1;var b,d=!1,e=this._previousAttributes;for(var f in a){if(c.isEqual(e[f],b=a[f]))continue;(d||(d={}))[f]=b}return d},previous:function(a){return!arguments.length||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return c.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;a=c.extend({},this.attributes,a);var d=this.validate(a,b);return d?(b&&b.error?b.error(this,d,b):this.trigger("error",this,d,b),!1):!0}});var j=b.Collection=function(a,b){b||(b={}),b.model&&(this.model=b.model),b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,{silent:!0,parse:b.parse})};c.extend(j.prototype,h,{model:i,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var d,e,g,h,i,j,k={},l={},m=[];b||(b={}),a=c.isArray(a)?a.slice():[a];for(d=0,g=a.length;d<g;d++){if(!(h=a[d]=this._prepareModel(a[d],b)))throw new Error("Can't add an invalid model to a collection");i=h.cid,j=h.id;if(k[i]||this._byCid[i]||j!=null&&(l[j]||this._byId[j])){m.push(d);continue}k[i]=l[j]=h}d=m.length;while(d--)a.splice(m[d],1);for(d=0,g=a.length;d<g;d++)(h=a[d]).on("all",this._onModelEvent,this),this._byCid[h.cid]=h,h.id!=null&&(this._byId[h.id]=h);this.length+=g,e=b.at!=null?b.at:this.models.length,f.apply(this.models,[e,0].concat(a)),this.comparator&&this.sort({silent:!0});if(b.silent)return this;for(d=0,g=this.models.length;d<g;d++){if(!k[(h=this.models[d]).cid])continue;b.index=d,h.trigger("add",h,this,b)}return this},remove:function(a,b){var d,e,f,g;b||(b={}),a=c.isArray(a)?a.slice():[a];for(d=0,e=a.length;d<e;d++){g=this.getByCid(a[d])||this.get(a[d]);if(!g)continue;delete this._byId[g.id],delete this._byCid[g.cid],f=this.indexOf(g),this.models.splice(f,1),this.length--,b.silent||(b.index=f,g.trigger("remove",g,this,b)),this._removeReference(g)}return this},push:function(a,b){return a=this._prepareModel(a,b),this.add(a,b),a},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return a=this._prepareModel(a,b),this.add(a,c.extend({at:0},b)),a},shift:function(a){var b=this.at(0);return this.remove(b,a),b},get:function(a){return a==null?void 0:this._byId[a.id!=null?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return c.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){a||(a={});if(!this.comparator)throw new Error("Cannot sort a set without a comparator");var b=c.bind(this.comparator,this);return this.comparator.length==1?this.models=this.sortBy(b):this.models.sort(b),a.silent||this.trigger("reset",this,a),this},pluck:function(a){return c.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]),b||(b={});for(var d=0,e=this.models.length;d<e;d++)this._removeReference(this.models[d]);return this._reset(),this.add(a,c.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),this},fetch:function(a){a=a?c.clone(a):{},a.parse===undefined&&(a.parse=!0);var d=this,e=a.success;return a.success=function(b,c,f){d[a.add?"add":"reset"](d.parse(b,f),a),e&&e(d,b)},a.error=b.wrapError(a.error,d,a),(this.sync||b.sync).call(this,"read",this,a)},create:function(a,b){var d=this;b=b?c.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||d.add(a,b);var e=b.success;return b.success=function(c,f,g){b.wait&&d.add(c,b),e?e(c,f):c.trigger("sync",a,f,b)},a.save(null,b),a},parse:function(a,b){return a},chain:function(){return c(this.models).chain()},_reset:function(a){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(a,b){b||(b={});if(a instanceof i)a.collection||(a.collection=this);else{var c=a;b.collection=this,a=new this.model(c,b),a._validate(a.attributes,b)||(a=!1)}return a},_removeReference:function(a){this==a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){if(a!="add"&&a!="remove"||c==this)a=="destroy"&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments);else return}});var k=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];c.each(k,function(a){j.prototype[a]=function(){return c[a].apply(c,[this.models].concat(c.toArray(arguments)))}});var l=b.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},m=/:\w+/g,n=/\*\w+/g,o=/[-[\]{}()+?.,\\^$|#\s]/g;c.extend(l.prototype,h,{initialize:function(){},route:function(a,d,e){return b.history||(b.history=new p),c.isRegExp(a)||(a=this._routeToRegExp(a)),e||(e=this[d]),b.history.route(a,c.bind(function(c){var f=this._extractParameters(a,c);e&&e.apply(this,f),this.trigger.apply(this,["route:"+d].concat(f)),b.history.trigger("route",this,d,f)},this)),this},navigate:function(a,c){b.history.navigate(a,c)},_bindRoutes:function(){if(!this.routes)return;var a=[];for(var b in this.routes)a.unshift([b,this.routes[b]]);for(var c=0,d=a.length;c<d;c++)this.route(a[c][0],a[c][1],this[a[c][1]])},_routeToRegExp:function(a){return a=a.replace(o,"\\$&").replace(m,"([^/]+)").replace(n,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var p=b.History=function(){this.handlers=[],c.bindAll(this,"checkUrl")},q=/^[#\/]/,r=/msie [\w.]+/;p.started=!1,c.extend(p.prototype,h,{interval:50,getHash:function(a){var b=a?a.location:window.location,c=b.href.match(/#(.*)$/);return c?c[1]:""},getFragment:function(a,b){if(a==null)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c)}else a=this.getHash();return a.indexOf(this.options.root)||(a=a.substr(this.options.root.length)),a.replace(q,"")},start:function(a){if(p.started)throw new Error("Backbone.history has already been started");p.started=!0,this.options=c.extend({},{root:"/"},this.options,a),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var b=this.getFragment(),d=document.documentMode,e=r.exec(navigator.userAgent.toLowerCase())&&(!d||d<=7);e&&(this.iframe=$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(b)),this._hasPushState?$(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!e?$(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=b;var f=window.location,g=f.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!g)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&g&&f.hash&&(this.fragment=this.getHash().replace(q,""),window.history.replaceState({},document.title,f.protocol+"//"+f.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){$(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),p.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(a){var b=this.getFragment();b==this.fragment&&this.iframe&&(b=this.getFragment(this.getHash(this.iframe)));if(b==this.fragment)return!1;this.iframe&&this.navigate(b),this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a),d=c.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0});return d},navigate:function(a,b){if(!p.started)return!1;if(!b||b===!0)b={trigger:b};var c=(a||"").replace(q,"");if(this.fragment==c)return;this._hasPushState?(c.indexOf(this.options.root)!=0&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a)},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var s=b.View=function(a){this.cid=c.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},t=/^(\S+)\s*(.*)$/,u=["model","collection","el","id","attributes","className","tagName"];c.extend(s.prototype,h,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(a,b,c){var d=document.createElement(a);return b&&$(d).attr(b),c!=null&&$(d).html(c),d},setElement:function(a,b){return this.$el&&this.undelegateEvents(),this.$el=a instanceof $?a:$(a),this.el=this.$el[0],b!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(!a&&!(a=z(this,"events")))return;this.undelegateEvents();for(var b in a){var d=a[b];c.isFunction(d)||(d=this[a[b]]);if(!d)throw new Error('Method "'+a[b]+'" does not exist');var e=b.match(t),f=e[1],g=e[2];d=c.bind(d,this),f+=".delegateEvents"+this.cid,g===""?this.$el.bind(f,d):this.$el.delegate(g,f,d)}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=c.extend({},this.options,a));for(var b=0,d=u.length;b<d;b++){var e=u[b];a[e]&&(this[e]=a[e])}this.options=a},_ensureElement:function(){if(!this.el){var a=z(this,"attributes")||{};this.id&&(a.id=this.id),this.className&&(a["class"]=this.className),this.setElement(this.make(this.tagName,a),!1)}else this.setElement(this.el,!1)}});var v=function(a,b){var c=y(this,a,b);return c.extend=this.extend,c};i.extend=j.extend=l.extend=s.extend=v;var w={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};b.sync=function(a,d,e){var f=w[a];e||(e={});var g={type:f,dataType:"json"};return e.url||(g.url=z(d,"url")||A()),!e.data&&d&&(a=="create"||a=="update")&&(g.contentType="application/json",g.data=JSON.stringify(d.toJSON())),b.emulateJSON&&(g.contentType="application/x-www-form-urlencoded",g.data=g.data?{model:g.data}:{}),b.emulateHTTP&&(f==="PUT"||f==="DELETE")&&(b.emulateJSON&&(g.data._method=f),g.type="POST",g.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",f)}),g.type!=="GET"&&!b.emulateJSON&&(g.processData=!1),$.ajax(c.extend(g,e))},b.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d,a?a(b,e,c):b.trigger("error",b,e,c)}};var x=function(){},y=function(a,b,d){var e;return b&&b.hasOwnProperty("constructor")?e=b.constructor:e=function(){a.apply(this,arguments)},c.extend(e,a),x.prototype=a.prototype,e.prototype=new x,b&&c.extend(e.prototype,b),d&&c.extend(e,d),e.prototype.constructor=e,e.__super__=a.prototype,e},z=function(a,b){return!a||!a[b]?null:c.isFunction(a[b])?a[b]():a[b]},A=function(){throw new Error('A "url" property or function must be specified')};return b})