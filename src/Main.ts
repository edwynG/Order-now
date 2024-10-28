import App from "./App.js";
import { DOM } from "./utils/dependents.js";
import { addInterfaceLoad, removeInterfaceLoad } from "./utils/helpers.js";
import { toRoute } from "./utils/routes.js";

document.addEventListener("DOMContentLoaded", async () => {
  DOM.createRoot(document.getElementById("root")).render(App());
  addInterfaceLoad();
  await toRoute();
  setTimeout(() => {
    removeInterfaceLoad();
  }, 2000);
});

window.addEventListener("hashchange", toRoute);
