import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Box, Button, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardAction from "@/Components/CardAction";
import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Head, router, useForm, usePage } from "@inertiajs/react";

const Detail = ({ product, relatedProduct }) => {

    const { data, setData, get, post } = useForm({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        photo: product.photo,
    });

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setData({
            id: product.id,
            name: product.name,
            quantity,
            price: product.price,
            photo: product.photo,
        });
    }, [quantity]);

    const handleIncrease = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = (e) => {
        e.preventDefault();
        post(route('addToCart'), {
            data,
            preserveScroll: true,
        })
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        post(route('buynow'), {
            data,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Product Detail" />
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10 text-gray-900">
                            <Typography variant="h4" fontWeight="bold">
                                {product.name}
                            </Typography>
                            <Grid spacing={2} container my={5}>
                                <Grid
                                    size={{ xs: 12, sm: 5 }}
                                    className="overflow-hidden"
                                >
                                    <img
                                        src={`/storage/${product.photo}`}
                                        alt={product.name}
                                    />
                                </Grid>
                                <Grid size={1}></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        mb={1}
                                    >
                                        Description
                                    </Typography>
                                    <Typography>
                                        {product.description}
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Vero ea tenetur
                                        ducimus, voluptates voluptatum
                                        consequuntur dolorum esse temporibus
                                        veniam error in quod magnam doloremque
                                        harum? Voluptatem assumenda aliquid
                                        harum perferendis.
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        mt={2}
                                        color="primary"
                                    >
                                        {product.price.toLocaleString()} Ks
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        mt={2}
                                        color="primary"
                                    >
                                        <span className="text-gray-900">
                                            Stock :
                                        </span>
                                        {product.stock < 1 ? 
                                            <span className="text-red-500 ms-3">Out of Stock</span> : 
                                            <span className="ms-3">{product.stock}</span> 
                                        }
                                    </Typography>
                                    <Box
                                        alignItems="center"
                                        mt={2}
                                        className={product.stock < 1 ? 'hidden' : 'flex'}
                                    >
                                        <Typography variant="h6" mr={2}>
                                            Quantity :
                                        </Typography>
                                        <IconButton
                                            onClick={handleDecrease}
                                            disabled={quantity === 1}
                                        >
                                            <Remove />
                                        </IconButton>
                                        <Typography variant="h6" mx={1}>
                                            {quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={handleIncrease}
                                            disabled={
                                                quantity === product.stock
                                            }
                                        >
                                            <Add />
                                        </IconButton>
                                    </Box>
                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            sx={{ mr: 2 }}
                                            onClick={addToCart}
                                            disabled={product.stock < 1}
                                        >
                                            Add to cart
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleBuyNow}
                                            disabled={product.stock < 1}
                                        >
                                            Buy Now
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>

                            <div className="border-t border-gray-300 py-10">
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    mb={3}
                                >
                                    Specifications
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Brand : Samsung
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Processor : Snapdragon 8 Gen 1
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Category : {product.category_id}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Ram : 8 GB
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Storage : 256 GB
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-5">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10">
                            <Grid container spacing={2}>
                                <Typography variant="h5" fontWeight="bolder">
                                    Related Products
                                </Typography>
                                <Grid size={12} mt={2}>
                                    <Swiper
                                        modules={[Autoplay]}
                                        spaceBetween={5}
                                        autoplay
                                        breakpoints={{
                                            // When the window width is >= 320px
                                            320: {
                                                slidesPerView: 2,
                                            },
                                            // When the window width is >= 640px
                                            640: {
                                                slidesPerView: 3,
                                            },
                                            // When the window width is >= 1024px
                                            1024: {
                                                slidesPerView: 5,
                                            },
                                            // When the window width is >= 1440px
                                            1440: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                    >
                                        {relatedProduct.map(
                                            (product, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="bg-white rounded-md p-1 w-full flex justify-center">
                                                        <CardAction
                                                            key={index}
                                                            product={product}
                                                        ></CardAction>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        )}
                                    </Swiper>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Detail;
