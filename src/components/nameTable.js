

function NameTable(props) {
    return (
        <div>
            {/* <ul className="list-group">
                {props.users.map((user) => (
                    <li className="list-group-item" key={user.U_id}>
                        {user.U_name} 
                        {user.U_mail}
                        </li>

                ))}
            </ul> */}
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Upload Permission</th>
                        <th scope="col">Video Wwn</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user) => (
                        <tr key={user.U_id}> 
                            <th>{user.U_id}</th>
                            <td>{user.U_name}</td>
                            <td>{user.U_mail}</td>
                            <td>{user.U_type}</td>
                            <td>{user.U_permit === 1 ? (<div>can</div>) : (<div>nope</div>)}</td>
                            <td>{user.U_vid}</td>
                            <td><button className="btn btn-secondary">edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NameTable;