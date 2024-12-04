import AdminLayout from "@/Layouts/AdminLayout";
import { Box, Button, Divider, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Head, router } from "@inertiajs/react";

const OrderDetail = ({ order, orderDetails }) => {
    return (
        <AdminLayout>
            <Head title="Order Request Detail" />
            <div className="p-4">
                <div className="w-full mb-5">
                    <Typography variant="h6" mb={3}>
                        Order Detail
                    </Typography>

                    <Box className="border border-gray-200 p-10 rounded-md">
                        <Box pb={3}>
                            <Typography variant="h6" fontWeight="bold">
                                Order ID:{" "}
                                <span className="text-blue-600">
                                    {order.id}
                                </span>
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                Customer Name:{" "}
                                <span className="text-blue-600">
                                    {order.user?.name}
                                </span>
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                Status:{" "}
                                {
                                    order.status == 0 && (
                                        <span className="text-red-600">Request</span>
                                    )
                                }
                                {
                                    order.status == 1 && (
                                        <span className="text-red-600">Cancel</span>
                                    ) 
                                }
                                {
                                    order.status == 2 && (
                                        <span className="text-green-600">Done</span>
                                    ) 
                                }
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                Total Price:{" "}
                                <span className="text-blue-600">
                                    {order.total} Ks
                                </span>
                            </Typography>
                        </Box>

                        <Divider />

                        <Box className="flex justify-end mt-8 gap-3">
                            <Button variant="contained" 
                                onClick={() => {
                                    router.post(route('order.status', {id: order.id}), {
                                        status: 1,
                                    })
                                }}  
                                color="error">Order Cancel</Button>
                            <Button variant="contained" 
                                onClick={() => {
                                    router.post(route('order.status', {id: order.id}), {
                                        status: 2,
                                    })
                                }}
                                color="primary">Order Confirm</Button>
                        </Box>

                        <TableContainer component={Paper} sx={{mt: 5}}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">
                                            PRODUCT
                                        </TableCell>
                                        <TableCell align="left">
                                            QUANTITY
                                        </TableCell>
                                        <TableCell align="right">
                                            PRICE
                                        </TableCell>
                                        <TableCell align="right">
                                            SUBTOTAL
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetails.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell align="left">
                                                {row.product.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.quantity}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.product.price} Ks
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.product.price * row.quantity} Ks
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>

            {/* <div>
                <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                <div className="mb-6">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Customer Name:</strong> {order.user?.name || "Unknown"}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Price:</strong> {order.total} Ks</p>
                </div>

                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Product</th>
                            <th className="border border-gray-300 p-2">Quantity</th>
                            <th className="border border-gray-300 p-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((detail) => (
                            <tr key={detail.id}>
                                <td className="border border-gray-300 p-2">{detail.product.name}</td>
                                <td className="border border-gray-300 p-2">{detail.quantity}</td>
                                <td className="border border-gray-300 p-2">{detail.price} Ks</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </AdminLayout>
    );
};

export default OrderDetail;
