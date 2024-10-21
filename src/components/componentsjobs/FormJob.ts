import { createjob, getIdMax, MyData } from "../../utils/api.js";
import { getAbbreviatedDate } from "../../utils/helpers.js";
import { appendNodeDocument, removeNodeBySelector } from "../../utils/nodes.js";
import CardJobs from "./CardJob.js";

function formClose() {
  document
    .getElementById("windowCreadJobs")
    .classList.add("animation-closeEffectScale");
  setTimeout(() => {
    removeNodeBySelector("#container-windowCreadJobs");
  }, 300);
}

function createJobs(e: Event) {
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
    return;
  }
  formClose();

  getIdMax().then((id) => {
    let data: MyData = {
      id: id + 1,
      title,
      content,
      date: getAbbreviatedDate(),
    };
    appendNodeDocument("#container-cards_jobs", CardJobs(data));

    createjob(data);
  });
}

function interaction(): void {
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  let buttonCread: HTMLElement = document.getElementById("creadJobs");
  let buttonCancel: HTMLElement = document.getElementById("cancelJobs");
  buttonCread.addEventListener("click", (e) => createJobs(e));
  buttonCancel.addEventListener("click", formClose);
}

function FormJob(): HTMLElement {
  let container: HTMLElement = document.createElement("DIV");
  container.classList.add("container-form");
  container.setAttribute("id", "container-windowCreadJobs");
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
                          <div class="group-btn">
                            <button class="form-submit-btn" type="submit" id='creadJobs'>Crear tarea</button>
                            <button class="form-submit-btn btn-cancel" id='cancelJobs'>Cancelar</button>
                          </div>
                        </form>
                      </div>
                      `.trim();
  setTimeout(interaction, 500);
  return container;
}

export default FormJob;
