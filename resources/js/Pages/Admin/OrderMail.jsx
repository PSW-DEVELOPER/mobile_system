import OrderTable from "@/Components/OrderRequestTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Alert, Typography } from "@mui/material";

const OrderMail = ({orders}) => {
    return (
        <>
            <AdminLayout>
                <Head title="Order Mail" />
                <div className="p-4">
                    <div className="flex w-full items-center mb-5">
                        <Typography variant="h6">Order List</Typography>
                    </div>
                    <OrderTable data={orders}></OrderTable> 
                </div>
            </AdminLayout>
        </>
    )
}

export default OrderMail;