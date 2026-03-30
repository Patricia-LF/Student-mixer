import './App.css'
import { useStudents } from './hooks/useStudents'
import { Person } from './Person'
import { StudentList } from './StudentList'
import { NotPresentList } from './NotPresentList'
import { MixedList } from './MixedList'

function App() {

  const { present, absent, pairs, loading, error, togglePresent, mixStudents, resetPresent } = useStudents()

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <div className='buttons'>
      <button onClick={mixStudents}>Mix!</button>
      <button onClick={resetPresent}>Reset</button>
      </div>
      <section className="layout">
        <StudentList>
          {
            present?.map(student => (
              <Person key={student.id} {...student} onClickHandler={() => togglePresent(student.id)} />
            ))
          }
        </StudentList>
        <NotPresentList>
                    {
            absent?.map(student => (
              <Person key={student.id} {...student} onClickHandler={() => togglePresent(student.id)} />
            ))
          }

        </NotPresentList>
        <MixedList /* bg="hotpink" */ pairs={pairs} />
      </section>
    </>
  )
}

export default App