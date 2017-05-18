import { Controller as Ctrl } from "ng-harmony-core";
import { Controller } from "ng-harmony-decorator";

@Controller({
	module: "compucorp",
	name: "SearchPageCtrl"
})
export class SearchPageCtrl extends Ctrl {
    constructor (...args) {
        super(...args);
        console.log("Search Page initialized!");
    }
};
