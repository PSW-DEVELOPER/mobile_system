import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

export default function ProductTable({ data, categories }) {
    const [prodcuts, setProducts] = useState(data);

    // Convert categories array to a dictionary for quick lookup by category_id
    const categoryMap = categories.reduce((acc, category) => {
        acc[category.id] = category.name; // Assuming category has 'id' and 'name'
        return acc;
    }, {});

    const statusMap = {
        0: "Unpublish",
        1: "Publish",
    };

    useEffect(() => {
        setProducts(data);
    }, [data]);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => (
                <span style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: "category_id",
            headerName: "Category",
            width: 130,
            renderCell: (params) => {
                const category = categoryMap[params.row.category_id];
                return category ? (
                    <span className="capitalize">{category}</span>
                ) : (
                    <span style={{ color: "red" }}>Unknown</span>
                );
            },
        },
        {
            field: "price",
            headerName: "Price",
            width: 130,
            renderCell: (params) => {
                const price = params.row.price || 0;
                return `${price.toLocaleString()} Ks`;
            },
        },
        {
            field: "stock",
            headerName: "Stock",
            width: 130,
        },
        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: (params) => {
                const status = statusMap[params.row.status];
                return status == "Publish" ? (
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

    // Selected Product

    const [selectedProduct, setSelectedProduct] = useState();

    // Edit Product 
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleEditModal = (row) => () => {
        setSelectedProduct(row);
        setOpenEditModal(true);
    }

    const closeEditModal = () => {
        setOpenEditModal(false);
    }

    // Delete Product
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

    const handleDelete = (id) => () => {
        setDeleteProductId(id);
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
                    rows={prodcuts}
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
            <Modal header="Edit Product Form" show={openEditModal} onClose={closeEditModal}>
                <EditProduct product={selectedProduct} categories={categories} onClose={closeEditModal}></EditProduct>
            </Modal>

            {/* Delete Product Modal Box */}
            <Modal header="Delete Product" show={deleteModal} onClose={closeDeleteModal}>
                <DeleteProduct product={deleteProductId} onClose={closeDeleteModal}></DeleteProduct>
            </Modal>
        </>
    );
}
