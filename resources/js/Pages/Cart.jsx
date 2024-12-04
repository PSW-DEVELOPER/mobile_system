import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Add, Co2Sharp, Remove } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Alert from "@/Components/Alert";

const Cart = ({ cart, products }) => {
    const user = usePage().props;
    const { post, get } = useForm();
    const [localCart, setLocalCart] = useState(cart);

    useEffect(() => {
        setLocalCart(cart);
    }, [cart]);
    
    const subtotal = localCart.reduce((total, cartItem) => total + cartItem.total, 0);

    const handleRemoveItem = (itemId) => {
        post(route('remove.cartItem', { id: itemId }), {
            onSuccess: () => {
                // Filter out the removed item from the localCart state
                setLocalCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
            },
            onError: (error) => {
                console.error("Error removing cart item:", error);
            },
        });
    };

    // Handle quantity change
    const handleQuantityChange = (itemId, action) => {
        setLocalCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === itemId) {
                    const updatedQuantity =
                        action === "increase"
                            ? item.quantity + 1
                            : item.quantity > 1
                            ? item.quantity - 1
                            : item.quantity;

                    const updatedTotal = updatedQuantity * item.price;

                    return {
                        ...item,
                        quantity: updatedQuantity,
                        total: updatedTotal,
                    };
                }
                return item;
            })
        );
    };

    // Handle update cart
    const handleUpdateCart = (e) => {
        e.preventDefault();
    
        const updatedCartData = localCart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            total: item.total,
        }));
    
        router.post(
            route("update.cartItem"),
            updatedCartData,
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Cart" />
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10 text-gray-900">
                            <Alert></Alert>
                            <Button 
                                variant="contained" 
                                sx={{mb: 3}}
                                onClick={() => (get(route('home')))}
                            >Continues Shopping</Button>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 12, lg: 8 }}>
                                    <TableContainer component={Paper}>
                                        <Table
                                            sx={{ minWidth: 650 }}
                                            aria-label="simple table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell align="left">
                                                        PRODUCT
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        PRICE
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        QUANTITY
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        SUBTOTAL
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {localCart.map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{
                                                            "&:last-child td, &:last-child th":
                                                                { border: 0 },
                                                        }}
                                                    >
                                                        <TableCell>
                                                            <IconButton 
                                                                onClick={() => { handleRemoveItem(row.id) }}
                                                                aria-label="close" size="small">
                                                                <CloseIcon fontSize="inherit" />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            <img
                                                                src={`/storage/${row.photo}`}
                                                                className="w-[70px]"
                                                                alt={row.name}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {row.name}
                                                            <Typography variant="caption" fontWeight="bold" display="block">
                                                                In stock {(products.find((item) => item.id === row.id)?.stock || 0)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.price.toLocaleString()} Ks
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <IconButton
                                                                    onClick={() => handleQuantityChange(row.id, "decrease")}
                                                                >
                                                                    <Remove
                                                                        sx={{
                                                                            fontSize:
                                                                                "16px",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                                <input
                                                                    type="text"
                                                                    name="updateQuantity"
                                                                    className="w-[35px] border-none text-sm text-center"
                                                                    value={row.quantity}
                                                                    onChange={() => {}}
                                                                />
                                                                <IconButton
                                                                    disabled={row.quantity >= (products.find((item) => item.id === row.id).stock)}
                                                                    onClick={() => handleQuantityChange(row.id, "increase")}
                                                                >
                                                                    <Add
                                                                        sx={{
                                                                            fontSize:
                                                                                "16px",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.total.toLocaleString()} Ks
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Button 
                                        onClick={handleUpdateCart}
                                        disabled={cart.length < 1}
                                        variant="contained" sx={{mt: 2}}>Update Cart</Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                                    <Box className="border border-2 p-6">
                                        <Typography variant="h5" fontWeight="bold" className="text-gray-600 uppercase">Cart Total</Typography>
                                        <Box className="flex justify-between my-5">
                                            <Typography variant="subtitle1" fontWeight="bold">Subtotal</Typography>
                                            <Typography variant="subtitle1" fontWeight="bold">{subtotal.toLocaleString()} Ks</Typography>
                                        </Box>
                                        <Divider />
                                        <Box className="flex justify-between my-5">
                                            <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
                                            <Typography variant="h6" fontWeight="bold">{subtotal.toLocaleString()} Ks</Typography>
                                        </Box>
                                        <Button 
                                            variant="contained" 
                                            fullWidth 
                                            sx={{p: 1.3}}
                                            disabled={cart.length < 1}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                get(route('checkout'));
                                            }}
                                        >
                                            Proceed To CheckOut
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Cart;