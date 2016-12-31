import "reflect-metadata";  //this is a required polyfill for inversify and should only be imported once in the application
import { IAlertService, TYPES } from "./IAlertService";
import { inject, injectable, Container } from "inversify";
import AlertService from "./AlertService";

let kernel = new Container();
kernel.bind<IAlertService>(TYPES.IAlertService).to(AlertService);

export default kernel;