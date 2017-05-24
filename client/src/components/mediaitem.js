import { Controller, Component } from "ng-harmony-decorator";
import { EventedController as EvCtrl } from "ng-harmony-controller";
import MediaItemTpl from "../../ui/mediaitem.html";

@Component({
	module: "compucorp",
	selector: "mediaitem",
	restrict: "E",
	replace: true,
	controller: "MediaItemCtrl",
	template: MediaItemTpl
})
@Controller({
	module: "compucorp",
	name: "MediaItemCtrl",
	controllerAs: "MediaItem",
	deps: []
})
export class MediaItemCtrl extends EvCtrl {
	constructor (...args) {
		super(...args);


	}
}