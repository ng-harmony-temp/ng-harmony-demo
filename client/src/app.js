import "../assets/styles/main.scss";

import "babel-polyfill";

import module from "./module";
import routes from "./routes";

import "./services/spotify";

import "./pages/landing";
import "./pages/search";

module.routing(routes);
module.config(($locationProvider) => {
	$locationProvider.html5Mode(false);
})
module.bootstrap();
