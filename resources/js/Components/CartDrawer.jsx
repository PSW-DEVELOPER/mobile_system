import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from '@mui/material/Divider';
import { useForm, usePage } from "@inertiajs/react";
import CloseIcon from '@mui/icons-material/Close';

export default function CartDrawer() {
    const { get, post } = useForm();

    const { cart } = usePage().props;

    const [localCart, setLocalCart] = React.useState(cart || []);

    React.useEffect(() => {
        setLocalCart(cart || []);
    }, [cart]);

    const [state, setState] = React.useState({
        right: false,
    });

    const subtotal = (localCart || []).reduce((total, cartItem) => total + cartItem.total, 0);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            right: -5,
            top: 2,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: "0 4px",
        },
    }));

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

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

    const handleCartItem = (cartId) => {
        get(route('product.detail', {id: cartId}));
    }

    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        aria-label="cart"
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <StyledBadge badgeContent={Array.isArray(localCart) ? localCart.length : 0} color="error">
                            <ShoppingCartIcon color="primary" />
                        </StyledBadge>
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Box
                            sx={{ width: 330 }}
                            role="presentation"
                            onClick={toggleDrawer(anchor, false)}
                            onKeyDown={toggleDrawer(anchor, false)}
                        >
                            <Typography variant="h6" fontWeight="bold" p={2}>Shopping Cart</Typography>
                            <Divider />
                            {Array.isArray(localCart) && localCart.length > 0 ? (
                                localCart.map((cartItem, index) => (
                                    <Box
                                        p={2}
                                        key={cartItem.id}
                                        className="flex justify-between items-center border-b border-gray-300 hover:bg-gray-100 py-4 relative cursor-pointer"
                                    >
                                        <Box 
                                            onClick={() => handleCartItem(cartItem.id)}
                                        >
                                            <Typography fontWeight="bold">
                                                {cartItem.name} 
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                {cartItem.quantity} x {cartItem.price.toLocaleString()} Ks
                                            </Typography>
                                        </Box>
                                        <Typography variant="subtitle2">{cartItem.total.toLocaleString()} Ks</Typography>
                                        <IconButton 
                                            sx={{position: "absolute", top: 2, right: 5}} 
                                            onClick={() => {
                                                handleRemoveItem(cartItem.id);
                                            }}
                                            aria-label="close" size="small">
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body1" p={2}>
                                    Your cart is empty.
                                </Typography>
                            )}
                            <Divider />

                            <Box p={2}>
                                <Box className="flex justify-between" mb={2}>
                                    <Typography variant="h6" fontWeight="bold">Subtotal : </Typography>
                                    <Typography variant="h6" fontWeight="bold">{subtotal.toLocaleString()} Ks</Typography>
                                </Box>

                                <Button 
                                    variant="contained" 
                                    sx={{p: 1, mb: 1}} 
                                    fullWidth 
                                    disabled={!Array.isArray(localCart) || localCart.length === 0} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        get(route('cart'))
                                    }}
                                    >
                                    View Cart
                                </Button>
                                <Button 
                                    variant="contained" 
                                    sx={{p: 1}} 
                                    fullWidth 
                                    disabled={!Array.isArray(localCart) || localCart.length === 0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        get(route('checkout'))
                                    }}
                                >
                                    Check Out
                                </Button>
                            </Box>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
