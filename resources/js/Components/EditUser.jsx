import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import InputError from "./InputError";
import { useForm } from "@inertiajs/react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";

const EditUser = ({ user, onClose }) => {
    const { data, setData, errors, post, processing } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('update.user', {id: user.id}), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <InputLabel htmlFor="name" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Name
                            </Typography>
                        </InputLabel>
                        <TextInput
                            id="name"
                            className="p-3 w-full"
                            autoComplete="name"
                            name="name"
                            isFocused={true}
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        ></TextInput>
                        <InputError message={errors.name} className="mt-2" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <InputLabel htmlFor="name" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Email
                            </Typography>
                        </InputLabel>
                        <TextInput
                            id="email"
                            className="p-3 w-full"
                            autoComplete="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        ></TextInput>
                        <InputError message={errors.email} className="mt-2" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <InputLabel htmlFor="category" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Role
                            </Typography>
                        </InputLabel>
                        <select
                            id="role"
                            name="role"
                            className="rounded-md capitalize border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 block w-full"
                            value={data.role}
                            autoComplete="role"
                            onChange={(e) =>
                                setData("role", e.target.value)
                            }
                        >
                            <option value="0">User</option>
                            <option value="1">Admin</option>
                        </select>
                        <InputError
                            message={errors.role}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button
                            type="submit"
                            disabled={processing}
                            variant="contained"
                            sx={{
                                marginLeft: "auto",
                                p: 1,
                                display: "block",
                                width: "100%",
                            }}
                        >
                            {processing ? "Updating..." : "Update"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default EditUser;
