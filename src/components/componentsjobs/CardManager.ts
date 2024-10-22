import { deletejob } from "../../utils/api.js";
import { showCardsJobsTo } from "../../utils/helpers.js";
import { appendNodeDocument, placeNodeDocument } from "../../utils/nodes.js";
import ButtonSample from "../componentsShared/ButtonSample.js";
import FromJob from "./FormJob.js";
import InitJobs from "./InitJobs.js";

interface myCard {
  id: number;
  status: boolean;
}
function isCardJobs(component: HTMLElement): myCard {
  if (component.getAttribute("id") === "container-cards_jobs") {
    return { id: null, status: false };
  }

  if (component.classList.contains("card")) {
    return { id: parseInt(component.getAttribute("id")), status: true };
  }

  return isCardJobs(component.parentElement);
}

function eventdDeleteCardJobs(e: PointerEvent): boolean {
  let option: boolean =
    (e.currentTarget as HTMLElement).getAttribute("case") === "status delete";
  if (!option) {
    return false;
  }
  let element: HTMLElement = e.target as HTMLElement;
  let { id, status } = isCardJobs(element);
  if (!status) {
    return false;
  }
  deletejob(id)
    .then((result) => {
      document.getElementById(`${id}`).remove();
      if (!document.getElementById("container-cards_jobs").children.length) {
        placeNodeDocument("#container-jobs", InitJobs());
      }
    })
    .catch((err) => {
      console.error("Ups: " + err);
    });
}

function toggleClassDeleteCard(component: NodeList) {
  component.forEach((element) => {
    (element as HTMLElement).classList.toggle("deleteCardJob");
  });
}

function toggleStatusDelete(component: HTMLElement) {
  if (component.getAttribute("case")) {
    component.removeAttribute("case");
    toggleClassDeleteCard(component.childNodes);
  } else {
    component.setAttribute("case", "status delete");
    toggleClassDeleteCard(component.childNodes);
  }
}

function CardManager() {
  let containerCardManager: HTMLElement = document.createElement("DIV");
  let buttonCreate: HTMLElement = ButtonSample("Crear tarea");
  let buttonDelete: HTMLElement = ButtonSample("Borrar tarea", true);

  let managerCard: HTMLElement = document.createElement("DIV");
  let containerCards: HTMLElement = document.createElement("DIV");

  containerCardManager.classList.add("container-card_Manager");

  buttonDelete.classList.add("button-sample_red");
  managerCard.appendChild(buttonDelete);
  buttonDelete.addEventListener("click", () => {
    toggleStatusDelete(containerCards);
    buttonDelete.classList.toggle("button-sample_target");
    let tempButton: HTMLButtonElement = buttonCreate as HTMLButtonElement;
    tempButton.disabled = tempButton.disabled ? false : true;
  });

  managerCard.classList.add("manager_cards");
  managerCard.appendChild(buttonCreate);

  buttonCreate.addEventListener("click", () => {
    if (!containerCards.getAttribute("case")) {
      appendNodeDocument("#section", FromJob());
    }
  });

  containerCards.classList.add("container-cards_jobs");
  containerCards.setAttribute("id", "container-cards_jobs");
  showCardsJobsTo(containerCards);

  containerCards.addEventListener("click", eventdDeleteCardJobs);

  containerCardManager.appendChild(managerCard);
  containerCardManager.appendChild(containerCards);
  return containerCardManager;
}

export default CardManager;
