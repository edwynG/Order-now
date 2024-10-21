import { toHTMLElement } from "../../utils/nodes.js";

function ButtonSample(text:string,quitIcon = false):HTMLElement {
  return toHTMLElement(`
                    <button class="button-sample">
                        <span>
                          ${!quitIcon?`
                            <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                            </svg>

                          `: `<img src="https://cdn-icons-png.flaticon.com/512/7844/7844203.png" height="16" width="16"  ></img>`}
                            <p>${text}</p>
                        </span>
                    </button>
    `).firstChild as HTMLElement;
}

export default ButtonSample;
