export type Visual = {
  value: number;
  state: SortState;
}

export enum SortState{
  Default = 0,
  Selected,
  Visited,
  Swapping,
  Correct,
}

export function updateVis(arr:Visual[], DivEl:HTMLDivElement, frag:DocumentFragment):void{
  DivEl.innerHTML='';
  let col='';
  arr.forEach(element => {
    switch (element.state) {
      case SortState.Selected:
        col = 'rgba(0,0,255,0.5)'
        break;
      case SortState.Visited:
        col = 'rgba(255,255,0,0.5)'
        break;
      case SortState.Swapping:
        col = 'rgba(255,0,0,0.5)'
        break;
      case SortState.Correct:
        col = 'rgba(0,255,0,0.5)'
        break;
      default:
        col = 'rgba(0,0,0,0.5)'
        break;
    }
    const div = document.createElement("div");
    div.innerHTML = element.value.toString();
    div.style.cssText = `width: 2rem; margin-left: 1rem; margin-right: 1rem; height: ${element.value/4}rem; background-color: ${col};`;
    frag.appendChild(div);
  });
  DivEl.appendChild(frag);
}