import { Service as Srvc } from "ng-harmony-core";
import { Service, Logging } from "ng-harmony-decorator";
import { Log } from "ng-harmony-log";

import * as ArtistSchema from "../../assets/json/artist.schema.json";
import * as AlbumSchema from "../../assets/json/album.schema.json";

import * as Rx from "rxjs";
import * as RxDB from "rxdb";
import * as Adapter from "pouchdb-adapter-idb";

@Service({
	module: "compucorp",
	name: "SpotifyService",
	deps: ["$http", "$q"]
})
export class SpotifyService extends Srvc {
	constructor(...args) {
		super(...args);

		this.initialized = this.$q.defer();
		this._create();
	}
	async _create () {
		RxDB.plugin(Adapter);
		this.db = await RxDB.create({
			name: "compucorpjoehannes",             // <- name
			adapter: "idb",           // <- storage-adapter
			multiInstance: false         // <- multiInstance (default: true)
		});
		await this.db.collection({
			name: "artists",
			schema: ArtistSchema
		});
		await this.db.collection({
			name: "albums",
			schema: AlbumSchema
		});
		this.initialized.resolve();
	}
	async _search (q) {
		return this.$http.get(`https://api.spotify.com/v1/search?q="${q}"&type=album,artist`);
	}
	localAlbumSearch (q) {
		this.db.albums._queryCache.destroy();
		return this.db.albums
			.find()
			.where("name")
			.regex(new RegExp(q, "i"))
			.exec();
	}
	localArtistSearch (q) {
		this.db.artists._queryCache.destroy();
		return this.db.artists
			.find()
			.where("name")
			.regex(new RegExp(q, "i"))
			.exec();
	}
	async search (q) {
		let results = await this._search(q);
		results.data.albums.items.forEach((doc) => {
			this.db.albums.upsert(doc);
		});
		results.data.artists.items.forEach((doc) => {
			this.db.artists.upsert(doc);
		});
	}
	subscribeArtists (observer) {
		this.db.artists.$.subscribe(observer);
	}
	subscribeAlbums (observer) {
		this.db.albums.$.subscribe(observer);
	}
}