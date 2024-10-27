import { createjob, getIdMax, MyData, Response } from "../../utils/api.js";
import { getAbbreviatedDate } from "../../utils/helpers.js";
import {
  appendNodeDocument,
  removeNodeBySelector,
  searchChildNode,
} from "../../utils/nodes.js";
import ButtonFormulation from "../componentsShared/ButtonFormulation.js";
import CardJobs from "./CardJob.js";

function formClose() {
  document
    .getElementById("windowCreadJobs")
    .classList.add("animation-closeEffectScale");
  setTimeout(() => {
    removeNodeBySelector("#container-windowCreadJobs");
  }, 300);
}

async function createJobs(e: Event) {
  e.preventDefault();
  let inputTitleJob: HTMLInputElement = document.getElementById(
    "title"
  ) as HTMLInputElement;
  let inputDetailsJob: HTMLInputElement = document.getElementById(
    "textarea"
  ) as HTMLInputElement;

  let title: string = inputTitleJob.value.trim();
  let content: string = inputDetailsJob.value.trim();

  if (title.length == 0 || content.length == 0) {
    alert("Faltan datos por rellenar en el formulario.");
    return false;
  }
  formClose();

  let id: number = await getIdMax();
  let data: MyData = {
    id: id + 1,
    title,
    content,
    date: getAbbreviatedDate(),
  };

  appendNodeDocument("#container-cards_jobs", CardJobs(data));

  const result: Response = await createjob(data);
  console.log(result);
}

function interaction(
  buttonCread: HTMLElement,
  buttonCancel: HTMLElement
): void {
  buttonCread.addEventListener("click", createJobs);
  buttonCancel.addEventListener("click", formClose);
}

function FormJob(): HTMLElement {
  let container: HTMLElement = document.createElement("DIV");
  container.classList.add("container-form");
  container.setAttribute("id", "container-windowCreadJobs");

  const buttonCread: HTMLElement = ButtonFormulation(
    "Crear tarea",
    "creadJobs"
  );
  const buttonCancel: HTMLElement = ButtonFormulation("cancelar", "cancelJobs");
  buttonCancel.classList.add("btn-cancel");
  interaction(buttonCread, buttonCancel);

  container.innerHTML = `
                       <div class="form-container" id="windowCreadJobs">
                        <form class="form" id='form'>
                          <div class="form-group">
                            <label for="title">Tarea</label
                            ><input type="text" id="title" name="title"/>
                          </div>
                          <div class="form-group">
                            <label for="textarea">Detalles</label
                            ><textarea
                              name="textarea"
                              id="textarea"
                              rows="10"
                              cols="50"
                            ></textarea>
                          </div>
                          <div class="group-btn" id="group-btn">
                           
                          </div>
                        </form>
                      </div>
                      `.trim();
  searchChildNode(container, "#form").addEventListener("submit",(e)=> e.preventDefault());
  let groupBtn: HTMLElement = searchChildNode(container, "#group-btn");
  groupBtn?.appendChild(buttonCread);
  groupBtn?.appendChild(buttonCancel);
  return container;
}

export default FormJob;
