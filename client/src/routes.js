import LandingPageTpl from "../ui/landing.html";
import SearchPageTpl from "../ui/search.html";

var routes = {
    default: {
        controller: "LandingPageCtrl",
        template: LandingPageTpl
    },
    "/search": {
        controller: "SearchPageCtrl",
        template: SearchPageTpl
    }
};

export default routes;
