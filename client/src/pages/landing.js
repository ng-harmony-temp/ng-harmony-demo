import { Controller as Ctrl } from "ng-harmony/ng-harmony-core";
import { Controller } from "ng-harmony/ng-harmony-decorator";

@Controller({
	module: "compucorp",
	name: "LandingPageCtrl",
	deps: ["$routeParams"]
})
export class LandingPageCtrl extends Ctrl {
    constructor (...args) {
        super(...args);
        console.log("Landing Page initialized!");
    }
};
