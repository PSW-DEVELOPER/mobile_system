import AdminLayout from "@/Layouts/AdminLayout";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WatchIcon from '@mui/icons-material/Watch';
import GroupIcon from '@mui/icons-material/Group';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Head } from "@inertiajs/react";

const Dashboard = ({phone, watch, order, user, income}) => {
    // Calculate today's date
    const today = new Date().toISOString().split("T")[0];

    // Calculate today's income
    const todayIncome = income
        .filter(o => o.created_at && o.created_at.startsWith(today)) // Filter today's orders
        .reduce((total, o) => total + (o.total || 0), 0); // Sum the totalPrice

    // Calculate monthly income
    const calculateMonthlyIncome = (income) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return income
            .filter(o => {
                const createdDate = new Date(o.created_at);
                return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
            })
            .reduce((total, o) => total + (o.total || 0), 0);
    };

    const monthlyIncome = calculateMonthlyIncome(income);

    const calculateYearlyIncome = (income) => {
        const currentYear = new Date().getFullYear();

        return income
            .filter(o => {
                const createdDate = new Date(o.created_at);
                return createdDate.getFullYear() === currentYear;
            })
            .reduce((total, o) => total + (o.total || 0), 0);
    };

    const yearlyIncome = calculateYearlyIncome(income);


    // Format numbers for display
    const formattedTodayIncome = todayIncome.toLocaleString("en-US");
    const formattedMonthlyIncome = monthlyIncome.toLocaleString("en-US");
    const formattedYearlyIncome = yearlyIncome.toLocaleString("en-US");
    
    return (
        <>
            <AdminLayout>
                <Head title="Dashboard" />
                <div className="p-4">
                    <div className="flex w-full items-center mb-5">
                        <Typography variant="h6">Dashboard</Typography>
                    </div>
                    
                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={{xs: 12, sm: 6, lg: 3}}>
                                <Box className="bg-blue-500 rounded-md p-5">
                                    <Typography variant="h6" color="white">SMART PHONE</Typography>
                                    <Box className="flex items-center justify-between mt-3">
                                        <PhoneAndroidIcon sx={{color: "white"}} fontSize="large"/>
                                        <Typography variant="h4" sx={{color: "white"}} fontWeight="bold">{phone.length}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{xs: 12, sm: 6, lg: 3}}>
                                <Box className="bg-orange-500 rounded-md p-5">
                                    <Typography variant="h6" color="white">SMART WATCH</Typography>
                                    <Box className="flex items-center justify-between mt-3">
                                        <WatchIcon sx={{color: "white"}} fontSize="large"/>
                                        <Typography variant="h4" sx={{color: "white"}} fontWeight="bold">{watch.length}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{xs: 12, sm: 6, lg: 3}}>
                                <Box className="bg-gray-500 rounded-md p-5">
                                    <Typography variant="h6" color="white">USER</Typography>
                                    <Box className="flex items-center justify-between mt-3">
                                        <GroupIcon sx={{color: "white"}} fontSize="large"/>
                                        <Typography variant="h4" sx={{color: "white"}} fontWeight="bold">{user.length}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{xs: 12, sm: 6, lg: 3}}>
                                <Box className="bg-green-600 rounded-md p-5">
                                    <Typography variant="h6" color="white">NEW ORDER</Typography>
                                    <Box className="flex items-center justify-between mt-3">
                                        <MoveToInboxIcon sx={{color: "white"}} fontSize="large"/>
                                        <Typography variant="h4" sx={{color: "white"}} fontWeight="bold">{order.length}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{xs: 12, lg: 4}}>
                                <Box className="bg-gray-700 rounded-md p-10">
                                    <Typography variant="h6" color="white">TODAY INCOME</Typography>
                                    <Box className="flex items-center justify-between mt-3">
                                        <AttachMoneyIcon sx={{color: "white"}} fontSize="large"/>
                                        <Typography variant="h4" sx={{color: "white"}} fontWeight="bold">{formattedTodayIncome} Ks</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{xs: 12, lg: 4}}>
                                <Box className="bg-gray-800 rounded-md p-10">
                                    <Typography variant="h6" color="white">MONTH INCOME</Typography>
                                    <Box className="flex items-center justify-between mt-3">
                                        <AttachMoneyIcon sx={{color: "white"}} fontSize="large"/>
                                        <Typography variant="h4" sx={{color: "white"}} fontWeight="bold">{formattedMonthlyIncome} Ks</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{xs: 12, lg: 4}}>
                                <Box className="bg-gray-900 rounded-md p-10">
                                    <Typography variant="h6" color="white">YEAR INCOME</Typography>
                                    <Box className="flex items-center justify-between mt-3">
                                        <AttachMoneyIcon sx={{color: "white"}} fontSize="large"/>
                                        <Typography variant="h4" sx={{color: "white"}} fontWeight="bold">{formattedYearlyIncome} Ks</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>   
            </AdminLayout>
        </>
    )
}

export default Dashboard;