import Module from "../app";
import { LandingPageCtrl } from "./landing";

describe("LandingPage", () => {
    describe("LandingPageCtrl", () => {
        let ctrl, $scope;

        beforeEach(() => {
            angular.mock.module(Module);

            inject(($controller, $rootScope) => {
                $scope = $rootScope.$new();
                ctrl = $controller("LandingPageCtrl", { $scope });
            });
        });

        it("should have it's proper name", () => {
            expect(ctrl.constructor.name).toBe("LandingPageCtrl");
        });
    });
});
