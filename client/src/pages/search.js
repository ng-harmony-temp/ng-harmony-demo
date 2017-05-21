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
        console.log("Search Page initialized!");

        this.$scope.searchVal = "";
        this.offset = 0;
    }
    $search () {
   		this.SpotifyService.search(encodeURI(this.$scope.searchVal), this.offset++/*change to per searchVal*/);
    }
};
