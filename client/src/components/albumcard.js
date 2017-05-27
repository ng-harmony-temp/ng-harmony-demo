import { Controller, Component } from "ng-harmony-decorator";
import { EventedController as EvCtrl } from "ng-harmony-controller";
import CardTpl from "../../ui/albumcard.html";

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
	deps: []
})
export class AlbumCardCtrl extends EvCtrl {
	constructor (...args) {
		super(...args);


	}
}