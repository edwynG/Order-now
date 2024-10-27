import { appendNodeDocument, placeNodeDocument } from "../../utils/nodes.js";
import ButtonAnimate from "../componentsShared/ButtonAnimate.js";
import containerCards from "./CardManager.js";
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
      placeNodeDocument("#container-jobs", containerCards());
    });
    document.getElementById("cancelJobs").addEventListener("click", () => {
      placeNodeDocument("#container-jobs", InitJobs());
    });
  });

  return container;
}

export default InitJobs;
