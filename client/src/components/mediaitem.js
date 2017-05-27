import { Logging, Controller, Component, Evented } from "ng-harmony-decorator";
import { EventedController } from "ng-harmony-controller";

import MediaItemTpl from "../../ui/mediaitem.html";

import Config from "../../assets/json/config.global.json";

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
	scope: {
		model: "@",
		type: "@"
	}
})
@Logging({
	loggerName: "MediaItemLogger",
	...Config
})
export class MediaItemCtrl extends EventedController {
	constructor(...args) {
		super(...args);
		this.$scope.albumcardVisible = false;
		this.$scope.artistcardVisible = false;
	}

	@Evented({
		selector: "section.bg-image-n--mediaitem",
		type: "click",
		delegate: null
	})
	openCard () {
		this.$scope[`${this.$scope.type}cardVisible`] = true;
		this.log({
			msg: `show ${this.$scope.type} card`,
			level: "info"
		});
	}
}