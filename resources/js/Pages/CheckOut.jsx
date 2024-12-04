import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

const CheckOut = ({cart}) => {

    const user = usePage().props.auth.user;

    const subtotal = cart.reduce((total, cartItem) => (total + cartItem.total), 0);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        state: "1",
        townShip: "",
        streetAddress: "",
        additionalInformation: "",
    });

    const townshipForYangon = [
        { value: "yankin", townShip: "Yankin" },
        { value: "bahan", townShip: "Bahan" },
        { value: "kamayut", townShip: "Kamayut" },
        { value: "hlaing", townShip: "Hlaing" },
        { value: "innsein", townShip: "Inn Sein" },
    ];

    const townshipForMandalay = [
        { value: "chanayetharsan", townShip: "Chan Aye Tharsan" },
        { value: "chanmyatharsi", townShip: "Chan Mya Tharsi" },
    ];

    const handleRequestOrder = (e) => {
        e.preventDefault();
        const productIds = cart.map((cartItem) => cartItem.id);

        router.post(route('request.order'), 
            {
                data: {
                    id: user.id,
                    product_ids: productIds,
                    product_details: cart,
                    total: subtotal,
                }
            },
            {
                onSuccess: () => {
                    router.visit(route('order.confirmation')); // Redirect to OrderConfirmation page
                },
            }
        );
    }

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Check Out" />
                <div className="py-2">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-10 text-gray-900">
                            <Grid container spacing={5} mt={3} p={3} className="bg-white">
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography variant="h6" fontWeight="bold" mb={3}>BILLING & SHIPPING</Typography>
                                    <Box mb={2}>
                                        <InputLabel htmlFor="name" className="mb-1">
                                            <Typography variant="subtitle1">
                                                Name
                                            </Typography>
                                        </InputLabel>
                                        <TextInput
                                            id="name"
                                            className="p-3 w-full"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        ></TextInput>
                                    </Box>
                                    <Box mb={2}>
                                        <InputLabel htmlFor="email" className="mb-1">
                                            <Typography variant="subtitle1">
                                                Email
                                            </Typography>
                                        </InputLabel>
                                        <TextInput
                                            id="email"
                                            className="p-3 w-full"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        ></TextInput>
                                    </Box>
                                    <Box mb={2}>
                                        <InputLabel htmlFor="phone" className="mb-1">
                                            <Typography variant="subtitle1">
                                                Phone
                                            </Typography>
                                        </InputLabel>
                                        <TextInput
                                            id="phone"
                                            className="p-3 w-full"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        ></TextInput>
                                    </Box>
                                    <Box mb={2}>
                                        <InputLabel htmlFor="state" className="mb-1">
                                            <Typography variant="subtitle1">
                                                State
                                            </Typography>
                                        </InputLabel>
                                        <select
                                            name="state"
                                            className="rounded-md capitalize border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 block w-full"
                                            id="state"
                                            value={data.state}
                                            onChange={(e) =>
                                                setData("state", e.target.value)
                                            }
                                        >
                                            <option value="1">Yangon</option>
                                            <option value="2">Mandalay</option>
                                            <option value="3">Other State</option>
                                        </select>
                                    </Box>
                                    <Box mb={2}>
                                        <InputLabel htmlFor="townShip" className="mb-1">
                                            <Typography variant="subtitle1">
                                                Township
                                            </Typography>
                                        </InputLabel>
                                        {data.state == 3 ? (
                                            <textarea
                                                id="townShip"
                                                name="townShip"
                                                autoComplete="townShip"
                                                value={data.townShip}
                                                placeholder="Complete Full Address"
                                                className="resize-y block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                onChange={(e) =>
                                                    setData("townShip", e.target.value)
                                                }
                                            ></textarea>
                                        ) : (
                                            <select
                                                name="townShip"
                                                className="rounded-md capitalize border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 block w-full"
                                                id="state"
                                                value={data.townShip}
                                                onChange={(e) =>
                                                    setData("townShip", e.target.value)
                                                }
                                            >
                                                {data.state == 1 &&
                                                    townshipForYangon.map(
                                                        (township, index) => (
                                                            <option
                                                                key={index}
                                                                value={township.value}
                                                            >
                                                                {township.townShip}
                                                            </option>
                                                        )
                                                    )}

                                                {data.state == 2 &&
                                                    townshipForMandalay.map(
                                                        (township, index) => (
                                                            <option
                                                                key={index}
                                                                value={township.value}
                                                            >
                                                                {township.townShip}
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        )}
                                    </Box>
                                    <Box>
                                        <InputLabel htmlFor="streetAddress" className="mb-1">
                                            <Typography variant="subtitle1">
                                                Street Address
                                            </Typography>
                                        </InputLabel>
                                        <textarea
                                            id="street"
                                            name="street"
                                            autoComplete="street"
                                            value={data.streetAddress}
                                            className="resize-y block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            onChange={(e) =>
                                                setData("streetAddress", e.target.value)
                                            }
                                        ></textarea>
                                    </Box>

                                    <Box mt={5}>
                                        <Typography variant="h6" fontWeight="bold" mb={2}>ADDITIONAL INFORMATION</Typography>
                                        <textarea
                                            rows={5}
                                            id="street"
                                            name="street"
                                            autoComplete="street"
                                            value={data.streetAddress}
                                            className="resize-y block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            onChange={(e) =>
                                                setData("streetAddress", e.target.value)
                                            }
                                        ></textarea>
                                    </Box>
                                </Grid>

                                <Grid size={{xs: 12, md: 6}}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" textAlign="center" mb={3}>YOUR ORDER</Typography>
                                        <Box className="bg-gray-100 rounded-md p-5">
                                            <Box className="flex justify-between border-b border-gray-300 pb-3">
                                                <Typography variant="subtitle1" fontWeight="bold">PRODUCT</Typography>
                                                <Typography variant="subtitle1" fontWeight="bold">SUBTOTAL</Typography>
                                            </Box>
                                            {
                                                cart.map((cartItem, index) => (
                                                    <Box key={index} className="flex justify-between items-center border-b border-gray-300 py-4">
                                                        <Box>
                                                            <Typography>{cartItem.name}</Typography>
                                                            <Typography>{cartItem.quantity} x {cartItem.price}</Typography>
                                                        </Box>
                                                        <Typography my={2}>{cartItem.price * cartItem.quantity} Ks</Typography>
                                                    </Box>
                                                ))
                                            }
                                            <Box className="flex justify-between items-center border-b border-gray-300 py-4">
                                                <Typography fontWeight="bold">Subtotal</Typography>
                                                <Typography>{subtotal} Ks</Typography>
                                            </Box>
                                            <Box className="flex justify-between items-center border-b border-gray-300 py-4">
                                                <Typography fontWeight="bold">Shipping</Typography>
                                                <Typography>Free Delivery</Typography>
                                            </Box>
                                            <Box className="flex justify-between items-center py-4">
                                                <Typography fontWeight="bold">Total</Typography>
                                                <Typography variant="h6" fontWeight="bold">{subtotal} Ks</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box mt={3} className="border-b border-gray-300 pb-5">
                                        <Typography variant="subtitle1" fontWeight="bold">Payment Method</Typography>
                                        <select
                                            id="payment"
                                            name="payment"
                                            className="rounded-md font-bold mt-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 block w-[50%]"
                                            value={data.payment}
                                        >
                                            <option>KBZ PAY</option>
                                            <option>WAVE PAY</option>
                                        </select>
                                    </Box>

                                    {
                                        !user && (
                                            <Box className="flex items-center mt-5">
                                                <Typography color="error" fontWeight="bold" mr={3}>You need to login to place order.</Typography>
                                                <Button variant="outlined" onClick={() => (router.get(route('login')))}>Log in</Button>
                                            </Box>
                                        )
                                    }

                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{mt: 3, p: 1.5}}
                                        onClick={handleRequestOrder}
                                        disabled={!user}
                                    >
                                        { processing ? "Processing..." : "Place Order"}
                                    </Button>
                                </Grid>
                            </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default CheckOut;
