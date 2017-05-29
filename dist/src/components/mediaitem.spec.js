import Module from "../app";
import { MediaItemCtrl } from "./mediaitem";
import $ from "jquery";

describe("MediaItem", () => {
    describe("MediaItemCtrl", () => {
        let ctrl, $scope, $element;

        beforeEach(() => {
            angular.mock.module(Module);

            inject(($controller, $rootScope, $timeout) => {
                $scope = $rootScope.$new();
                $element = angular.element('<div></div>');
                ctrl = $controller("MediaItemCtrl", {
                    $scope,
                    $timeout,
                    $element
                });
            });
        });

        it("should have it's proper name", () => {
            expect(ctrl.constructor.name).toBe("MediaItemCtrl");
        });

        it("should have no albumcard", () => {
            expect(ctrl.$scope.albumcardVisible).toEqual(false);
        });
        it("should have no artistcard", () => {
            expect(ctrl.$scope.artistcardVisible).toEqual(false);
        });
        
        it("should open an albumcard", () => {
            ctrl.$scope.model = {
                type: "album"
            };
            ctrl.openCard();
            expect(ctrl.$scope.albumcardVisible).toEqual(true);
        });
        it("should open an artistcard", () => {
            ctrl.$scope.model = {
                type: "artist"
            };
            ctrl.openCard();
            expect(ctrl.$scope.artistcardVisible).toEqual(true);
        });
        
    });
    describe("MediaItemDirective", () => {
        let compile, rootScope, model = {
            id: "abc123",
            title: "ABC123",
            type: "album",
            actionText: "View Tracks",
            img: {
                small: "1.jpg",
                large: "2.jpg"
            }
        };

        beforeEach(() => {
            angular.mock.module(Module);

            inject(($compile, $rootScope) => {
                compile = $compile;
                rootScope = $rootScope;
                rootScope.model = model;
                rootScope.clientIsPhone = false;
            });
        });

        it("replaces the directive's tag with its content", () => {
            let element = compile("<mediaitem mediaitem-id=\"{{model.id}}\" mediaitem-type=\"{{model.type}}\"></mediaitem>")(rootScope);
            rootScope.$digest();
            expect($("section", element[0].outerHTML).length).toEqual(4);
        });

    });
});
