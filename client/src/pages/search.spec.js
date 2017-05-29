import Module from "../app";
import { SearchPageCtrl } from "./search";

describe("SearchPage", () => {
    describe("SearchPageCtrl", () => {
        let ctrl, $scope;

        beforeEach(() => {
            angular.mock.module(Module);
            angular.mock.module(($provide) => {
                $provide.service("SpotifyService", class MockedSpotify {
                    subscribeAlbums (cb) {
                        this.albumsCB = cb;
                    }
                    subscribeArtists (cb) {
                        this.artistsCB = cb;
                    }
                });
            });

            inject(($controller, $rootScope, $timeout, screenSize, SpotifyService) => {
                $scope = $rootScope.$new();
                ctrl = $controller("SearchPageCtrl", {
                    $scope,
                    $timeout,
                    screenSize,
                    SpotifyService
                });
            });
        });

        it("should have it's proper name", () => {
            expect(ctrl.constructor.name).toBe("SearchPageCtrl");
        });

        it("should have an empty model/collection", () => {
            expect(ctrl.$scope.collection.length).toEqual(0);
        });

        it("should push a doc into the collection", () => {
            ctrl._addSearchResult({
                id: "abc123",
                name: "ABC",
                images: ["1.jpg", "2.jpg", "3.jpg"]
            }, "View Album", "album");
            expect(ctrl.$scope.collection.length).toEqual(1);
        });

        it("should filter the pushed duplicate document", () => {
            ctrl._addSearchResult({
                id: "abc123",
                name: "ABC",
                images: ["1.jpg", "2.jpg", "3.jpg"]
            }, "View Album", "album");
            expect(ctrl.$scope.collection.length).toEqual(1);
        });
    });
});
