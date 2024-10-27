import { toHTMLElement } from "../../utils/nodes.js"


function ButtonAnimate(text: string, id?: string):HTMLElement {
  return toHTMLElement(`
       <div class="container-btn_animation">
        <button class="animated-button" id =${id}>
          <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path></svg
          ><span class="text">${text}</span><span class="circle"></span
          ><svg
            viewBox="0 0 24 24"
            class="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
        </button>
      </div>
    `).firstChild as HTMLElement
}

export default ButtonAnimate