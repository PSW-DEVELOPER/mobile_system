import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useForm } from "@inertiajs/react";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from "@mui/icons-material/Cancel";

const DeleteUser = ({ user, onClose }) => {
    const { post, processing } = useForm();
    const submit = (e) => {
        e.preventDefault();
        post(route("delete.user", { id: user }), {
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

export default DeleteUser;
