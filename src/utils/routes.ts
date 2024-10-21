import Loader from "../components/componentsShared/Loader.js";
import InterfaceNofound from "../components/InterfaceNofound.js";
import InterfaceWelcome from "../components/InterfaceWelcome.js";
import InterfaceJobs from "../components/InterfaceJobs.js";
import { routerDOM, routerHashDOM } from "./context.js";
import {
  appendNodeDocument,
  placeNodeDocument,
  removeNodeBySelector,
} from "./nodes.js";
import { existDatabase, isEmptyDatabase } from "./api.js";
import { decoratorRouterLoader } from "./helpers.js";

export function toNavigateHash(pathname: string): void {
  let path: string = "/#" + pathname;
  history.pushState(null, pathname, path);
  toRoute();
}

export function toRoute(): void {
  let hash: string = location.hash;

  switch (hash) {
    case "":
      renderHome();
      break;

    case routerHashDOM.home:
      renderHome();
      break;

    case routerHashDOM.jobs:
      renderJobs();
      break;

    default:
      renderNoFound();
  }
}

export function renderHome(): void {
  history.pushState(null, "Home", "/#" + routerDOM.home);
  existDatabase().then((result) => {
    if (result) {
      toNavigateHash(routerDOM.jobs);
      return;
    }
    placeNodeDocument("#section", InterfaceWelcome());
    
  });
}

function renderJobs(): void {
  InterfaceJobs().then((element) => {
    placeNodeDocument("#section", element);
  });
}

function renderNoFound(): void {
  history.pushState(null, "No found:(", "/#" + routerDOM.noFound);
  placeNodeDocument("#root", InterfaceNofound());
}
