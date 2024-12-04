import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputError from "./InputError";
import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";

const AddCategory = ({ onClose }) => {
    const { data, setData, errors, post, processing } = useForm({
        category: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('store.category'), {
            data,
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
                                Category
                            </Typography>
                        </InputLabel>
                        <TextInput
                            id="category"
                            className="p-3 w-full"
                            autoComplete="category"
                            name="category"
                            isFocused={true}
                            value={data.category}
                            onChange={(e) => setData("category", e.target.value)}
                        ></TextInput>
                        <InputError message={errors.category} className="mt-2" />
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
                            {processing ? "Processing" : "Save"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default AddCategory;
