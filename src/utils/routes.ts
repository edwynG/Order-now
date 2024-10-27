import Loader from "../components/componentsShared/Loader.js";
import InterfaceNofound from "../components/InterfaceNofound.js";
import InterfaceWelcome from "../components/InterfaceWelcome.js";
import InterfaceJobs from "../components/InterfaceJobs.js";
import { routerDOM, routerHashDOM } from "./context.js";
import { placeNodeDocument } from "./nodes.js";
import { existDatabase, Response } from "./api.js";

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

async function renderHome(): Promise<void> {
  history.pushState(null, "Home", "/#" + routerDOM.home);
  let { result }: Response = await existDatabase();
  if (result) {
    toNavigateHash(routerDOM.jobs);
    return;
  }
  placeNodeDocument("#section", InterfaceWelcome());
}

async function renderJobs(): Promise<void> {
  let element: HTMLElement = await InterfaceJobs();
  placeNodeDocument("#section", element);
}

function renderNoFound(): void {
  history.pushState(null, "No found:(", "/#" + routerDOM.noFound);
  placeNodeDocument("#root", InterfaceNofound());
}
