// src/utils
const EXCLUDED_TAGS = new Set(["A", "CODE", "BUTTON"]);

export const wrapTextNodesWithSpans = (node: Node) => {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    const current = walker.currentNode;
    if (!current || !current.nodeValue?.trim()) continue;

    const parent = current.parentElement;
    if (!parent || EXCLUDED_TAGS.has(parent.tagName)) continue;

    textNodes.push(current as Text);
  }

  for (const textNode of textNodes) {
    const parent = textNode.parentNode;
    if (!parent) continue;

    const text = textNode.nodeValue ?? "";
    const words = text.split(/(\s+)/); // Split and preserve spaces
    const fragment = document.createDocumentFragment();

    for (const word of words) {
      if (word.trim() === "") {
        fragment.appendChild(document.createTextNode(word)); // preserve spaces
        continue;
      }

      const span = document.createElement("span");
      span.textContent = word;
      span.className = "inline-block transition-transform duration-150 ease-out";
      span.setAttribute("data-repel-word", ""); // used to find later
      fragment.appendChild(span);
    }

    parent.replaceChild(fragment, textNode);
  }
};
