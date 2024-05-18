import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{
  a = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,0]
  ]
  timer = {
    ms:0,
    sec:0,
    min:0,
    hr:0,
  }
  startTimer :any
  running = false
  startTime(){
    let t = {
      ms:0,
      sec:0,
      min:0,
      hr:0,
    }
    this.timer = t
    this.startTimer = setInterval(()=>{
      if(this.running){
      this.timer.ms++
      if(this.timer.ms === 100){
        this.timer.sec++
        this.timer.ms = 0
      }
      if(this.timer.sec === 60){
        this.timer.min++
        this.timer.sec = 0
      }
      if(this.timer.min === 60){
        this.timer.hr++
        this.timer.min = 0
      }}else{
        this.stopTimer()
      }
    },10)
  }
  stopTimer(){
    clearInterval(this.startTimer)
  }
  onClickShuffle(){
    this.running = false
    let flat = this.a.flat()
    let shuffle 
    while(true){ 
      shuffle = this.shuffle(flat)
      if(this.isSolvable(shuffle))break;
    }
    this.a = this.chunkArray(shuffle,4)
  }
  reset(){
    this.a =  [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,0]
    ]
    this.running = false
    
  }
  ngOnInit(){
  }
  onClick(data:any){
    let correctPuzzle = [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,0]
    ] 
    let emptyPos = this.findIndex2D(this.a,0) || []
    let numAroundEmpty = [...this.getPosPosible(this.a,emptyPos)]
    if(numAroundEmpty.filter(a=>a==data).length > 0 ){
      this.swaptile(this.findIndex2D(this.a,data)||[],emptyPos,data)
      if(this.running === false){ 
        this.running = true
        this.startTime()
        }
        if(String(correctPuzzle) == String(this.a)) this.running = false
    }
    

  }
  shuffle(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  swaptile(numberPos: any[] ,emptyPos: any[],data: number){
    this.a[emptyPos[0]][emptyPos[1]] = data
    this.a[numberPos[0]][numberPos[1]] = 0
  }
  // Check ว่า แก้ได้ไหม
  isSolvable(puzzle:any) {
    
      const inversions = this.countInversions(puzzle.filter((n:any) => n !== 0));
      const blankRow = Math.floor(puzzle.indexOf(0) / 4);

      if (blankRow % 2 === 0) { // ช่องว่างอยู่ที่แถวคู่จากด้านล่าง
          return inversions % 2 !== 0;
      } else { // ช่องว่างอยู่ที่แถวคี่จากด้านล่าง
          return inversions % 2 === 0;
      }
  }
// นับจำนวน Inversions
  countInversions(array: string | any[]) {
      let inversions = 0;
      for (let i = 0; i < array.length - 1; i++) {
          for (let j = i + 1; j < array.length; j++) {
              if (array[i] > array[j]) inversions++;
          }
      }
      return inversions;
  }
  getPosPosible(array: any,emptypos: any){
    let a = []
    array[emptypos[0]-1]!=undefined ? a.push(array[emptypos[0]-1][emptypos[1]]):''
    array[emptypos[0]][emptypos[1]-1]!=undefined ? a.push(array[emptypos[0]][emptypos[1]-1]):''
    array[emptypos[0]+1]!=undefined ? a.push(array[emptypos[0]+1][emptypos[1]]):''
    array[emptypos[0]][emptypos[1]+1]!=undefined ? a.push(array[emptypos[0]][emptypos[1]+1]):''
    return a
  }
  findIndex2D(array: any[], target: any) {
      const rowIndex = array.findIndex(row => row.includes(target));
      if (rowIndex === -1) return null;

      const colIndex = array[rowIndex].findIndex((value: any) => value === target);
      if (colIndex === -1) return null;

      return [rowIndex, colIndex];
  }
  //แปลง array เป็น 2 มิติ เหมือนเดิม
  chunkArray(array:any, size:any) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, size + i));
    }
    return chunkedArray;
}
}
