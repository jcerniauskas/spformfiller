import "reflect-metadata";  // this is a required polyfill for inversify and should only be imported once in the application
import { inject, injectable, Container } from "inversify";
import { IPageVisibilityHandler } from "./PageVisibilityHandler/IPageVisibilityHandler";
import SPFormUrlMatcher from "./PageVisibilityHandler/SPFormUrlMatcher";

let kernel = new Container();
kernel.bind<IPageVisibilityHandler>("IPageVisibilityHandler").to(SPFormUrlMatcher);

export default kernel;