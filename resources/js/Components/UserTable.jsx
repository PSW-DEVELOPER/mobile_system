import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

export default function UserTable({ data }) {
    const [users, setUsers] = useState(data);

    const roles = {
        0: "User",
        1: "Admin",
    };

    useEffect(() => {
        setUsers(data);
    }, [data]);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
        },
        {
            field: "email",
            headerName: "email",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => (
                <span style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: "role",
            headerName: "role",
            width: 130,
            renderCell: (params) => {
                const status = roles[params.row.role];
                return status == "Admin" ? (
                    <span className="capitalize text-green-500 font-bold">{status}</span>
                ) : (
                    <span className="capitalize text-blue-500 font-bold">{status}</span>
                );
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon color="primary"/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditModal(row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon color="error"/>}
                        label="Delete"
                        onClick={handleDelete(row.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    // Selected User

    const [selectedUser, setSelectedUser] = useState();

    // Edit User 
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleEditModal = (row) => () => {
        setSelectedUser(row);
        setOpenEditModal(true);
    }

    const closeEditModal = () => {
        setOpenEditModal(false);
    }

    // Delete User
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const handleDelete = (id) => () => {
        setDeleteUserId(id);
        setDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    return (
        <>
            <Box
                sx={{
                    height: "auto",
                    width: "100%",
                    "& .actions": {
                        color: "text.secondary",
                    },
                    "& .textPrimary": {
                        color: "text.primary",
                    },
                }}
            >
                <DataGrid
                    rows={users}
                    columns={columns}
                    editMode="row"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Box>
        
            {/* Edit Product Modal Box */}
            <Modal header="Edit User Form" show={openEditModal} onClose={closeEditModal}>
                <EditUser user={selectedUser} onClose={closeEditModal}></EditUser>
            </Modal>

            {/* Delete Product Modal Box */}
            <Modal header="Delete User" show={deleteModal} onClose={closeDeleteModal}>
                <DeleteUser user={deleteUserId} onClose={closeDeleteModal}></DeleteUser>
            </Modal>
        </>
    );
}
