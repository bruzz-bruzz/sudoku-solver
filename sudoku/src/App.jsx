import './App.css'
import Github from './Github.jsx'
import Toast from './Toast.jsx'
import {useState,useEffect} from 'react'
export default function App(){
  const [grid,setGrid] = useState(Array.from({length:9},()=>Array(9).fill(0)))
  const [toast,setToast] = useState({ok:true,msg:''})
  function clearToast(){
    setTimeout(()=>{
      setToast({ok:true,msg:''})
    },3000)
  }
  function isValid(board,row,col,num){
    for(let x=0;x<9;x++){
        if(board[row][x]===num || board[x][col]===num){
            return false;
        }
    }
    let [startRow,startCol] = [3 * Math.floor(row / 3), 3 * Math.floor(col / 3)];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i+startRow][j+startCol]===num){
                return false;
            }
        }
    }
    return true;
}
function isValidFull(board){
  let [r,c,g] = [{},{},{}]
  for(let i = 0; i < 9; i++){
    r[i] = new Set()
    c[i] = new Set()
    g[i] = new Set()
  }
  for(let row = 0; row < 9; row++){
    for(let col = 0; col < 9; col++){
      r[row].add(board[row][col])
      c[col].add(board[row][col])
      g[(Math.floor(row / 3) * 3) + Math.floor(col / 3)].add(board[row][col])
    }
  }
  for(let i = 0; i < 9; i++){
    if(r[i].size != 9 || c[i].size != 9 || g[i].size != 9){
      setToast({ok:false,msg:"Invalid Sudoku!"})
      return false
    }
  }
  setToast({ok:true,msg:"Valid Sudoku!"})
  return true
}
function solveHelper(board){
  let b = board
  solve_sudoku(b)
  setGrid([...b])
  setToast({ok:true,msg:'Sudoku Board Solved!'})
  clearToast()
}
function solve_sudoku(board){
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            if(board[row][col]===0){
                for(let num=1;num<=9;num++){
                    if(isValid(board,row,col,num)){
                        board[row][col] = num;
                        if(solve_sudoku(board)){
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function fill_grid(board){
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            if(board[row][col]===0){
                let nums = [1,2,3,4,5,6,7,8,9];
                for(let i=nums.length-1;i>0;i--){
                    let j = Math.floor(Math.random() * (i + 1));
                    [nums[i], nums[j]] = [nums[j], nums[i]];
                }
                for(let num of nums){
                    if(isValid(board,row,col,num)){
                        board[row][col] = num;
                        if(fill_grid(board)){
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function generate(){
    let board = Array.from({length:9},()=>Array(9).fill(0));
    fill_grid(board);
    let clues = 81
    while(clues > 17){
        let [row,col] = [Math.floor(Math.random()*9),Math.floor(Math.random()*9)];
        if(board[row][col]!==0){
            board[row][col] = 0;
            clues--;
        }
    }
    setToast({ok:true,msg:'Sudoku Board Generated!'})
    clearToast()
    return board
}
function visualize(board){
  let res = ''
  for(let i = 0; i < 9; i++){
    for(let y = 0; y < 9; y++){
      res += board[i][y] === 0 ? ' . ' : ' ' + board[i][y] + ' '
    }
    res += '\n'
  }
  return res
}
useEffect(()=>{
  setGrid(generate())
},[]) 
return (
  <div className='font-mono'>
    <div className='flex justify-center items-center flex-col'>
        <h1>Sudoku Solver</h1>
        <div className='grid grid-cols-3 gap-4'>
          <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => setGrid(generate())}>
            Generate Sudoku Board
          </button>
          <button className='bg-green-500 text-white py-2 px-4 rounded' onClick={() => solveHelper(grid)}>
            Solve Sudoku Board
          </button>
          <button className='bg-yellow-500 text-white py-2 px-4 rounded' 
          onClick={()=>{
            isValidFull(grid)
          }}>
            Check Valid Sudoku Board
          </button>
        </div>
        {grid.length > 0 && (
          <div className='grid grid-cols-9 gap-1 mt-4'>
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <input key={`${i}-${j}`} className='border border-gray-300 p-2 text-center h-12 w-12 flex items-center justify-center hover:bg-gray-200' type='text' value={cell !== 0 ? cell : ''} onChange={(e)=>{
                  const val = parseInt(e.target.value)
                  setGrid(grid=>{
                    let newGrid = [...grid]
                    newGrid[i][j] = isNaN(val) ? 0 : val
                    return newGrid
                  })
                }} />
              ))
            )}
          </div>
        )}
    </div>
    {toast.msg.length > 0 && <Toast ok={toast.ok} msg={toast.msg} />}
    <Github url='https://github.com/bruzz-bruzz/sudoku-solver'/>
  </div>
)
}