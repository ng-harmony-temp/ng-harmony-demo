import { Service as Srvc } from "ng-harmony-core";
import { Service, Logging } from "ng-harmony-decorator";
import { Log } from "ng-harmony-log";

import * as ArtistSchema from "../../assets/json/artist.schema.json";
import * as AlbumSchema from "../../assets/json/album.schema.json";
import * as DiscographySchema from "../../assets/json/discography.schema.json";
import * as TracksSchema from "../../assets/json/tracks.schema.json";

import * as Rx from "rxjs";
import * as RxDB from "rxdb";
import * as Adapter from "pouchdb-adapter-idb";

import Config from "../../assets/json/config.global.json";

@Service({
	module: "compucorp",
	name: "SpotifyService",
	deps: ["$http", "$q"]
})
@Logging({
	loggerName: "SpotifyLogger",
	...Config
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
		await this.db.collection({
			name: "discographies",
			schema: DiscographySchema
		});
		await this.db.collection({
			name: "tracks",
			schema: TracksSchema
		});
		this.initialized.resolve();
	}
	async _search (q, offset) {
		let suffix = offset ? `&offset=${offset}` : "";
		return this.$http.get(`https://api.spotify.com/v1/search?q="${q}"&type=album,artist${suffix}`);
	}
	localAlbumSearch (q) {
		this.db.albums._queryCache.destroy();
		return this.db.albums
			.find()
			.where("name")
			.regex(new RegExp(q, "i"))
			.exec();
	}
	async localAlbumByArtistSearch (q) {
		this.db.albums._queryCache.destroy();
		let regex = new RegExp(q, "i");
		let all = await this.db.albums
			.find()
			.exec();
		//seems to be no way yet to do this in a query
		return all.filter((album) => {
			let truthy = false;
			album.artists.forEach((artist) => {
				if (regex.test(artist.name)) {
					truthy = true;
					return false;
				}
			})
			return truthy;
		});
	}
	localAlbumsByArtistSearch (id) {
		this.db.discographies._queryCache.destroy();
		return this.db.discographies
			.find()
			.where("artists")
			.elemMatch({ "id": { "$eq": id } })
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
	localTracksByAlbumSearch (id) {
		this.db.tracks._queryCache.destroy();
		return this.db.tracks
			.find()
			.where("albumid")
			.eq(id)
			.exec();
	}
	async search (q, offset = null) {
		let results = await this._search(q, offset);
		results.data.albums.items.forEach((doc) => {
			this.db.albums.upsert(doc);
		});
		results.data.artists.items.forEach((doc) => {
			this.db.artists.upsert(doc);
		});
	}
	async searchDiscography (id) {
		let results = await this.$http.get(`https://api.spotify.com/v1/artists/${id}/albums?limit=50`) || {};
		results.data && results.data.items.forEach((doc) => {
			this.db.discographies.upsert(doc);
		});
	}
	async searchTracks (id) {
		let results = await this.$http.get(`https://api.spotify.com/v1/albums/${id}/tracks?limit=50`) || {};
		results.data && results.data.items.forEach((doc) => {
			this.db.tracks.upsert({
				albumid: id,
				...doc
			});
		})
	}
	subscribeArtists (observer) {
		this.db.artists.$.subscribe(observer);
	}
	subscribeAlbums (observer) {
		this.db.albums.$.subscribe(observer);
	}
	subscribeDiscographies (observer) {
		this.db.discographies.$.subscribe(observer);
	}
	subscribeTracks (observer) {
		this.db.tracks.$.subscribe(observer);
	}
}