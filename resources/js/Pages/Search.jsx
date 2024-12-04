import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Grid from "@mui/material/Grid2";
import CardAction from "@/Components/CardAction";
import Pagination from "@mui/material/Pagination";
import { Box, Typography } from "@mui/material";
import { Head } from "@inertiajs/react";

const Search = ({ products }) => {
    const handlePageChange = (event, page) => {
        const url = new URL(products.path);
        url.searchParams.set("page", page); // Update the "page" query parameter
        window.location.href = url.toString(); // Navigate to the new page
    };

    return (
        <AuthenticatedLayout>
            <Head title="Search" />
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10 text-gray-900">
                            <Typography
                                variant="h5"
                                textAlign="center"
                                fontWeight="bold"
                                mb={5}
                            >
                                Search
                            </Typography>
                            <Grid container spacing={2.5}>
                                {products.data.length > 0 ? (
                                    products.data.map((phone, index) => (
                                        <Grid
                                            key={index}
                                            size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                                        >
                                            <CardAction
                                                key={index}
                                                product={phone}
                                            ></CardAction>
                                        </Grid>
                                    ))
                                ) : <Box className="mx-auto uppercase text-gray-600"><Typography variant="h6" fontWeight="bold">No Product Found</Typography></Box>}
                            </Grid>
                            {products.data.length > 0 && <Pagination
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: 4,
                                }}
                                count={products.last_page}
                                page={products.current_page}
                                onChange={handlePageChange}
                            ></Pagination>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Search;
