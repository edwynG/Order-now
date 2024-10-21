import { toHTMLElement } from "../../utils/nodes.js";
function Loader(): HTMLElement {
  return toHTMLElement(
    `<div class="loader" id="loader">
      <div class="circle">
        <div class="dot"></div>
        <div class="outline"></div>
      </div>
      <div class="circle">
        <div class="dot"></div>
        <div class="outline"></div>
      </div>
      <div class="circle">
        <div class="dot"></div>
        <div class="outline"></div>
      </div>
      <div class="circle">
        <div class="dot"></div>
        <div class="outline"></div>
      </div>
    </div>`
  ).firstChild as HTMLElement;
}

export default Loader;
