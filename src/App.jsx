import {useEffect, useState} from 'react'
import { COURSES } from './courses-data.js'
import './App.css'
import {List, ListItemText} from "@mui/material";

function App() {

  const [courses, setCourses] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [coursesLength, setCoursesLength] = useState(0);
  const [selectionLength, setSelectionLength] = useState(0);

  useEffect(() => {
    let _courses = [];

    COURSES.forEach(courseById => {
      courseById.courses.forEach(course => {
        _courses.push({
          id: courseById.id,
          title: course
        })
      })
    });
    // Sorting courses alphabetically
    _courses = _courses.sort((a, b) => a.title.localeCompare(b.title));
    console.log(_courses);

    setCourses(_courses);
    setCoursesLength(_courses.length);
    setSelectionLength(_courses.length);
    setFilteredSearch(_courses);
  }, []);

  function handleSearch(e) {
    setFilteredSearch(
      courses.filter(course => course.title.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setSelectionLength(filteredSearch.length);
  }

  function handleFilter(e) {
    setFilteredSearch(
      courses.filter(course => course.id.toLowerCase() == e.toLowerCase())
    );
    setSelectionLength(filteredSearch.length);
  }

  function handleReload() {
    setFilteredSearch(courses);
    setSelectionLength(courses.length);
  }

  return (
    <>
      <header>
        <h1>Available Courses</h1>
      </header>
      <main>
        <section>
          <h1>{selectionLength} / {coursesLength}</h1>
          <div id="searchForm">
            <input id="searchTitle" name="searchTitle" placeholder='Suchen' onChange={handleSearch}/>
            <button id="searchReset" onClick={handleReload}>⟳</button>
          </div>
          <div id="filterForm" style={{marginTop: '20px'}}>
            {COURSES.map((course, index) => (
              <button key={index} onClick={() => handleFilter(course.id)} className={course.id}>{course.id}</button>
            ))}
          </div>
        </section>
        <section>
          <List>
            {filteredSearch.map((course, index) => (
              <ListItemText
                className={course.id}
                key={index}
                primary={course.title}
                secondary={course.id}
              />
            ))}
          </List>
        </section>
      </main>

    </>
  )
}

export default App
