import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component";
import AdminSidebar from "../components/AdminSidebar";
import { getAPI } from "../components/callAPI";
import { getToken} from "../components/session"
import Swal from "sweetalert2";
import '../config'
import "../css/admin.css"
import './../css/swal2theme.css'
import { Link } from "react-router-dom";

const AdminTag = () => {
    document.title = "Tags | Administration";
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const ip = global.config.ip.ip;

    const fetchData = async () => { //fetch Tags from DB
        try {
            const response = await getAPI('tags');
            setTags(response);
            setFilter(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => { //call fetch tags
        fetchData();
    }, []);

    useEffect(() => { //handle table search
        const result = tags.filter((item) => {
            return item.T_name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    }, [search]);

    const handleDeleteTagDialog = (T_ID) => { 
        Swal.fire({
            title: 'Are you sure to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteTag(T_ID);
            }
        })
    }

    const handleDeleteTag = async (T_ID) => {
        try {
            const delete_api = `${ip}/delete/tag?t=${T_ID}`;
            const token = getToken();

            const response = await fetch(delete_api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Delete completed!',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    fetchData();
                })
            } else {
                Swal.fire(
                    'Failed to delete tag!',
                    response.status +":"+ response.statusText,
                    'error'
                )
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddNewTagDialog = () => {
        Swal.fire({
            title: 'Add new tag',
            text: 'Add multiple tag use , to saperate each word',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add',
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddNewTag(result.value);
            }
        })
    }

    const handleAddNewTag = async (newTag) => {
        try {
            const tags = newTag.split(',').map(tag => tag.trim());
            const token = getToken();
            const insert_api = ip + '/insert/tag';

            const response = await fetch(insert_api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(tags)
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Add completed!',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    fetchData();
                })
            } else {
                Swal.fire(
                    'Failed to add new tag!',
                    response.status +":"+ response.statusText,
                    'error'
                )
            }
        } catch (e) {
            console.error(e);
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.T_ID,
            sortable: true
        },
        {
            name: 'Name',
            selector: row => row.T_name,
            sortable: true,
            cell: (row) => (
                <Link className="text-decoration-none text-white" to={"/tag?tag=" + row.T_name}>{row.T_name}</Link>
            )
        },
        {
            name: 'Action',
            cell: (row) => (
                // <button className="btn btn-danger" onClick={() => handleDeleteTagDialog(row.T_ID)}>Delete</button>
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdown-${row.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby={`dropdown-${row.id}`}>
                        <li>
                            <Link className="dropdown-item" to={"/tag?tag=" + row.T_name}>
                                <span><i className="bi bi-file-earmark-play"></i> View Videos</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" onClick={() => handleDeleteTagDialog(row.T_ID)}>
                                <span><i className="bi bi-trash3"></i> Delete</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    const tableHeaderStyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "16px"
            }
        },
        cells: {
            style: {
                fontSize: "16px",
            }
        },
        background: {
            default: "#222E3C"
        }
    }
    
    createTheme('solarized', {
        text: {
            primary: '#FFFFFF',
            secondary: '#BDC0C5',
        },
        background: {
            default: '#2C3034',
        },
        context: {
            background: '#222E3C',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
        },
    }, 'dark');

    return (
        <AdminSidebar>
            <div className="container-fluid content">
                <div className='PageTitle'>
                    <h2><i className="bi bi-tags-fill"></i> Tags</h2>
                </div>
                <div className='tags-table'>
                    <div className="card">
                        <div className="card-body">
                            <DataTable
                                customStyles={tableHeaderStyle}
                                columns={columns}
                                data={filter}
                                pagination
                                fixedHeader
                                highlightOnHover
                                theme="solarized"
                                actions={
                                    <button className="btn btn-secondary" onClick={() => handleAddNewTagDialog()}>Add Tag</button>
                                }
                                subHeader
                                subHeaderComponent={
                                    <input type="text"
                                        className="w-25 form-control"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                }
                            ></DataTable>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </AdminSidebar>
    )
}

export default AdminTag;