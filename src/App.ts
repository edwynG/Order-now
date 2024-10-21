import Footer from "./components/componentsShared/Footer.js";
import { toHTMLElement } from "./utils/nodes.js";

const App = (): any => {
  let container: HTMLElement = toHTMLElement(`<div id='app'>
                                        <main id='section'>
                                        </main>
                                        ${Footer().innerHTML}
                                      </div>`);

  return container.firstChild as HTMLElement;
};

export default App;

