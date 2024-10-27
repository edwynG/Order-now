import { toHTMLElement } from "../../utils/nodes.js"


function ButtonFormulation(text:string, id:string):HTMLElement {
  return toHTMLElement(`
    <button class="form-submit-btn" id="${id}">
    ${text}
    </button>
    `.trim()).firstChild as HTMLElement
}

export default ButtonFormulation