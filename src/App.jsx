import {useEffect, useState} from 'react'
import { COURSES } from './courses-data.js'
import './App.css'
import {List, ListItemText} from "@mui/material";

function App() {

  const [courses, setCourses] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [coursesLength, setCoursesLength] = useState(0);
  const [selectionLength, setSelectionLength] = useState(0);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let _courses = [];
    let _tags = [];

    COURSES.forEach(courseById => {
      courseById.courses.forEach(course => {
        _courses.push({
          id: courseById.id,
          ...course
        })
      })
    });
    // Sorting courses alphabetically
    _courses = _courses.sort((a, b) => a.title.localeCompare(b.title));

    // Extracting unique tags
    _courses.forEach(course => {
      course.tags.forEach(tag => {
        if (!_tags.includes(tag)) {
          _tags.push(tag);
        }
      })
    });

    console.log(_courses, _tags);

    setCourses(_courses);
    setCoursesLength(_courses.length);
    setFilteredSearch(_courses);
    setTags(_tags);
  }, []);

  useEffect(() => {
    setSelectionLength(filteredSearch.length);
  }, [filteredSearch]);

  function handleSearch(e) {
    setFilteredSearch(
      courses.filter(course => course.title.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  }

  function handleFilter(type) {
    setFilteredSearch(
      courses.filter(course => course.id.toLowerCase() == type.toLowerCase())
    );
  }

  function handleTagFilter(tag) {
    setFilteredSearch(
      courses.filter(
        course => course.tags.includes(tag)
      )
    );
  }

  function handleReload() {
    document.getElementById('searchTitle').value = '';
    setFilteredSearch(courses);
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
          <div id="tagFilterForm" style={{marginTop: '20px'}}>
            {tags.map((tag, index) => (
              <button key={index} onClick={() => handleTagFilter(tag)} className={tag}>{tag}</button>
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
