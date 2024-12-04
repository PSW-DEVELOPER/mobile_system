import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import InputError from "./InputError";
import { useForm } from "@inertiajs/react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from "@mui/icons-material/Cancel";

const DeleteProduct = ({ product, onClose }) => {
    const { post, processing } = useForm();
    const submit = (e) => {
        e.preventDefault();
        post(route("delete.product", { id: product }), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <Box textAlign="center">
                    <Typography variant="subtitle1" mb={2}>
                        Are you sure you want to delete?
                    </Typography>
                    <Button
                        onClick={() => onClose()}
                        variant="contained"
                        sx={{mr: 1}}
                        startIcon={<CancelIcon />}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={submit}
                        disabled={processing}
                        endIcon={<DeleteIcon />}
                    >
                        {processing ? "Deleting..." : "Delete"}
                        
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default DeleteProduct;
