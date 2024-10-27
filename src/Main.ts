import App from "./App.js";
import { DOM } from "./utils/dependents.js";
import { decoratorRouterLoader } from "./utils/helpers.js";
import { toRoute } from "./utils/routes.js";

document.addEventListener("DOMContentLoaded", () => {
  decoratorRouterLoader(() => {
    DOM.createRoot(document.getElementById("root")).render(App());
    toRoute();
  });
});

window.addEventListener("hashchange", toRoute);
