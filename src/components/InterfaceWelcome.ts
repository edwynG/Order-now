import { routerDOM } from "../utils/context.js";
import { searchChildNode, toHTMLElement } from "../utils/nodes.js";
import { toNavigateHash } from "../utils/routes.js";
import ButtonAnimate from "./componentsShared/ButtonAnimate.js";

function InterfaceWelcome(): HTMLElement {
  const container: HTMLElement = toHTMLElement(
    `<div class="welcome-container">
      <div class="container-text_welcome">
        <h1 class="welcome-text welcome-title">Tareas en orden</h1>
        <h2 class="welcome-text welcome-slogan">
          Organiza tu día, completa tus metas.
        </h2>
      </div>
    ${ButtonAnimate("Empecemos", "btn-init").innerHTML}
    </div>`
  ).firstChild as HTMLElement;
  searchChildNode(container, "#btn-init")?.addEventListener("click", (e) => {
    e.preventDefault();
    toNavigateHash(routerDOM.jobs);
  });

  return container;
}

export default InterfaceWelcome;
