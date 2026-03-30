export function MixedList({ pairs = [] }) {
  return (
    <div className="mixedList">
      <h1>Mixed</h1>
      <div className="mixed-list">
        {pairs.map((pair, index) => (
          <div key={index} className="pair">
            {pair.map(student => (
              <span key={student.id} className="person">{student.firstname} {student.lastname}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}