import AdminLayout from "@/Layouts/AdminLayout";
import { Typography } from "@mui/material";
import Modal from "@/Components/Modal";
import Alert from "@/Components/Alert";
import UserTable from "@/Components/UserTable";
import { Head } from "@inertiajs/react";

const UserList = ({users}) => {
    return (
        <>
            <AdminLayout>
                <Head title="User List" />
                <Alert></Alert>
                <div className="p-4">
                    <div className="flex w-full items-center mb-5">
                        <Typography variant="h6">User List</Typography>
                    </div>

                    <UserTable data={users}></UserTable>
                    {/* <ProductTable data={products} categories={categories}></ProductTable>  */}
                </div>
            </AdminLayout>
        </>
    )
}

export default UserList;