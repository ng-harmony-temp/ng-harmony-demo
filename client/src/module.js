import angular from "angular";
import router from "angular-route";
import animate from "angular-animate";
import loadingBar from "angular-loading-bar";
import mediaQueries from "angular-media-queries";
import { Module } from "ng-harmony-module";

var module = new Module("compucorp", ["ngRoute", "ngAnimate", "angular-loading-bar", "matchMedia"]);

export default module;
