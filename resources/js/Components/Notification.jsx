import { router, usePage } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";

const Notification = () => {

    const user = usePage().props.auth.user;

    const notifications = user.unread_notifications || [];

    const markAsRead = (notificationId) => {
        router.post(route('read.notification', { id: notificationId }));
    }

    return (
        <>
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <Box
                        key={index}
                        border={"1px solid silver"}
                        p={1}
                        borderRadius={1}
                        mb={1} // Add spacing between notifications
                    >
                        <Box className="flex justify-between text-blue-500">
                            <Typography variant="caption" fontStyle="italic">
                                By PSW Mobile Team
                            </Typography>
                            <Typography variant="caption">
                                {new Date(notification.created_at).toLocaleTimeString()}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2">
                            {notification.data.message || "No message available."}
                        </Typography>
                        <Button
                            variant="text"
                            color="primary"
                            size="small"
                            onClick={() => markAsRead(notification.id)}
                        >
                            Mark as Read
                        </Button>
                    </Box>
                ))
            )  : (
                <Typography variant="body1" color="textSecondary">
                    No notifications available.
                </Typography>
            )}
            {/* <Box className="text-start border p-3">
                {data.map((notification, index  ) => (
                    <Box key={index} onClick={() => markAsRead(notification.id)}>
                        <Typography variant="subtitle2">{notification.data.message}</Typography>
                        <Typography variant="subtitle2" color="info">By PSW MOBILE TEAM</Typography>
                    </Box>
                ))}
            </Box> */}
        </>
    )
}

export default Notification;