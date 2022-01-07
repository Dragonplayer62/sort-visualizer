import type {Visual} from "./visualization";
import {SortState, updateVis} from "./visualization";
import {BubbleSort, initBS} from "./Bubblesort";

let handle: NodeJS.Timer;

export function generateRandomArray(min:number, max:number, length:number):Visual[]{
  const arr:Visual[] = [];
  for(let i=0; i<length; i++){
    const tmp:Visual = {
      value: Math.floor(Math.random()*(max-min) + min), 
      state: SortState.Default};
    arr.push(tmp);
  }
  return arr;
}

export function booba(arr:Visual[], delay:number, container:HTMLDivElement, frag:DocumentFragment):void{
  initBS(arr);
  handle = setInterval(()=>cont(arr, container, handle, frag), delay);
  cont(arr, container, handle, frag);
}

function cont(arr:Visual[], container:HTMLDivElement, handle:NodeJS.Timer, frag:DocumentFragment):void{
  if(isSorted(arr)){
    updateVis(arr, container, frag);
    clearInterval(handle);
    console.log("sorted");
    return;
  }
  updateVis(arr, container, frag);
  BubbleSort(arr);
}

export function swap(arr:Visual[], index1:number, index2:number):void{
  const tmp = arr[index1].value;
  arr[index1].value = arr[index2].value;
  arr[index2].value = tmp;
}



function isSorted(arr:Visual[]):boolean{
  for (let i = 0; i < arr.length-1; i++) {
    if(arr[i].value > arr[i+1].value) return false;
  }

  arr.forEach(element => {
    element.state = SortState.Correct;
  });
  return true;
}