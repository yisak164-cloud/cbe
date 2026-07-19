import { useEffect, useState } from 'react'
import axios from "axios"
function User() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchUsers() {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            setUsers(response.data)
        }
        fetchUsers()
    }, [])

    const handleDelete = (id) => {
        setUsers((prevData) => prevData.filter(u => u.id != id))
    }
    return (
        <div>
            users
            <table border={1} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((u, index) => <tr key={u.id}>

                        <td>{index + 1}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                            <button onClick={() => handleDelete(u.id)}>Delete</button>
                            <button>Edit</button>
                        </td>
                    </tr>)}

                </tbody>
            </table>


        </div>
    )
}

export default User
