import e from"peerjs";import{DocSet as t,Connection as n,init as o}from"automerge";export default class{constructor(n,o={}){this._connections={},this._actorId=n,this._peerInstance=o.peerInstance||new e(this._actorId),this._docSet=o.docSet||new t,this._encode=o.encode||JSON.stringify,this._decode=o.decode||JSON.parse,this._peerInstance.on("connection",e=>{e.on("data",t=>{this._connections[e.peer].receiveMsg(this._decode(t))})})}get docSet(){return this._docSet}connect(e,t){if(this._connections[e])return;console.log(e,t);const o=t||this._peerInstance.connect(e),c=this._connections[e]=new n(this._docSet,e=>{o.send(this._encode(e))});o.on("disconnected",()=>{c.close(),delete this._connections[e]}),c.open()}select(e){const t=this.docSet.getDoc(e)||o(this._actorId);return(n,...o)=>{const c=n(t,...o);return this.docSet.setDoc(e,c),c}}subscribe(e,t){if("function"==typeof e)return this.docSet.registerHandler(e),()=>this.docSet.unregisterHandler(e);if("string"==typeof e){const n=(n,o)=>{n===e&&t(o)};return this.docSet.registerHandler(n),()=>this.docSet.unregisterHandler(n)}}}
//# sourceMappingURL=index.modern.js.map
