import { Service as Srvc } from "ng-harmony-core";
import { Service } from "ng-harmony-decorator";

import * as ArtistSchema from "../../assets/json/artist.schema.json";
import * as AlbumSchema from "../../assets/json/album.schema.json";

import * as Rx from "rxjs-es";
import * as RxDB from "rxdb";
import * as Adapter from "pouchdb-adapter-idb";

@Service({
	module: "compucorp",
	name: "SpotifyService",
	deps: ["$http"]
})
export class SpotifyService extends Srvc {
	constructor(...args) {
		super(...args);
		this.create();
	}
	async create () {
		RxDB.plugin(Adapter);
		const db = await RxDB.create({
			name: "spotify",             // <- name
			adapter: "idb",           // <- storage-adapter
			multiInstance: false         // <- multiInstance (default: true)
		});
		this.artists = await db.collection({
			name: "artist",
			schema: ArtistSchema
		});
		this.albums = await db.collection({
			name: "album",
			schema: AlbumSchema
		});
	}
	subscribe (cb) {
		this.artists.$.subscribe(cb);
		this.albums.$.subsribe(cb);
	}
	_search (q, offset = 0) {
		return this.$http.get(`https://api.spotify.com/v1/search?q=${q}&type=album,artist&offset=${offset}`);
	}
	search (q, offset) {
		var result = Rx.Observable.fromPromise(this._search(q, offset));
		result.subscribe((x) => console.log(x), (e) => console.error(e));
	}
}