import angular from "angular";
import router from "angular-route";
import resource from "angular-resource";
import animate from "angular-animate";
import loadingBar from "angular-loading-bar";
import { Module } from "ng-harmony-module";

var module = new Module("compucorp", ["ngRoute", "ngResource", "ngAnimate", "angular-loading-bar"]);

export default module;
