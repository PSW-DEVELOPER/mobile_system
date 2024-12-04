import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useTheme, useMediaQuery } from "@mui/material";
import { useForm } from "@inertiajs/react";

export default function CardAction({ product }) {
    const { get } = useForm();

    const theme = useTheme();
    // Define breakpoints for responsive truncation
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Small screens
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // Medium screens
    const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg")); // Large screens

    const handleDetail = (e) => {
        e.preventDefault();
        get(route('product.detail', {id: product.id}))
    }

    const truncateTitle = (title) => {
        if (isSmallScreen)
            return title.length > 6 ? title.slice(0, 8) + "..." : title;
        if (isMediumScreen)
            return title.length > 15 ? title.slice(0, 14) + "..." : title;
        if (isLargeScreen)
            return title.length > 18 ? title.slice(0, 15) + "..." : title;
        return title.length > 18 ? title.slice(0, 15) + "..." : title; // Larger screens
    };

    return (
        <Card sx={{ maxWidth: 200 }} className="border border-gray-300">
            <CardActionArea onClick={handleDetail}>
                <CardMedia
                    component="img"
                    sx={{
                        p: 0.5,
                        height: { xs: 180, sm: 240, md: 230, lg: 170 },
                        objectFit: "fill",
                    }}
                    image={`/storage/${product.photo}`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="caption" gutterBottom component="div">
                        {truncateTitle(product.name)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
