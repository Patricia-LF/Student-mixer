import { useState, useEffect, useMemo, useRef } from "react"

function useStudents() {
    
    // Our data
    const [students, setStudents] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [pairs, setPairs] = useState([])
    const isDarkMode = useRef(false)

function toggleDarkMode() {
  isDarkMode.current = !isDarkMode.current
  document.body.classList.toggle('dark', isDarkMode.current)
}

    const fetchData = () => {
    fetch('./src/data/students.json')
        .then ((response) => response.json())
        .then ((json) => {
        setStudents(json.students)
    })
    
        .catch(error => {
    console.error("Failure")
    setError("Could not load students data.")
    })
    .finally(() => setLoading(false))
    }
    
    useEffect(() => {
      setLoading(true)  
      fetchData()
    }, [])
      
    
    // The empty array at the end is called "dependency array". If empty, it will run after the initial commit. If you add any state variable or derived variable, the change of that will trigger the effect.
    
      // derived state = filter/calculate which of the students fit in either group.
    const present = useMemo(() => students?.filter(student => student.isPresent && !student.isMixed))
    const absent = useMemo(() => students?.filter(student => !student.isPresent))
      
      // A function to handle the toggle of present/absent (not present)
      function togglePresent(id) {
        console.log(id)
        const updatedStudents = students?.map((student) => {
          if (student.id === id) {
            // In the object below, first place the object, then the properties that you will change
            return { ...student, isPresent: !student.isPresent }
          }
          // If no id-match, just return the student to updatedStudents.
          return student
        })
        setStudents(updatedStudents);
      } 
    
     function mixStudents() {
      const shuffled = [...present].sort(() => Math.random() - 0.5)
      const newPairs = []
      if (shuffled.length % 2 !== 0) {
        // Ojämnt antal — sista tre blir en grupp om 3
        for (let i = 0; i < shuffled.length - 3; i += 2) {
          newPairs.push(shuffled.slice(i, i + 2))
        }
        newPairs.push(shuffled.slice(-3))
      } else {
        for (let i = 0; i < shuffled.length; i += 2) {
          newPairs.push(shuffled.slice(i, i + 2))
        }
      }
    
      setPairs(newPairs)
      setStudents(students?.map(student =>
        student.isPresent ? { ...student, isMixed: true } : student
      ))
    }
    
    function resetPresent() {
      setStudents(students?.map(student => ({ ...student, isPresent: true, isMixed: false })))
      setPairs([])
    }

    function addStudent(firstname, lastname) {

    }

    return {
        present, absent, pairs, loading, error, togglePresent, mixStudents, resetPresent, toggleDarkMode, addStudent 
    }
}

export {useStudents}