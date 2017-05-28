import { Controller, Component, Evented, Logging } from "ng-harmony-decorator";
import { EventedController as EventedCtrl } from "ng-harmony-controller";

import CardTpl from "../../ui/artistcard.html";

import Config from "../../assets/json/config.global.json";

@Component({
	module: "compucorp",
	selector: "artistcard",
	restrict: "A",
	replace: false,
	controller: "ArtistCardCtrl",
	template: CardTpl
})
@Controller({
	module: "compucorp",
	name: "ArtistCardCtrl",
	controllerAs: "ArtistCard",
	deps: ["SpotifyService"]
})
@Logging({
	loggerName: "ArtistCardLogger",
	...Config
})
export class ArtistCardCtrl extends EventedCtrl {
	constructor (...args) {
		super(...args);

        this.$scope.albums = [];

        this.log({
        	msg: "hello from artistcard",
        	level: "info"
        })

        this.SpotifyService.subscribeDiscographies(this._onChange.bind(this));

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
		this.SpotifyService.searchDiscography(this.$scope.model.id);
    }
    async getCache(id) {
    	let cachedAlbums = await this.SpotifyService.localAlbumsByArtistSearch(id);

    	cachedAlbums && cachedAlbums.forEach((album) => {
    		this._addSearchResult(album);
    	});
    }
    _onChange (doc) {
    	this.log({
    		level: "info",
    		msg: "onchange"
    	});
    	if (doc.data.op == "UPDATE") {
    		let c = this.$scope.albums.filter((d) => {
    			return d.title == doc.data.v.name;
    		})
    		if (c.length > 0) { 
    			c.map((d) => {
	    			d.title = doc.data.v.name;
	    			d.img = doc.data.v.images[2] ? doc.data.v.images[2].url : "";
	    			d.year = doc.data.v.year;
	    		});
    		}
    		else {
    			this._addSearchResult(doc.data.v);
    			return;
    		}
    		this.$scope.initialized = true;
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
    	if (this.$scope.albums.filter((_doc) => {
    		return _doc.title == doc.name;
    	}).length === 0) {
	    	this.$scope.albums.push({
				title: doc.name,
				img: doc.images[2] ? doc.images[2].url : "",
				year: doc.year
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