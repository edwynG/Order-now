import { isEmptyDatabase } from "../utils/api.js";
import { toHTMLElement } from "../utils/nodes.js";
import CardManager from "./componentsjobs/CardManager.js";
import InitJobs from "./componentsjobs/InitJobs.js";

async function InterfaceJobs(): Promise<HTMLElement> {
  try {
    let result = await isEmptyDatabase();
    let container: HTMLElement = document.createElement("DIV");
    container.classList.add("container-jobs");
    container.setAttribute("id", "container-jobs");
    container.appendChild(result ? InitJobs() : CardManager());

    return container;
  } catch (error) {
    return null;
  }
}

export default InterfaceJobs;
