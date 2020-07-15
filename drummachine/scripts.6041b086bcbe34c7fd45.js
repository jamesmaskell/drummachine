!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var t=this||n;if(e=parseFloat(e),t.ctx||s(),void 0!==e&&e>=0&&e<=1){if(t._volume=e,t._muted)return t;t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e,n.ctx.currentTime);for(var o=0;o<t._howls.length;o++)if(!t._howls[o]._webAudio)for(var r=t._howls[o]._getSoundIds(),a=0;a<r.length;a++){var i=t._howls[o]._soundById(r[a]);i&&i._node&&(i._node.volume=i._volume*e)}return t}return t._volume},mute:function(e){var t=this||n;t.ctx||s(),t._muted=e,t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e?0:t._volume,n.ctx.currentTime);for(var o=0;o<t._howls.length;o++)if(!t._howls[o]._webAudio)for(var r=t._howls[o]._getSoundIds(),a=0;a<r.length;a++){var i=t._howls[o]._soundById(r[a]);i&&i._node&&(i._node.muted=!!e||i._muted)}return t},stop:function(){for(var e=this||n,t=0;t<e._howls.length;t++)e._howls[t].stop();return e},unload:function(){for(var e=this||n,t=e._howls.length-1;t>=0;t--)e._howls[t].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,s()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{(new Audio).muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,t=null;try{t="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!t||"function"!=typeof t.canPlayType)return e;var o=t.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),a=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(a||!o&&!t.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!o,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(t.canPlayType("audio/x-m4b;")||t.canPlayType("audio/m4b;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||n;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var t=function(n){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var o=new Audio;o._unlocked=!0,e._releaseHtml5Audio(o)}catch(n){e.noAudio=!0;break}for(var r=0;r<e._howls.length;r++)if(!e._howls[r]._webAudio)for(var a=e._howls[r]._getSoundIds(),i=0;i<a.length;i++){var u=e._howls[r]._soundById(a[i]);u&&u._node&&!u._node._unlocked&&(u._node._unlocked=!0,u._node.load())}e._autoResume();var d=e.ctx.createBufferSource();d.buffer=e._scratchBuffer,d.connect(e.ctx.destination),void 0===d.start?d.noteOn(0):d.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),d.onended=function(){d.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",t,!0),document.removeEventListener("touchend",t,!0),document.removeEventListener("click",t,!0);for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("unlock")}};return document.addEventListener("touchstart",t,!0),document.addEventListener("touchend",t,!0),document.addEventListener("click",t,!0),e}},_obtainHtml5Audio:function(){var e=this||n;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var t=(new Audio).play();return t&&"undefined"!=typeof Promise&&(t instanceof Promise||"function"==typeof t.then)&&t.catch((function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")})),new Audio},_releaseHtml5Audio:function(e){var t=this||n;return e._unlocked&&t._html5AudioPool.push(e),t},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&n.usingWebAudio){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var o=0;o<e._howls[t]._sounds.length;o++)if(!e._howls[t]._sounds[o]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout((function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending";var n=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(n,n)}}),3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then((function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")})),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,t=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")};t.prototype={init:function(e){var t=this;return n.ctx||s(),t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._playLock=!1,t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onunlock=e.onunlock?[{fn:e.onunlock}]:[],t._onresume=[],t._webAudio=n.usingWebAudio&&!t._html5,void 0!==n.ctx&&n.ctx&&n.autoUnlock&&n._unlockAudio(),n._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&"none"!==t._preload&&t.load(),t},load:function(){var e=this,t=null;if(!n.noAudio){"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var i,u;if(e._format&&e._format[r])i=e._format[r];else{if("string"!=typeof(u=e._src[r])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}(i=/^data:audio\/([^;,]+);/i.exec(u))||(i=/\.([^.]+)$/.exec(u.split("?",1)[0])),i&&(i=i[1].toLowerCase())}if(i||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),i&&n.codecs(i)){t=e._src[r];break}}return t?(e._src=t,e._state="loading","https:"===window.location.protocol&&"http:"===t.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new o(e),e._webAudio&&a(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")}e._emit("loaderror",null,"No audio support.")},play:function(e,t){var o=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===o._state&&!o._sprite[e])return null;if(void 0===e&&(e="__default",!o._playLock)){for(var a=0,i=0;i<o._sounds.length;i++)o._sounds[i]._paused&&!o._sounds[i]._ended&&(a++,r=o._sounds[i]._id);1===a?e=null:r=null}}var u=r?o._soundById(r):o._inactiveSound();if(!u)return null;if(r&&!e&&(e=u._sprite||"__default"),"loaded"!==o._state){u._sprite=e,u._ended=!1;var d=u._id;return o._queue.push({event:"play",action:function(){o.play(d)}}),d}if(r&&!u._paused)return t||o._loadQueue("play"),u._id;o._webAudio&&n._autoResume();var s=Math.max(0,u._seek>0?u._seek:o._sprite[e][0]/1e3),_=Math.max(0,(o._sprite[e][0]+o._sprite[e][1])/1e3-s),l=1e3*_/Math.abs(u._rate),c=o._sprite[e][0]/1e3,p=(o._sprite[e][0]+o._sprite[e][1])/1e3;u._sprite=e,u._ended=!1;var f=function(){u._paused=!1,u._seek=s,u._start=c,u._stop=p,u._loop=!(!u._loop&&!o._sprite[e][2])};if(!(s>=p)){var m=u._node;if(o._webAudio){var v=function(){o._playLock=!1,f(),o._refreshBuffer(u),m.gain.setValueAtTime(u._muted||o._muted?0:u._volume,n.ctx.currentTime),u._playStart=n.ctx.currentTime,void 0===m.bufferSource.start?m.bufferSource.noteGrainOn(0,s,u._loop?86400:_):m.bufferSource.start(0,s,u._loop?86400:_),l!==1/0&&(o._endTimers[u._id]=setTimeout(o._ended.bind(o,u),l)),t||setTimeout((function(){o._emit("play",u._id),o._loadQueue()}),0)};"running"===n.state&&"interrupted"!==n.ctx.state?v():(o._playLock=!0,o.once("resume",v),o._clearTimer(u._id))}else{var h=function(){m.currentTime=s,m.muted=u._muted||o._muted||n._muted||m.muted,m.volume=u._volume*n.volume(),m.playbackRate=u._rate;try{var r=m.play();if(r&&"undefined"!=typeof Promise&&(r instanceof Promise||"function"==typeof r.then)?(o._playLock=!0,f(),r.then((function(){o._playLock=!1,m._unlocked=!0,t||(o._emit("play",u._id),o._loadQueue())})).catch((function(){o._playLock=!1,o._emit("playerror",u._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),u._ended=!0,u._paused=!0}))):t||(o._playLock=!1,f(),o._emit("play",u._id),o._loadQueue()),m.playbackRate=u._rate,m.paused)return void o._emit("playerror",u._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||u._loop?o._endTimers[u._id]=setTimeout(o._ended.bind(o,u),l):(o._endTimers[u._id]=function(){o._ended(u),m.removeEventListener("ended",o._endTimers[u._id],!1)},m.addEventListener("ended",o._endTimers[u._id],!1))}catch(e){o._emit("playerror",u._id,e)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===m.src&&(m.src=o._src,m.load());var A=window&&window.ejecta||!m.readyState&&n._navigator.isCocoonJS;if(m.readyState>=3||A)h();else{o._playLock=!0;var y=function(){h(),m.removeEventListener(n._canPlayEvent,y,!1)};m.addEventListener(n._canPlayEvent,y,!1),o._clearTimer(u._id)}}return u._id}o._ended(u)},pause:function(e){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var t=n._getSoundIds(e),o=0;o<t.length;o++){n._clearTimer(t[o]);var r=n._soundById(t[o]);if(r&&!r._paused&&(r._seek=n.seek(t[o]),r._rateSeek=0,r._paused=!0,n._stopFade(t[o]),r._node))if(n._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"stop",action:function(){t.stop(e)}}),t;for(var o=t._getSoundIds(e),r=0;r<o.length;r++){t._clearTimer(o[r]);var a=t._soundById(o[r]);a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,t._stopFade(o[r]),a._node&&(t._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),t._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause(),a._node.duration===1/0&&t._clearSound(a._node))),n||t._emit("stop",a._id))}return t},mute:function(e,t){var o=this;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"mute",action:function(){o.mute(e,t)}}),o;if(void 0===t){if("boolean"!=typeof e)return o._muted;o._muted=e}for(var r=o._getSoundIds(t),a=0;a<r.length;a++){var i=o._soundById(r[a]);i&&(i._muted=e,i._interval&&o._stopFade(i._id),o._webAudio&&i._node?i._node.gain.setValueAtTime(e?0:i._volume,n.ctx.currentTime):i._node&&(i._node.muted=!!n._muted||e),o._emit("mute",i._id))}return o},volume:function(){var e,t,o,r=this,a=arguments;if(0===a.length)return r._volume;if(1===a.length||2===a.length&&void 0===a[1]?r._getSoundIds().indexOf(a[0])>=0?t=parseInt(a[0],10):e=parseFloat(a[0]):a.length>=2&&(e=parseFloat(a[0]),t=parseInt(a[1],10)),!(void 0!==e&&e>=0&&e<=1))return(o=t?r._soundById(t):r._sounds[0])?o._volume:0;if("loaded"!==r._state||r._playLock)return r._queue.push({event:"volume",action:function(){r.volume.apply(r,a)}}),r;void 0===t&&(r._volume=e),t=r._getSoundIds(t);for(var i=0;i<t.length;i++)(o=r._soundById(t[i]))&&(o._volume=e,a[2]||r._stopFade(t[i]),r._webAudio&&o._node&&!o._muted?o._node.gain.setValueAtTime(e,n.ctx.currentTime):o._node&&!o._muted&&(o._node.volume=e*n.volume()),r._emit("volume",o._id));return r},fade:function(e,t,o,r){var a=this;if("loaded"!==a._state||a._playLock)return a._queue.push({event:"fade",action:function(){a.fade(e,t,o,r)}}),a;e=Math.min(Math.max(0,parseFloat(e)),1),t=Math.min(Math.max(0,parseFloat(t)),1),o=parseFloat(o),a.volume(e,r);for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if(r||a._stopFade(i[u]),a._webAudio&&!d._muted){var s=n.ctx.currentTime,_=s+o/1e3;d._volume=e,d._node.gain.setValueAtTime(e,s),d._node.gain.linearRampToValueAtTime(t,_)}a._startFadeInterval(d,e,t,o,i[u],void 0===r)}}return a},_startFadeInterval:function(e,n,t,o,r,a){var i=this,u=n,d=t-n,s=Math.abs(d/.01),_=Math.max(4,s>0?o/s:o),l=Date.now();e._fadeTo=t,e._interval=setInterval((function(){var r=(Date.now()-l)/o;l=Date.now(),u+=d*r,u=d<0?Math.max(t,u):Math.min(t,u),u=Math.round(100*u)/100,i._webAudio?e._volume=u:i.volume(u,e._id,!0),a&&(i._volume=u),(t<n&&u<=t||t>n&&u>=t)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,i.volume(t,e._id),i._emit("fade",e._id))}),_)},_stopFade:function(e){var t=this,o=t._soundById(e);return o&&o._interval&&(t._webAudio&&o._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(o._interval),o._interval=null,t.volume(o._fadeTo,e),o._fadeTo=null,t._emit("fade",e)),t},loop:function(){var e,n,t,o=this,r=arguments;if(0===r.length)return o._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(t=o._soundById(parseInt(r[0],10)))&&t._loop;o._loop=e=r[0]}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=o._getSoundIds(n),i=0;i<a.length;i++)(t=o._soundById(a[i]))&&(t._loop=e,o._webAudio&&t._node&&t._node.bufferSource&&(t._node.bufferSource.loop=e,e&&(t._node.bufferSource.loopStart=t._start||0,t._node.bufferSource.loopEnd=t._stop)));return o},rate:function(){var e,t,o,r=this,a=arguments;if(0===a.length)t=r._sounds[0]._id;else if(1===a.length){var i=r._getSoundIds(),u=i.indexOf(a[0]);u>=0?t=parseInt(a[0],10):e=parseFloat(a[0])}else 2===a.length&&(e=parseFloat(a[0]),t=parseInt(a[1],10));if("number"!=typeof e)return(o=r._soundById(t))?o._rate:r._rate;if("loaded"!==r._state||r._playLock)return r._queue.push({event:"rate",action:function(){r.rate.apply(r,a)}}),r;void 0===t&&(r._rate=e),t=r._getSoundIds(t);for(var d=0;d<t.length;d++)if(o=r._soundById(t[d])){r.playing(t[d])&&(o._rateSeek=r.seek(t[d]),o._playStart=r._webAudio?n.ctx.currentTime:o._playStart),o._rate=e,r._webAudio&&o._node&&o._node.bufferSource?o._node.bufferSource.playbackRate.setValueAtTime(e,n.ctx.currentTime):o._node&&(o._node.playbackRate=e);var s=r.seek(t[d]),_=(r._sprite[o._sprite][0]+r._sprite[o._sprite][1])/1e3-s,l=1e3*_/Math.abs(o._rate);!r._endTimers[t[d]]&&o._paused||(r._clearTimer(t[d]),r._endTimers[t[d]]=setTimeout(r._ended.bind(r,o),l)),r._emit("rate",o._id)}return r},seek:function(){var e,t,o=this,r=arguments;if(0===r.length)t=o._sounds[0]._id;else if(1===r.length){var a=o._getSoundIds(),i=a.indexOf(r[0]);i>=0?t=parseInt(r[0],10):o._sounds.length&&(t=o._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),t=parseInt(r[1],10));if(void 0===t)return o;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"seek",action:function(){o.seek.apply(o,r)}}),o;var u=o._soundById(t);if(u){if(!("number"==typeof e&&e>=0)){if(o._webAudio){var d=o.playing(t)?n.ctx.currentTime-u._playStart:0,s=u._rateSeek?u._rateSeek-u._seek:0;return u._seek+(s+d*Math.abs(u._rate))}return u._node.currentTime}var _=o.playing(t);_&&o.pause(t,!0),u._seek=e,u._ended=!1,o._clearTimer(t),o._webAudio||!u._node||isNaN(u._node.duration)||(u._node.currentTime=e);var l=function(){o._emit("seek",t),_&&o.play(t,!0)};if(_&&!o._webAudio){var c=function(){o._playLock?setTimeout(c,0):l()};setTimeout(c,0)}else l()}return o},playing:function(e){var n=this;if("number"==typeof e){var t=n._soundById(e);return!!t&&!t._paused}for(var o=0;o<n._sounds.length;o++)if(!n._sounds[o]._paused)return!0;return!1},duration:function(e){var n=this,t=n._duration,o=n._soundById(e);return o&&(t=n._sprite[o._sprite][1]/1e3),t},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,o=0;o<t.length;o++)t[o]._paused||e.stop(t[o]._id),e._webAudio||(e._clearSound(t[o]._node),t[o]._node.removeEventListener("error",t[o]._errorFn,!1),t[o]._node.removeEventListener(n._canPlayEvent,t[o]._loadFn,!1),n._releaseHtml5Audio(t[o]._node)),delete t[o]._node,e._clearTimer(t[o]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1);var i=!0;for(o=0;o<n._howls.length;o++)if(n._howls[o]._src===e._src||e._src.indexOf(n._howls[o]._src)>=0){i=!1;break}return r&&i&&delete r[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,t,o){return"function"==typeof n&&this["_on"+e].push(o?{id:t,fn:n,once:o}:{id:t,fn:n}),this},off:function(e,n,t){var o=this,r=o["_on"+e],a=0;if("number"==typeof n&&(t=n,n=null),n||t)for(a=0;a<r.length;a++){var i=t===r[a].id;if(n===r[a].fn&&i||!n&&i){r.splice(a,1);break}}else if(e)o["_on"+e]=[];else{var u=Object.keys(o);for(a=0;a<u.length;a++)0===u[a].indexOf("_on")&&Array.isArray(o[u[a]])&&(o[u[a]]=[])}return o},once:function(e,n,t){return this.on(e,n,t,1),this},_emit:function(e,n,t){for(var o=this,r=o["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout((function(e){e.call(this,n,t)}).bind(o,r[a].fn),0),r[a].once&&o.off(e,r[a].fn,r[a].id));return o._loadQueue(e),o},_loadQueue:function(e){var n=this;if(n._queue.length>0){var t=n._queue[0];t.event===e&&(n._queue.shift(),n._loadQueue()),e||t.action()}return n},_ended:function(e){var t=this,o=e._sprite;if(!t._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(t._ended.bind(t,e),100),t;var r=!(!e._loop&&!t._sprite[o][2]);if(t._emit("end",e._id),!t._webAudio&&r&&t.stop(e._id,!0).play(e._id),t._webAudio&&r){t._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);t._endTimers[e._id]=setTimeout(t._ended.bind(t,e),a)}return t._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,t._clearTimer(e._id),t._cleanBuffer(e._node),n._autoSuspend()),t._webAudio||r||t.stop(e._id,!0),t},_clearTimer:function(e){var n=this;if(n._endTimers[e]){if("function"!=typeof n._endTimers[e])clearTimeout(n._endTimers[e]);else{var t=n._soundById(e);t&&t._node&&t._node.removeEventListener("ended",n._endTimers[e],!1)}delete n._endTimers[e]}return n},_soundById:function(e){for(var n=this,t=0;t<n._sounds.length;t++)if(e===n._sounds[t]._id)return n._sounds[t];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new o(e)},_drain:function(){var e=this,n=e._pool,t=0,o=0;if(!(e._sounds.length<n)){for(o=0;o<e._sounds.length;o++)e._sounds[o]._ended&&t++;for(o=e._sounds.length-1;o>=0;o--){if(t<=n)return;e._sounds[o]._ended&&(e._webAudio&&e._sounds[o]._node&&e._sounds[o]._node.disconnect(0),e._sounds.splice(o,1),t--)}}},_getSoundIds:function(e){if(void 0===e){for(var n=[],t=0;t<this._sounds.length;t++)n.push(this._sounds[t]._id);return n}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[this._src],e._node.bufferSource.connect(e._panner?e._panner:e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,n.ctx.currentTime),this},_cleanBuffer:function(e){var t=n._navigator&&n._navigator.vendor.indexOf("Apple")>=0;if(n._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),t))try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}return e.bufferSource=null,this},_clearSound:function(e){/MSIE |Trident\//.test(n._navigator&&n._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var o=function(e){this._parent=e,this.init()};o.prototype={init:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,t._sounds.push(e),e.create(),e},create:function(){var e=this,t=e._parent,o=n._muted||e._muted||e._parent._muted?0:e._volume;return t._webAudio?(e._node=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(o,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):n.noAudio||(e._node=n._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._node.src=t._src,e._node.preload=!0===t._preload?"auto":t._preload,e._node.volume=o*n.volume(),e._node.load()),e},reset:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,t=e._parent;t._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(t._sprite).length&&(t._sprite={__default:[0,1e3*t._duration]}),"loaded"!==t._state&&(t._state="loaded",t._emit("load"),t._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)}};var r={},a=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void d(e);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),o=new Uint8Array(t.length),a=0;a<t.length;++a)o[a]=t.charCodeAt(a);u(o.buffer,e)}else{var s=new XMLHttpRequest;s.open(e._xhr.method,n,!0),s.withCredentials=e._xhr.withCredentials,s.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach((function(n){s.setRequestHeader(n,e._xhr.headers[n])})),s.onload=function(){var n=(s.status+"")[0];"0"===n||"2"===n||"3"===n?u(s.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+s.status+".")},s.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},i(s)}},i=function(e){try{e.send()}catch(n){e.onerror()}},u=function(e,t){var o=function(){t._emit("loaderror",null,"Decoding audio data failed.")},a=function(e){e&&t._sounds.length>0?(r[t._src]=e,d(t,e)):o()};"undefined"!=typeof Promise&&1===n.ctx.decodeAudioData.length?n.ctx.decodeAudioData(e).then(a).catch(o):n.ctx.decodeAudioData(e,a,o)},d=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},s=function(){if(n.usingWebAudio){try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}n.ctx||(n.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),t=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),o=t?parseInt(t[1],10):null;if(e&&o&&o<9){var r=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());n._navigator&&!r&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.setValueAtTime(n._muted?0:n._volume,n.ctx.currentTime),n.masterGain.connect(n.ctx.destination)),n._setup()}};"function"==typeof define&&define.amd&&define([],(function(){return{Howler:n,Howl:t}})),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=t),"undefined"!=typeof global?(global.HowlerGlobal=e,global.Howler=n,global.Howl=t,global.Sound=o):"undefined"!=typeof window&&(window.HowlerGlobal=e,window.Howler=n,window.Howl=t,window.Sound=o)}(),function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var t=n._howls.length-1;t>=0;t--)n._howls[t].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],void 0!==o.ctx.listener.positionX?(o.ctx.listener.positionX.setTargetAtTime(o._pos[0],Howler.ctx.currentTime,.1),o.ctx.listener.positionY.setTargetAtTime(o._pos[1],Howler.ctx.currentTime,.1),o.ctx.listener.positionZ.setTargetAtTime(o._pos[2],Howler.ctx.currentTime,.1)):o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,a){var i=this;if(!i.ctx||!i.ctx.listener)return i;var u=i._orientation;return n="number"!=typeof n?u[1]:n,t="number"!=typeof t?u[2]:t,o="number"!=typeof o?u[3]:o,r="number"!=typeof r?u[4]:r,a="number"!=typeof a?u[5]:a,"number"!=typeof e?u:(i._orientation=[e,n,t,o,r,a],void 0!==i.ctx.listener.forwardX?(i.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),i.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),i.ctx.listener.forwardZ.setTargetAtTime(t,Howler.ctx.currentTime,.1),i.ctx.listener.upX.setTargetAtTime(o,Howler.ctx.currentTime,.1),i.ctx.listener.upY.setTargetAtTime(r,Howler.ctx.currentTime,.1),i.ctx.listener.upZ.setTargetAtTime(a,Howler.ctx.currentTime,.1)):i.ctx.listener.setOrientation(e,n,t,o,r,a),i)},Howl.prototype.init=function(e){return function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._stereo=n.stereo||null,t._pos=n.pos||null,t._pannerAttr={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:0,distanceModel:void 0!==n.distanceModel?n.distanceModel:"inverse",maxDistance:void 0!==n.maxDistance?n.maxDistance:1e4,panningModel:void 0!==n.panningModel?n.panningModel:"HRTF",refDistance:void 0!==n.refDistance?n.refDistance:1,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:1},t._onstereo=n.onstereo?[{fn:n.onstereo}]:[],t._onpos=n.onpos?[{fn:n.onpos}]:[],t._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(n,t){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(n,t)}}),o;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===t){if("number"!=typeof n)return o._stereo;o._stereo=n,o._pos=[n,0,0]}for(var a=o._getSoundIds(t),i=0;i<a.length;i++){var u=o._soundById(a[i]);if(u){if("number"!=typeof n)return u._stereo;u._stereo=n,u._pos=[n,0,0],u._node&&(u._pannerAttr.panningModel="equalpower",u._panner&&u._panner.pan||e(u,r),"spatial"===r?void 0!==u._panner.positionX?(u._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):u._panner.setPosition(n,0,0):u._panner.pan.setValueAtTime(n,Howler.ctx.currentTime)),o._emit("stereo",u._id)}}return o},Howl.prototype.pos=function(n,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"pos",action:function(){a.pos(n,t,o,r)}}),a;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,void 0===r){if("number"!=typeof n)return a._pos;a._pos=[n,t,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if("number"!=typeof n)return d._pos;d._pos=[n,t,o],d._node&&(d._panner&&!d._panner.pan||e(d,"spatial"),void 0!==d._panner.positionX?(d._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),d._panner.positionY.setValueAtTime(t,Howler.ctx.currentTime),d._panner.positionZ.setValueAtTime(o,Howler.ctx.currentTime)):d._panner.setPosition(n,t,o)),a._emit("pos",d._id)}}return a},Howl.prototype.orientation=function(n,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"orientation",action:function(){a.orientation(n,t,o,r)}}),a;if(t="number"!=typeof t?a._orientation[1]:t,o="number"!=typeof o?a._orientation[2]:o,void 0===r){if("number"!=typeof n)return a._orientation;a._orientation=[n,t,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if("number"!=typeof n)return d._orientation;d._orientation=[n,t,o],d._node&&(d._panner||(d._pos||(d._pos=a._pos||[0,0,-.5]),e(d,"spatial")),void 0!==d._panner.orientationX?(d._panner.orientationX.setValueAtTime(n,Howler.ctx.currentTime),d._panner.orientationY.setValueAtTime(t,Howler.ctx.currentTime),d._panner.orientationZ.setValueAtTime(o,Howler.ctx.currentTime)):d._panner.setOrientation(n,t,o)),a._emit("orientation",d._id)}}return a},Howl.prototype.pannerAttr=function(){var n,t,o,r=this,a=arguments;if(!r._webAudio)return r;if(0===a.length)return r._pannerAttr;if(1===a.length){if("object"!=typeof a[0])return(o=r._soundById(parseInt(a[0],10)))?o._pannerAttr:r._pannerAttr;n=a[0],void 0===t&&(n.pannerAttr||(n.pannerAttr={coneInnerAngle:n.coneInnerAngle,coneOuterAngle:n.coneOuterAngle,coneOuterGain:n.coneOuterGain,distanceModel:n.distanceModel,maxDistance:n.maxDistance,refDistance:n.refDistance,rolloffFactor:n.rolloffFactor,panningModel:n.panningModel}),r._pannerAttr={coneInnerAngle:void 0!==n.pannerAttr.coneInnerAngle?n.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==n.pannerAttr.coneOuterAngle?n.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==n.pannerAttr.coneOuterGain?n.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==n.pannerAttr.distanceModel?n.pannerAttr.distanceModel:r._distanceModel,maxDistance:void 0!==n.pannerAttr.maxDistance?n.pannerAttr.maxDistance:r._maxDistance,refDistance:void 0!==n.pannerAttr.refDistance?n.pannerAttr.refDistance:r._refDistance,rolloffFactor:void 0!==n.pannerAttr.rolloffFactor?n.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:void 0!==n.pannerAttr.panningModel?n.pannerAttr.panningModel:r._panningModel})}else 2===a.length&&(n=a[0],t=parseInt(a[1],10));for(var i=r._getSoundIds(t),u=0;u<i.length;u++)if(o=r._soundById(i[u])){var d=o._pannerAttr;d={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:d.coneInnerAngle,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:d.coneOuterAngle,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:d.coneOuterGain,distanceModel:void 0!==n.distanceModel?n.distanceModel:d.distanceModel,maxDistance:void 0!==n.maxDistance?n.maxDistance:d.maxDistance,refDistance:void 0!==n.refDistance?n.refDistance:d.refDistance,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:d.rolloffFactor,panningModel:void 0!==n.panningModel?n.panningModel:d.panningModel};var s=o._panner;s?(s.coneInnerAngle=d.coneInnerAngle,s.coneOuterAngle=d.coneOuterAngle,s.coneOuterGain=d.coneOuterGain,s.distanceModel=d.distanceModel,s.maxDistance=d.maxDistance,s.refDistance=d.refDistance,s.rolloffFactor=d.rolloffFactor,s.panningModel=d.panningModel):(o._pos||(o._pos=r._pos||[0,0,-.5]),e(o,"spatial"))}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this),n._stereo?t.stereo(n._stereo):n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,n._stereo?t.stereo(n._stereo):n._pos?t.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,t._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var e=function(e,n){"spatial"===(n=n||"spatial")?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}();