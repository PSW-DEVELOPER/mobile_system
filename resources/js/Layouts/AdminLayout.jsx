import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ViewListIcon from '@mui/icons-material/ViewList';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, usePage } from "@inertiajs/react";

const drawerWidth = 240;

function AdminLayout(props) {
    const { window, children } = props;

    const { url } = usePage();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{padding: 0}}>
                        <Link 
                            href={route('admin.dashboard')}
                            className={url === '/admin/dashboard' ? 
                                "flex items-center w-full px-4 py-2 bg-gray-300" : 
                                "flex items-center w-full px-4 py-2"}
                        >
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{padding: 0}}>
                        <Link 
                            href={route('product.list')}
                            className={url === '/admin/products' ? 
                                "flex items-center w-full px-4 py-2 bg-gray-300" : 
                                "flex items-center w-full px-4 py-2"}
                        >
                            <ListItemIcon><ViewListIcon /></ListItemIcon>
                            <ListItemText primary="Product List" />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{padding: 0}}>
                        <Link 
                            href={route('user.list')}
                            className={url === '/admin/users' ? 
                                "flex items-center w-full px-4 py-2 bg-gray-300" : 
                                "flex items-center w-full px-4 py-2"}
                        >
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="User List" />
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{padding: 0}}>
                        <Link 
                            href={route('order.list')}
                            className={url === '/admin/orders' ? 
                                "flex items-center w-full px-4 py-2 bg-gray-300" : 
                                "flex items-center w-full px-4 py-2"}
                        >
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary="Order Mail" />
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{padding: 0}}>
                        <Link 
                            as="button"
                            href={route('logout')}
                            method="post"
                            className="flex items-center justify-center w-full px-4 py-2 hover:bg-red-500 hover:text-white"
                        >
                            <ListItemIcon sx={{marginRight: 0}}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" sx={{textAlign: "start"}}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        PSW Mobile Second
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    overflow: 'hidden',
                }}
            >
                <Toolbar />
                <div>
                    {children}
                </div>
            </Box>
        </Box>
    );
}

AdminLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default AdminLayout;
