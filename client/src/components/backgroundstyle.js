import { Controller, Component } from "ng-harmony-decorator";
import { EventedController as EvCtrl } from "ng-harmony-controller";
import MediaItemTpl from "../ui/mediaitem.html";

@Component({
	module: "compucorp"
	selector: "background",
	controller: "BackgroundStyleCtrl",
	scope: {
		background: "@"
	}
})
@Controller({
	module: "compucorp",
	name: "BackgroundStyleCtrl",
	controllerAs: "Background"
	deps: []
})
export class BackgroundStyleCtrl extends EvCtrl {
	constructor (...args) {
		super(...args);
	}
}