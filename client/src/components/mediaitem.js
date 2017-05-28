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
		this.$scope.$on("change", this.handleEvent.bind(this));
	}

	handleEvent (ev, { scope, triggerFn, triggerTokens }) {
		this.log({
			level: "info",
			msg: "handlingChildEvent"
		});
		if (scope._name.fn === "ArtistCardCtrl" && triggerTokens.type === "click") {
			this.$scope.artistcardVisible = false;
		} else if (scope._name.fn === "AlbumCardCtrl" && triggerTokens.type === "click") {
			this.$scope.albumcardVisible = false;
		}
		this._digest();
	}

	@Evented({
		selector: "section.bg-image-n--mediaitem",
		type: "click",
		delegate: null
	})
	openCard () {
		this.$scope[`${this.$scope.model.type}cardVisible`] = true;
		this._digest();
	}
}