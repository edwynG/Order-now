export function toHTMLElement(str: string): HTMLElement {
  let regex: RegExp = /^<(.+)>(.*)<\/(.+)>$/;
  if (!regex.test(str.trim().replaceAll("\n", ""))) {
    return null;
  }
  let node: HTMLElement = document.createElement("div");
  node.innerHTML = str.trim();

  return node;
}

export function removeNodeBySelector(selector: string): void {
  let node: HTMLElement = document.querySelector(selector);
  if (node != null) {
    node.remove();
  }
}

export function placeNodeDocument(selector: string, element: Node): void {
  const node: HTMLElement = document.querySelector(selector);
  if (node != null) {
    node.innerHTML = "";
    node.appendChild(element);
  }
}

export function appendNodeDocument(querySelector: string, element: Node): void {
  const node: HTMLElement = document.querySelector(querySelector);
  if (node != null) {
    node.appendChild(element);
  }
}

export function searchChildNode(nodo:HTMLElement,selector:string): HTMLElement | null {
  if ( !nodo || !(nodo instanceof Element)) {
    return null;
  }
  if(nodo.matches(selector)){
    return nodo
  }

  for (const element of [...nodo.childNodes]) {
    const child: HTMLElement | null = searchChildNode(element as HTMLElement,selector);
    if(child){
      return child
    }
  }

  return null
}

