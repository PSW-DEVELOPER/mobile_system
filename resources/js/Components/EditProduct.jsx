import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import InputError from "./InputError";
import { useForm } from "@inertiajs/react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";

const EditProduct = ({ product, categories, onClose }) => {
    const { data, setData, errors, post, processing } = useForm({
        name: product.name,
        category: product.category_id,
        price: product.price,
        description: product.description,
        stock: product.stock,
        status: product.status,
        photo: product.photo,
    });

    const imageUrl = `/storage/${data.photo}`

    const [imagePhotoPreview, setImagePhotoPreview] = React.useState(
        imageUrl || null
    );

    const handleImagePhotoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData("photo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePhotoPreview(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('update.product', {id: product.id}), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel htmlFor="name" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Product Name
                            </Typography>
                        </InputLabel>
                        <TextInput
                            id="name"
                            className="p-3 w-full"
                            autoComplete="name"
                            name="productName"
                            isFocused={true}
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        ></TextInput>
                        <InputError message={errors.name} className="mt-2" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel htmlFor="category" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Category
                            </Typography>
                        </InputLabel>
                        <select
                            id="category"
                            name="category"
                            className="rounded-md capitalize border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 block w-full"
                            value={data.category}
                            autoComplete="category"
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                        >
                            <option value="" hidden></option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.category}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <InputLabel htmlFor="price" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Product Price
                            </Typography>
                        </InputLabel>
                        <TextInput
                            id="price"
                            type="number"
                            className="p-3 w-full"
                            autoComplete="price"
                            name="price"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                        ></TextInput>
                        <InputError message={errors.price} className="mt-2" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <InputLabel htmlFor="stock" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Stock
                            </Typography>
                        </InputLabel>
                        <TextInput
                            id="stock"
                            type="number"
                            className="p-3 w-full"
                            autoComplete="stock"
                            name="stock"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                        ></TextInput>
                        <InputError message={errors.stock} className="mt-2" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <InputLabel htmlFor="status" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Status
                            </Typography>
                        </InputLabel>
                        <select
                            id="status"
                            name="status"
                            className="rounded-md capitalize border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 block w-full"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option hidden></option>
                            <option value="1">Publish</option>
                            <option value="0">Unpublish</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <InputLabel htmlFor="description" className="mb-1">
                            <Typography variant="caption" fontWeight="bold">
                                Description
                            </Typography>
                        </InputLabel>
                        <textarea
                            id="description"
                            name="description"
                            autoComplete="description"
                            value={data.description}
                            className="resize-y block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <div>
                            <InputLabel htmlFor="photo" className="mb-1">
                                <Typography variant="caption" fontWeight="bold">
                                    Photo
                                </Typography>
                            </InputLabel>
                            <InputLabel>
                                <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 p-2">
                                    <input
                                        id="photo"
                                        name="photo"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleImagePhotoChange}
                                    />
                                    {imagePhotoPreview && (
                                        <img
                                            className="w-full"
                                            src={imagePhotoPreview}
                                            alt="image"
                                        />
                                    )}

                                    {!imagePhotoPreview && (
                                        <div className="text-center">
                                            <InsertPhotoIcon
                                                sx={{ fontSize: 40 }}
                                                className="text-gray-300"
                                            />
                                            <div className="mt-3 flex text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="photo"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload Image</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </InputLabel>
                            <InputError
                                message={errors.photo}
                                className="mt-2"
                            />
                        </div>
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
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default EditProduct;
