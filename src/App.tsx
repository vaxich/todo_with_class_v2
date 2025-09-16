
import './App.css';
import { Todolist } from './Todolist';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {

const todolistTitle1 : string =  'what to learn'
const todolistTitle2 : string = 'what to buy'

const tasks_1 : Array<TaskType> = [
  {id: crypto.randomUUID() , title: "HTML" , isDone: true,},
  {id: crypto.randomUUID()  , title: "REACT" , isDone: true,},
  {id: crypto.randomUUID()  ,  title: "JS" , isDone: false,},
]

const tasks_2 : Array<TaskType> = [
  {id: crypto.randomUUID() , title: "bread" , isDone: true,},
  {id: crypto.randomUUID()  , title: "tea" , isDone: false,},
  {id: crypto.randomUUID()  ,  title: "milk" , isDone: false,},
]

  return (
    <div className="App">
      <Todolist tasks={tasks_1} title = {todolistTitle1}/>
      <Todolist tasks={tasks_2}  title = {todolistTitle2}/>
    </div>
  );
}

export default App;
