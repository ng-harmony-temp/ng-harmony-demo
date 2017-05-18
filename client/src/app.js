import "../assets/styles/main.scss";

import module from "./module";
import routes from "./routes";

import "./pages/landing";
import "./pages/search";

module.config(($locationProvider) => {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("");
});
module.routing(routes);
module.bootstrap();
