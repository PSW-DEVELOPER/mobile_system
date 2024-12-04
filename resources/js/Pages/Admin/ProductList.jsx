import ProductTable from "@/Components/ProductTable";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Modal from "@/Components/Modal";
import { useState } from "react";
import AddProduct from "@/Components/AddProduct";
import Alert from "@/Components/Alert";
import AddCategory from "@/Components/AddCategory";
import { Head } from "@inertiajs/react";

const ProductList = ({products, categories}) => {

    const [openProductModal, setOpenProductModal] = useState(false);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);

    const handleProductModal = () => {
        setOpenProductModal(true);
    }

    const closeProductModal = () => {
        setOpenProductModal(false);
    }

    const handleCategoryModal = () => {
        setOpenCategoryModal(true);
    }

    const closeCategoryModal = () => {
        setOpenCategoryModal(false);
    }

    return (
        <>
            <AdminLayout>
                <Head title="Product List" />
                <Alert></Alert>
                <div className="p-4">
                    <div className="flex w-full items-center mb-5">
                        <Typography variant="h6">Product List</Typography>

                        <Button 
                            variant="contained" 
                            sx={{marginLeft: 'auto', p: 1, mr: 3}}
                            onClick={handleCategoryModal}    
                        >
                            <AddBoxIcon className="me-1"/>
                            Category
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{p: 1}}
                            onClick={handleProductModal}    
                        >
                            <AddBoxIcon className="me-1"/>
                            Product
                        </Button>
                    </div>
                    <ProductTable data={products} categories={categories}></ProductTable> 
                </div>

                {/* Add Product Modal Box */}
                <Modal header="New Product Form" show={openProductModal} onClose={closeProductModal}>
                    <AddProduct categories={categories} onClose={closeProductModal}></AddProduct>
                </Modal>
                
                {/* Add Category Modal Box */}
                <Modal header="New Category Form" show={openCategoryModal} onClose={closeCategoryModal}>
                    <AddCategory onClose={closeCategoryModal}></AddCategory>
                </Modal>

            </AdminLayout>
        </>
    )
}

export default ProductList;