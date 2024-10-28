import { appendNodeDocument, placeNodeDocument } from "../../utils/nodes.js";
import ButtonAnimate from "../componentsShared/ButtonAnimate.js";
import CardManager from "./CardManager.js";
import FromJob from "./FormJob.js";

function InitJobs(): HTMLElement {
  let container: HTMLElement = document.createElement("DIV");
  container.classList.add("container-initjobs");
  container.setAttribute("id", "container-initjobs");
  let button: HTMLElement = ButtonAnimate(
    "Crear tarea",
    "btn-cread_first_jobs"
  );
  container.innerHTML = `
                        <div class="init-title">
                          <h2>Vacio por ahora</h2>
                          <h3>¡Es hora de llenar tu lista de tareas!.</h3>
                        </div>
                        `.trim();
  container.appendChild(button);

  button.addEventListener("click", () => {
    appendNodeDocument("#section", FromJob());
    document.getElementById("creadJobs").addEventListener("click", () => {
      setTimeout(async () => {
        const InterfaceWithCards = await CardManager();
        placeNodeDocument("#container-jobs", InterfaceWithCards);
      }, 100);
    });
  });

  return container;
}

export default InitJobs;
