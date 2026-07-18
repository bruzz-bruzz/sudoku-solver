import './App.css'
type Data = {
    ok:boolean,
    msg:string
}
export default function Toast({ok,msg}:Data){
    return (
        <div className={`rounded-lg p-4 absolute right-5 bottom-5 font-mono ${ok === true ? 'bg-green-500' : 'bg-red-500'}`}>
            <p>{msg}</p>
        </div>
    )
}