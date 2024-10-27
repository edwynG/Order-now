interface Render {
  root: HTMLElement | null;
  render(app: HTMLElement): void;
}

export class DOM {
  private static write: Render;
  public static createRoot(element: HTMLElement | null): Render {
    element.innerHTML = "";
    this.write = {
      root: element,
      render: (app: HTMLElement) => {
        if (app instanceof Node) {
          this.write.root?.appendChild(app);
          return;
        }

        let node: HTMLElement = document.createElement("div");
        node.innerHTML = app === undefined ? "" : app;
        let child: Node =
          node.firstChild === null
            ? document.createTextNode("")
            : node.firstChild;
        this.write.root?.appendChild(child);
      },
    };
    return this.write;
  }

  public static getRoot(): HTMLElement {
    return this.write.root;
  }
}
