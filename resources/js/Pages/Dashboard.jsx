import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardMedia,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardAction from "@/Components/CardAction";
import { Head, router } from "@inertiajs/react";

export default function Dashboard({ newProducts, products }) {
    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            <div className="py-2">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="px-10 py-20 bg-blue-900 text-gray-100">
                            <Grid container spacing={2}>
                                <Grid size={12} textAlign="center">
                                    <Typography
                                        variant="h3"
                                        fontWeight="bolder"
                                        mb={2}
                                    >
                                        PSW MOBILE SECOND
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bolder"
                                    >
                                        If you are looking for good mobile
                                        second shop, We are Here.
                                    </Typography>
                                </Grid>
                                <Grid size={12} mt={8}>
                                    <Swiper
                                        style={{ marginInline: "auto" }}
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
                                                slidesPerView: 4,
                                            },
                                            // When the window width is >= 1440px
                                            1440: {
                                                slidesPerView: 4,
                                            },
                                        }}
                                    >
                                        {products.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <Card
                                                    sx={{ maxWidth: 200 }}
                                                    className="border mx-auto border-gray-300"
                                                >
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            sx={{
                                                                p: 0.5,
                                                                height: {
                                                                    xs: 180,
                                                                    sm: 240,
                                                                    md: 250,
                                                                    lg: 200,
                                                                },
                                                                objectFit:
                                                                    "fill",
                                                            }}
                                                            image={`/storage/${product.photo}`}
                                                            alt="green iguana"
                                                        />
                                                    </CardActionArea>
                                                </Card>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>

                {/* New Product */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-5">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10">
                            {newProducts.map((item, index) => (
                                <Box key={index}>
                                    <Typography
                                        variant="h5"
                                        className="text-gray-700"
                                        mb={2}
                                        fontWeight="bold"
                                    >
                                        {item.name}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid
                                            className="order-last md:order-first"
                                            size={{ xs: 12, md: 7, lg: 6 }}
                                        >
                                            <Box>
                                                <Box mb={2}>
                                                    <Typography
                                                        variant="h6"
                                                        className="text-gray-700 uppercase"
                                                        mb={1}
                                                        fontWeight="bold"
                                                    >
                                                        Galaxy AI is here
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        className="text-gray-700"
                                                    >
                                                        Welcome to the era of
                                                        mobile AI. With Galaxy
                                                        S23 Ultra in your hands,
                                                        you can unleash whole
                                                        new levels of
                                                        creativity, productivity
                                                        and possibility
                                                        -starting with the most
                                                        important device in your
                                                        life. Your smartphone.
                                                    </Typography>
                                                </Box>
                                                <Box mb={5}>
                                                    <Typography
                                                        variant="h6"
                                                        display="inline-block"
                                                        className="text-gray-700 uppercase border-b-4 border-blue-500"
                                                        mb={2}
                                                        fontWeight="bold"
                                                    >
                                                        Performance
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        className="text-gray-700"
                                                        fontWeight="bold"
                                                        mb={1}
                                                    >
                                                        World's fastest
                                                        Snapdragon 8 Gen 2
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        className="text-gray-700"
                                                        fontWeight="bold"
                                                    >
                                                        Power for those who
                                                        don't pause
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        className="text-gray-700"
                                                    >
                                                        Maximize your free time
                                                        with the most powerful
                                                        chip on a Galaxy
                                                        smartphone. Improved
                                                        features across the
                                                        board means everything
                                                        from gaming to streaming
                                                        is optimized and
                                                        seamless - without
                                                        draining the battery.
                                                    </Typography>
                                                </Box>
                                                <Box className="text-center">
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            router.post(
                                                                route("buynow"),
                                                                {
                                                                    id: item.id,
                                                                    name: item.name,
                                                                    quantity: 1,
                                                                    price: item.price,
                                                                    photo: item.photo,
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        Buy Now
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 5, lg: 6 }}>
                                            <img
                                                src={`storage/${item.photo}`}
                                                alt=""
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Best Seller Product */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-5">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10">
                            <Grid container spacing={2}>
                                <Grid size={12} textAlign="center">
                                    <Typography
                                        variant="h4"
                                        fontWeight="bolder"
                                    >
                                        Best Seller Products
                                    </Typography>
                                </Grid>
                                <Grid size={12} mt={4}>
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
                                                slidesPerView: 4,
                                            },
                                            // When the window width is >= 1440px
                                            1440: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                    >
                                        {products.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="bg-white rounded-md p-1 w-full flex justify-center">
                                                    <CardAction
                                                        key={index}
                                                        product={product}
                                                    ></CardAction>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
