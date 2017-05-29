import { Controller, Component, Logging, Evented } from "ng-harmony-decorator";
import { EventedController as EventedCtrl } from "ng-harmony-controller";

import CardTpl from "../../ui/albumcard.html";

import Config from "../../assets/json/config.global.json";

@Component({
	module: "compucorp",
	selector: "albumcard",
	restrict: "A",
	replace: false,
	controller: "AlbumCardCtrl",
	template: CardTpl
})
@Controller({
	module: "compucorp",
	name: "AlbumCardCtrl",
	controllerAs: "AlbumCard",
	deps: ["SpotifyService"]
})
@Logging({
	loggerName: "ArtistCardLogger",
	...Config
})
export class AlbumCardCtrl extends EventedCtrl {
	constructor (...args) {
		super(...args);

		this.$scope.tracks = [];

		this.log({
        	msg: "hello from albumcard",
        	level: "info"
        })

        this.SpotifyService.subscribeTracks(this._onChange.bind(this));

        this.search();
	}
	search () {
		this.log({
			msg: "search",
			level: "info"
		});
		this.log({
			msg: this.$scope.model.id,
			level: "info"
		})
   		this.getCache(this.$scope.model.id);
		this.SpotifyService.searchTracks(this.$scope.model.id);
    }
    async getCache(id) {
    	let cachedTracks = await this.SpotifyService.localTracksByAlbumSearch(id);

    	cachedTracks && cachedTracks.forEach((track) => {
    		this._addSearchResult(track);
    	});
    }
    _onChange (doc, actionText, type) {
    	this.log({
    		level: "info",
    		msg: "onchange"
    	});
    	if (doc.data.op == "UPDATE") {
    		let c = this.$scope.tracks.filter((d) => {
    			return d.nr == doc.data.v.track_number;
    		})
    		if (c.length > 0) { 
    			c.map((d) => {
	    			d.title = doc.data.v.name;
	    			d.nr = doc.data.v.track_number;
	    			d.duration = `${Math.round(doc.data.v.duration_ms / 1000 / 60)}m ${Math.round((doc.data.v.duration_ms / 1000) % 60)}s`;
	    		});
    		}
    		else {
    			this._addSearchResult(doc.data.v);
    			return;
    		}
    		this._digest();
    	}
    	else if (doc.data.op == "INSERT") {
    		this._addSearchResult(doc.data.v);
    	}
    }
    _addSearchResult (doc) {
    	this.log({
    		level: "info",
    		msg: "dok received"
    	});
    	if (this.$scope.tracks.filter((_doc) => {
    		return _doc.track_number == doc.track_number;
    	}).length === 0) {
	    	this.$scope.tracks.push({
				title: doc.name,
				nr: doc.track_number,
				duration: `${Math.round(doc.duration_ms / 1000 / 60)}m ${Math.round((doc.duration_ms / 1000) % 60)}s`
			});
			this._digest();
		}
    }

    @Evented({
    	selector: "header #close-card",
    	type: "click",
    	delegate: null
    })
    destroy () {
    	this.log({
    		msg: "Close",
    		level: "info"
    	});
    }

}