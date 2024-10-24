import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setList } from './redux/Reducers/tasksSlice';
import axios from 'axios';

function App() {
  const list = useSelector((state) => state.tasks.filteredList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const url = process.env.REACT_APP_API;
      try {
        const response = await axios.get(`${url}/tasks`);
        dispatch(setList(response.data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  },[])

  console.log("App", list)
  return (
    <div className="App">
        <Header/>
    </div>
  );
}

export default App;
