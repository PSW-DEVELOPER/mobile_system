import { useForm } from "@inertiajs/react";
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextInput from "./TextInput";

const Search = () => {
    const { data, setData, get, processing } = useForm({
        search: "",
    });

    const submit = (e) => {
        e.preventDefault();
        get(route("search"));
    };

    return (
        <>
            <Box className="flex items-center gap-1">
                <TextInput
                    id="search"
                    placeholder="Search for movies..."
                    name="search"
                    value={data.search}
                    className="block w-full"
                    autoComplete="search"
                    onChange={(e) => setData("search", e.target.value)}
                />
                <Button variant="outlined" sx={{ padding: 1 }} onClick={submit}>
                    <SearchIcon />
                </Button>
            </Box>
        </>
    );
};

export default Search;
