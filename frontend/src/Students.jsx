import React, { useReducer } from 'react'
function Students() {
    function studentReducer(state, action) {
        console.log(state)
        switch (action.type) {
            case "ADD_STUDENT":
                return {
                    students: [...state.students, { id: state.students.length + 1, ...action.payload }]
                }
        }
    }
    const [state, dispatch] = useReducer(studentReducer, {
        students: [
            { id: 1, name: "a", email: "a@gmaol.com" },
            { id: 2, name: "b", email: "b@gmaol.com" },
        ]
    })
    return (
        <div>
            <button onClick={() => dispatch({
                type: "ADD_STUDENT"
                , payload: { name: "c", email: "c@gmail.com" }
            })}>Add Student</button>
            {
                state.students.map((student) => <div>
                    <h1>{student.name}</h1>
                </div>)
            }
        </div>
    )
}

export default Students
