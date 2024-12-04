import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Alert, AlertTitle, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertBox = () => {
    const { flash } = usePage().props;

    // Local state to control alert visibility
    const [visible, setVisible] = useState(!!flash?.message);

    useEffect(() => {
        if (flash?.message) {
            setVisible(true); // Show alert when there's a new flash message
        }
    }, [flash]);

    if (!flash?.message) {
        return null; // Do not render anything if there's no flash message
    }

    const alertSeverity = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
    };

    return (
        <Collapse in={visible}>
            <Alert
                severity={alertSeverity[flash.type] || 'info'}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setVisible(false)}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                <AlertTitle>{flash.type?.charAt(0).toUpperCase() + flash.type?.slice(1)}</AlertTitle>
                {flash.message}
            </Alert>
        </Collapse>
    );
};

export default AlertBox;