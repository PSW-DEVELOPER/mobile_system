import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Typography, Box, Button } from "@mui/material";
import { Head, router, usePage } from "@inertiajs/react";

const OrderConfirmation = ({ order }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Order Confirmation" />
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10 text-gray-900">
                            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                                Order Confirmation
                            </Typography>
                            <Box className="bg-gray-100 rounded-md p-5">
                                <Typography variant="h6" fontWeight="bold" mb={2}>
                                    Order #{order.id}
                                </Typography>
                                <Typography variant="subtitle1" mb={2}>
                                    Thank you for your order! We have received your purchase and are processing it.
                                </Typography>
                                <Box className="border-b border-gray-300 pb-3 mb-3">
                                    <Typography fontWeight="bold">Order Summary:</Typography>
                                    {order.order_items.map((item, index) => (
                                        <Box key={index} className="flex justify-between py-2">
                                            <Typography>
                                                {item.product.name} ({item.quantity} x {item.price} Ks)
                                            </Typography>
                                            <Typography>
                                                {item.quantity * item.price} Ks
                                            </Typography>
                                        </Box>
                                    ))}
                                    <Box className="flex justify-between mt-3">
                                        <Typography fontWeight="bold">Total:</Typography>
                                        <Typography fontWeight="bold">{order.total} Ks</Typography>
                                    </Box>
                                </Box>
                                <Typography>
                                    Your order will be shipped to the address provided. If you have any questions,
                                    please contact our support team.
                                </Typography>
                                <Box className="flex justify-center mt-5">   
                                    <Button 
                                        variant="contained"
                                        onClick={() => {
                                            router.get(route('home'))
                                        }}
                                    >Continues Shopping</Button>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderConfirmation;