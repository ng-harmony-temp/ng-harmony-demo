import { Controller, Component } from "ng-harmony-decorator";
import { EventedController as EvCtrl } from "ng-harmony-controller";
import CardTpl from "../../ui/artistcard.html";

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
	deps: ["SpotifyService", "screenSize"]
})
export class ArtistCardCtrl extends EvCtrl {
	constructor (...args) {
		super(...args);

        this.$scope.collection = [];
        this.$scope.initialized = false;
        this.$scope.limit = 20;

        this.screenSize.rules = {
        	desktop: '(min-width: 740px)'
        };

		this.$scope.clientIsPhone = !this.screenSize.is("desktop");
		this.screenSize.on("desktop", (truthy) => { 
			if (this.$scope.clientIsPhone === truthy) {
				this.$scope.clientIsPhone = !truthy;
				this._digest();
			}
		});

        this.SpotifyService.subscribeDiscographies(this.onDiscographyChange.bind(this));

        this.search();
	}
	search () {
   		this.getCache(this.$scope.id);
		this.SpotifyService.searchDiscography(this.$scope.id);
    }
    async getCache(id) {
    	let cachedAlbums = await this.SpotifyService.localAlbumsByArtistSearch(id);

    	cachedAlbums && cachedAlbums.forEach((album) => {
    		this._addSearchResult(album);
    	});
    }
    _onChange (doc, actionText, type) {
    	if (doc.data.op == "UPDATE") {
    		let c = this.$scope.collection.filter((d) => {
    			return d.title == doc.data.v.title;
    		})
    		if (c.length > 0) { 
    			c.map((d) => {
	    			d.title = doc.data.v.title;
	    			d.img = doc.data.v.images[2] ? doc.data.v.images[2].url : "";
	    			d.year = doc.data.v.year;
	    		});
    		}
    		else {
    			this._addSearchResult(doc.data.v, actionText, type);
    			return;
    		}
    		this.$scope.initialized = true;
    		this._digest();
    	}
    	else if (doc.data.op == "INSERT") {
    		this._addSearchResult(doc.data.v, actionText, type);
    	}
    }
    _addSearchResult (doc) {
    	if (this.$scope.collection.filter((_doc) => {
    		return _doc.title == doc.title;
    	}).length === 0) {
	    	this.$scope.collection.push({
				title: doc.title,
				img: doc.images[2] ? doc.images[2].url : "",
				year: doc.year
			});
			this._digest();
		}
    }
    onDiscographyChange (doc) {
    	this._onChange(doc);
    }

}