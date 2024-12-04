import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router, usePage } from "@inertiajs/react";
import { Badge, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import CartDrawer from "@/Components/CartDrawer";
import Modal from "@/Components/Modal";
import Notification from "@/Components/Notification";
import { styled } from "@mui/material/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import Search from "@/Components/Search";


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [notificationModal, setNotificationModal] = useState(false);

    const handleOpenNotification = () => {
        setNotificationModal(true);
    };

    const handleCloseNotification = () => {
        setNotificationModal(false);
    };

    const [searchModal, setSearchModal] = useState(false);

    const handleOpenSearch = () => {
        setSearchModal(true);
    }

    const handleCloseSearch = () => {
        setSearchModal(false);
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            right: -5,
            top: 2,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: "0 4px",
        },
    }));

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <Typography
                                        color="primary"
                                        fontWeight="bold"
                                        variant="h5"
                                    >
                                        PSW MOBILE
                                    </Typography>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("home")}
                                    active={route().current("home")}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    href={route("phone")}
                                    active={route().current("phone")}
                                >
                                    Mobile Phone
                                </NavLink>
                                <NavLink
                                    href={route("watch")}
                                    active={route().current("watch")}
                                >
                                    Smart Watch
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center ms-auto mr-4 md:mr-0 gap-2">
                            <IconButton
                                onClick={handleOpenSearch}
                            >
                                <SearchIcon color="primary"/>
                            </IconButton>
                            {user && (
                                <IconButton
                                    onClick={handleOpenNotification}
                                >
                                    <StyledBadge
                                        badgeContent={
                                            user?.unread_notifications
                                                ?.length || null
                                        }
                                        color="error"
                                    >
                                        <MailIcon color="primary" />
                                    </StyledBadge>
                                </IconButton>
                            )}
                            <CartDrawer></CartDrawer>
                        </div>

                        <div className="hidden sm:ms-1 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                {user ? (
                                    <>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                    >
                                                        {user.name}

                                                        <svg
                                                            className="-me-0.5 ms-2 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <>
                                        <Button 
                                            color="secondary"
                                            variant="text"
                                            onClick={() => router.get(route("login"))}
                                        >
                                            Log in
                                        </Button>
                                        <Button 
                                            color="secondary"
                                            variant="text"
                                            onClick={() => router.get(route("register"))}
                                        >
                                            Register
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("home")}
                            active={route().current("home")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("phone")}
                            active={route().current("phone")}
                        >
                            Mobile Phone
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("watch")}
                            active={route().current("watch")}
                        >
                            Smart Watch
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            {
                                user && <>
                                    <div className="text-base font-medium text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </>
                            }
                        </div>

                        { user ? <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div> :
                            <div className="space-y-1">
                                <ResponsiveNavLink href={route("login")}>
                                    Log In
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("register")}>
                                    Register
                                </ResponsiveNavLink>
                            </div>
                        }
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            <footer className="bg-gray-200 pt-20 pb-10 mt-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-y-10">
                        <div className="basis-full md:basis-1/3 text-center md:text-start">
                            <h5 className="text-xl font-bold">Contact Us</h5>
                            <div className="flex flex-col gap-2 mt-5">
                                <p>Phone : 092323231</p>
                                <p>Gmail : pswmobile@gmail.com</p>
                                <p>Address : Yangon</p>
                            </div>
                        </div>
                        <div className="basis-full md:basis-1/3 text-center md:text-center">
                            <h5 className="text-xl font-bold">Quick Link</h5>
                            <div className="flex flex-col gap-2 mt-5">
                                <Link className="text-blue-600 hover:underline" href={route('home')}>Home</Link>
                                <Link className="text-blue-600 hover:underline" href={route('phone')}>Smart Phone</Link>
                                <Link className="text-blue-600 hover:underline" href={route('watch')}>Smart Watch</Link>
                            </div>
                        </div>
                        <div className="basis-full md:basis-1/3 text-center md:text-end">
                            <h5 className="text-xl font-bold">About Us</h5>
                            <div className="flex flex-col gap-2 mt-5">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nesciunt quo repellat, libero inventore nulla expedita, ea dolores accusantium nihil enim a nisi! Ipsum beatae voluptatibus, temporibus modi vitae qui!
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <FacebookIcon sx={{fontSize: "30px"}} color="primary"/>
                        <TelegramIcon sx={{fontSize: "30px"}} color="primary"/>
                        <WhatsAppIcon sx={{fontSize: "30px"}} color="primary"/>
                        <InstagramIcon sx={{fontSize: "30px"}} color="primary"/>
                    </div>
                    <p className="text-xs text-center mt-5">&copy; copyright, Design by PSW MOBILE</p>
                </div>
            </footer>

            {/* Notification Modal Box  */}
            {
                user && <Modal
                    header="Mail Box"
                    show={notificationModal}
                    onClose={handleCloseNotification}
                >
                    <Notification></Notification>
                </Modal>
            }

            {/* Search Modal Box */}
            <Modal header="Search" show={searchModal} onClose={handleCloseSearch}>
                <Search></Search>
            </Modal>
        </div>
    );
}
