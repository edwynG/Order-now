import { removeNodeBySelector } from "../../utils/nodes.js";

function NoteSheet(title: string, content: string, date: string): HTMLElement {
  let container: HTMLElement = document.createElement("DIV");
  container.classList.add("container-page");
  container.setAttribute("id", "container-page");
  container.innerHTML = `
                          <div class="page" id="page">
                              <div class="margin"></div>
                              <h2>${title}</h2>
                              <p>${content}</p>
                              <span>${date}</span>
                          </div>
                        `.trim();

  container.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target !== document.getElementById("container-page")) {
      return false;
    }
    document.getElementById("page").classList.add("animation-closeEffectScale");
    setTimeout(() => {
      removeNodeBySelector("#container-page");
    }, 300);
  });

  return container;
}

export default NoteSheet;
