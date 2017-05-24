import { Controller as Ctrl } from "ng-harmony-core";
import { Controller } from "ng-harmony-decorator";

@Controller({
	module: "compucorp",
	name: "SearchPageCtrl",
	deps: "SpotifyService",
	controllerAs: "PageCtrl"
})
export class SearchPageCtrl extends Ctrl {
    constructor (...args) {
        super(...args);

        this.$scope.initialized = false;;
        this.$scope.collection = [];
        this.$scope.searchVal = "";

        this.SpotifyService.subscribeArtists(this.onArtistsChange.bind(this));
        this.SpotifyService.subscribeAlbums(this.onAlbumsChange.bind(this));
    }
    $search () {
    	if (this.$scope.initialized == false) {
    		this.getCache();
    		this.$scope.initialized = true;
		}
		this.SpotifyService.search(encodeURI(this.$scope.searchVal));
    }
    async getCache () {
    	let cachedAlbums = await this.SpotifyService.localAlbumSearch(this.$scope.searchVal);
    	let cachedArtists = await this.SpotifyService.localArtistSearch(this.$scope.searchVal);

    	cachedAlbums.forEach((album) => {
    		this._addSearchResult(album, "View Album", "album");
    	});
    	cachedArtists.forEach((artist) => {
    		this._addSearchResult(artist, "View Tracks", "artist");
    	});
    }
    _onChange (doc, actionText, type) {
	    if (doc.data.op == "UPDATE") {
    		let exists = this.$scope.collection.filter((doc) => {
    			doc.id == doc.data.doc;
    		});
    		if (exists.length > 0) {
	    		exists.map((doc) => {
	    			doc.title = doc.data.v.name;
	    			doc.img = doc.data.v.images[1] ? doc.data.v.images[1].url : "";
	    			doc.type = type;
	    		});
    		} else {
    		this._addSearchResult(doc.data.v, actionText, type);
    		}
    	} else if (doc.data.op = "INSERT") {
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
    }
    onAlbumsChange (doc) {
    	this._onChange(doc, "View Album", "album");
    }
    onArtistsChange (doc) {
    	this._onChange(doc, "View Tracks", "artist");
    }
};
