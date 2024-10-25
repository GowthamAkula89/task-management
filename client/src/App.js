import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { setList, setFilteredList } from './redux/Reducers/tasksSlice';
import TaskList from './components/TaskList';
import { fetchTasks } from './apis/taskService';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchTasks()
        dispatch(setList(data));
        dispatch(setFilteredList(data))
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetch();
  },[dispatch])

  return (
    <div className="App">
        <Header/>
        <TaskList />
    </div>
  );
}

export default App;
