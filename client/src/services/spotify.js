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
		this.artists = await this.db.collection({
			name: "artist",
			schema: ArtistSchema
		});
		this.albums = await this.db.collection({
			name: "album",
			schema: AlbumSchema
		});
		this.initialized.resolve();
	}
	async _search (q) {
		let localAlbums = await this.localAlbumSearch(q);
		let localArtists = await this.localArtistSearch(q);
		let offset = localArtists > localAlbums ? localArtists.length.toString() : localAlbums.length.toString();
		//this.log(`Offset is ${offset} ...`);
		return this.$http.get(`https://api.spotify.com/v1/search?q="${q}"&type=album,artist&offset=${offset}`);
	}
	localAlbumSearch (q) {
		return this.albums.find()
			.where({ "name": new RegExp(`.*${q}.*`, "i") })
			.exec();
	}
	localArtistSearch (q) {
		return this.artists.find()
			.where({ "name": new RegExp(`.*${q}.*`, "i") })
			.exec();
	}
	async search (q) {
		let results = await this._search(q);
		results.data.albums.items.forEach((doc) => {
			this.albums.upsert(doc);
		});
		results.data.artists.items.forEach((doc) => {
			this.artists.upsert(doc);
		});
	}
	subscribeArtists (observer) {
		this.artists.$.subscribe(observer);
	}
	subscribeAlbums (observer) {
		this.albums.$.subscribe(observer);
	}
}