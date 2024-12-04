import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { router } from "@inertiajs/react";
import { Button } from "@mui/material";

export default function OrderTable({ data }) {
    const [orders, setOrders] = useState(data);

    const statusMap = {
        0: "Request",
        1: "Cancel",
        2: "Done",
    };

    useEffect(() => {
        setOrders(data);
    }, [data]);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
            renderCell: (params) => params.row.user?.name || "Unknown",
        },
        {
            field: "total",
            headerName: "Total Price",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                const total = params.row.total || 0;
                return `${total.toLocaleString()} Ks`;
            },
        },
        {
            field: "created_at",
            headerName: "Order Date",
            minWidth: 230,
            flex: 1,
            renderCell: (params) => {
                // Format date
                const rawDate = params.row.created_at;
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(new Date(rawDate));
        
                return formattedDate || "Unknown";
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: (params) => {
                const status = statusMap[params.row.status];
                return status == "Done" ? (
                    <span className="capitalize text-green-500 font-bold">{status}</span>
                ) : (
                    <span className="capitalize text-red-500 font-bold">{status}</span>
                );
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 190,
            cellClassName: "actions",
            getActions: ({ row }) => {
                return [
                    <Button variant="contained" color="error" 
                        onClick={() => {
                            router.post(route('order.status', {id: row.id}), {
                                status: 1,
                            })
                        }}
                        size="small">
                        Cancel
                    </Button>,
                    <Button 
                        onClick={() => {
                            router.post(route('order.status', {id: row.id}), {
                                status: 2,
                            })
                        }}
                        variant="contained" size="small">
                        Confirm
                    </Button>
                ];
            },
        },
    ];

    // Selected Product

    const [selectedOrder, setSelectedOrder] = useState();

    // Delete Product
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteOrder, setDeleteOrder] = useState(null);

    const handleDelete = (id) => () => {
        setDeleteOrder(id);
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
                    rows={orders}
                    columns={columns}
                    onRowClick={(params) => {
                        router.get(
                            route('order.detail', {id: params.row.id})
                        )
                    }}
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
            {/* <Modal header="Edit Product Form" show={openEditModal} onClose={closeEditModal}>
                <EditProduct product={selectedProduct} categories={categories} onClose={closeEditModal}></EditProduct>
            </Modal> */}

            {/* Delete Product Modal Box */}
            <Modal header="Delete Product" show={deleteModal} onClose={closeDeleteModal}>
                <DeleteProduct product={deleteOrder} onClose={closeDeleteModal}></DeleteProduct>
            </Modal>
        </>
    );
}
