import CardJobs from "../components/componentsjobs/CardJob.js";
import Loader from "../components/componentsShared/Loader.js";
import { getDatajobs } from "./api.js";
import { appendNodeDocument, removeNodeBySelector } from "./nodes.js";

export function getAbbreviatedDate(): string {
  const monthNames: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let now: Date = new Date();
  let day: number = now.getDate();
  let month: string = monthNames[now.getMonth()];
  let year: number = now.getFullYear();
  return `${day} ${month}, ${year} `;
}

export function showCardsJobsTo(element: HTMLElement) {
  getDatajobs().then((arr) => {
    arr.forEach((object) => {
      element.appendChild(CardJobs(object));
    });
  });
}

export function decoratorRouterLoader(functions: () => void) {
  let loader: HTMLElement = document.getElementById("loader");
  if (!loader) {
    appendNodeDocument("#root", Loader());
  }
  setTimeout(() => {
    functions();
    removeNodeBySelector("#loader");
  }, 3000);
}
