import "../assets/styles/main.scss";

import module from "./module";
import routes from "./routes";

import "./pages/landing";

module.routing(routes);
module.bootstrap();
