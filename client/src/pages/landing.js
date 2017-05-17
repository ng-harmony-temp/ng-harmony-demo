import { Controller as Ctrl } from "ng-harmony-core";
import { Controller } from "ng-harmony-decorator";

@Controller({
	module: "compucorp",
	name: "LandingPageCtrl"
})
export class LandingPageCtrl extends Ctrl {
    constructor (...args) {
        super(...args);
        console.log("Landing Page initialized!");
    }
};
