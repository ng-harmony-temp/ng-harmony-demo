import { Controller as Ctrl } from "ng-harmony-core";
import { Controller } from "ng-harmony-decorator";

@Controller({
	module: "compucorp",
	name: "SearchPageCtrl",
	deps: ["SpotifyService", "$timeout"],
	controllerAs: "PageCtrl"
})
export class SearchPageCtrl extends Ctrl {
    constructor (...args) {
        super(...args);

        this.$scope.collection = [];
        this.$scope.searchVal = "";
        this.$scope.initialized = false;
        this.$scope.limit = 20;

        this.SpotifyService.subscribeArtists(this.onArtistsChange.bind(this));
        this.SpotifyService.subscribeAlbums(this.onAlbumsChange.bind(this));
    }
    $search () {
    	this.$scope.limit = 20;
		this.$scope.collection.splice(0, this.$scope.collection.length);
    	this.$scope.initialized = false;
    	this._digest();
		this.$timeout(this._search.bind(this), 100);
	}
	_search () {
   		this.getCache(this.$scope.searchVal);
		this.SpotifyService.search(encodeURI(this.$scope.searchVal));
    }
    async getCache(q) {
    	let cachedAlbums = await this.SpotifyService.localAlbumSearch(q);
    	let cachedArtists = await this.SpotifyService.localArtistSearch(q);

    	cachedAlbums && cachedAlbums.forEach((album) => {
    		this._addSearchResult(album, "View Album", "album");
    	});
    	cachedArtists && cachedArtists.forEach((artist) => {
    		this._addSearchResult(artist, "View Tracks", "artist");
    	});
    }
    _onChange (doc, actionText, type) {
    	if (doc.data.op == "UPDATE") {
    		let c = this.$scope.collection.filter((d) => {
    			return d.id == doc.data.doc;
    		})
    		if (c.length) { 
	    			c.map((d) => {
	    			d.title = doc.data.v.title;
	    			d.img = doc.data.v.images[1] ? doc.data.v.images[1].url : ""
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
    _addSearchResult (doc, actionText, type) {
    	this.$scope.collection.push({
			id: doc.id,
			title: doc.name,
			actionText: actionText,
			img: doc.images[1] ? doc.images[1].url : "",
			type: type
		});
		this.$scope.initialized = true;
		this._digest();
    }
    onAlbumsChange (doc) {
    	this._onChange(doc, "View Album", "album");
    }
    onArtistsChange (doc) {
    	this._onChange(doc, "View Tracks", "artist");
    }
};
