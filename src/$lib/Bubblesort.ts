import type {Visual} from "./visualization";
import {SortState} from "./visualization";
import {swap} from "./sorting";

//counter 1 and 2 are equivalent to i and j for the "for" loops, step is for visualization. When all steps are done, increase counter2
let counter1: number, counter2: number, step: number;

export function initBS(arr:Visual[]):void{
  counter1 = arr.length;
  counter2 = 0;
  step = 0;
}

//Because using loops while showing visual change doesn't work, I manually iterate via counter1 and 2 (also allows for click by click stepping through)
export function BubbleSort(arr:Visual[]):void{
  if(counter1===0) return;
  
  if(counter2>=counter1-1) {
    counter1--;
    arr[counter1].state = SortState.Correct;
    counter2 = 0;
  }
  manualSort(arr, counter1, counter2);
}

//All this function really needs is step 3. The rest is purely visualization
function manualSort(arr:Visual[], len:number, ind:number):void{
  const fullLen = len-1;
  if(ind >= fullLen) return;
  switch(step){
    case 0:
      arr[ind].state = SortState.Selected;
      break;
    case 1:
      arr[ind+1].state = SortState.Selected;
      break;
    case 2:
      if(arr[ind].value > arr[ind+1].value){
        arr[ind+1].state = SortState.Selected;
        arr[ind].state = SortState.Swapping;
      }
      else{
        arr[ind].state = SortState.Visited;
        arr[ind+1].state = SortState.Visited;
        step++;
        counter2++;
      }
      break;
    case 3:
      if(arr[ind].value > arr[ind+1].value){
        swap(arr, ind, ind+1);
        arr[ind+1].state = SortState.Swapping;
      }
      arr[ind].state = SortState.Visited;
      counter2++;
      break;
    default:
      break;
  }
  step = (step+1)%4;
}