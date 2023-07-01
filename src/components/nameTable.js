import { useState } from "react";
import ReactModal from "react-modal";
import UserEditModal from "./userEditModal";


const NameTable = (props) => {
    const [isOpen, setIsOpen ] = useState(false);
    const [ selectedUser, setSelectedUser ] = useState(null);

    ReactModal.setAppElement('#root');


    const openModal = (user) => {
        setSelectedUser({
            'U_id': user.U_id,
            'U_name': user.U_name,
            'U_mail': user.U_mail,
            'U_permit': user.U_permit,
            'U_type': user.U_type,
        })
        setIsOpen(true)
      }
  
      const closeModal = () => {
        setIsOpen(false)
      }
      
      const update = () => {
        window.location.reload();
      }
  
  
      const modalStyle = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: 'max-content',
          backgroundColor: 'rgb(44, 48, 56)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      };


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
                        <th scope="col">Video Owned</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user) => (
                        <tr key={user.U_id}> 
                            <th>{user.U_id}</th>
                            <td><a href={'/profile?profile='+user.U_id} style={{color: 'white'}}>{user.U_name}</a></td>
                            <td>{user.U_mail}</td>
                            <td>{user.U_type === 'admin' ?
                                    (<div className="center" style={{backgroundColor: 'rgb(50, 128, 128)',borderRadius: '25px', marginRight: '5px', marginLeft: '5px'}}>Admin</div>)
                                    :
                                    (<div className="center" style={{borderRadius: '25px', marginRight: '5px', marginLeft: '5px'}}>User</div>)
                                }
                            </td>
                            <td>
                                {user.U_permit === 1 ? 
                                    (<div className="center" style={{backgroundColor: 'rgb(52, 128, 50)',borderRadius: '25px', marginRight: '5px', marginLeft: '5px'}}>Have Permission</div>) 
                                    : 
                                    (<div className="center" style={{backgroundColor: 'rgb(128, 50, 50)',borderRadius: '25px', marginRight: '5px', marginLeft: '5px'}}>No Permission</div>)
                                }
                            </td>
                            <td>{user.U_vid}</td>
                            <td><button className="btn btn-secondary" onClick={() => openModal(user)}>edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
                <UserEditModal data={selectedUser} closeModal={closeModal} update={update} />
            </ReactModal>
        </div>
    );
}

export default NameTable;