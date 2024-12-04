import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Grid from '@mui/material/Grid2';
import CardAction from '@/Components/CardAction';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import { Head } from '@inertiajs/react';

const Phone = ({phones}) => {
    const handlePageChange = (event,page) => {
        const url = new URL(phones.path);
        url.searchParams.set("page", page) // Update the "page" query parameter
        window.location.href = url.toString(); // Navigate to the new page
    } 

    return (
        <AuthenticatedLayout>
            <Head title="Smart Phone" />
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10 text-gray-900">
                            <Typography variant="h5" textAlign="center" fontWeight="bold" mb={5}>Mobile Phone List</Typography>
                            <Grid container spacing={2.5}>
                                {phones.data.map((phone, index) => (
                                    <Grid 
                                        key={index}
                                        size={{xs: 6, sm: 4, md: 3, lg: 2}}>
                                        <CardAction
                                            key={index}
                                            product={phone}
                                        >
                                        </CardAction>
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: 4,
                                }}
                                count={phones.last_page}
                                page={phones.current_page}
                                onChange={handlePageChange}
                            >
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Phone;