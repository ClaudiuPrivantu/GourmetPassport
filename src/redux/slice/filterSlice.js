import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProducts: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            console.log(action.payload);
            const { products, search } = action.payload;
            const tempProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
            );

            state.filteredProducts = tempProducts;
        },
        SORT_PRODUCTS(state, action) {
            const { products, sort } = action.payload;
            let tempProducts = [];
            if (sort === "latest") {
                tempProducts = products;
            }

            if (sort === "lowest-price") {
                tempProducts = products.slice().sort((a, b) => {
                    return a.price - b.price;
                });
            }

            if (sort === "highest-price") {
                tempProducts = products.slice().sort((a, b) => {
                    return b.price - a.price;
                });
            }

            if (sort === "a-z") {
                tempProducts = products.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
            if (sort === "z-a") {
                tempProducts = products.slice().sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }

            state.filteredProducts = tempProducts;
        },
        FILTER_BY_CONTINENT(state, action) {
            const { products, continent } = action.payload;
            let tempProducts = [];
            if (continent === "Toate") {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.continent === continent
                );
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_COUNTRY(state, action) {
            const { products, country } = action.payload;
            let tempProducts = [];
            if (country === "Toate") {
                tempProducts = products;
            } else {
                tempProducts = products.filter((product) => product.country === country);
            }
            state.filteredProducts = tempProducts;
        },
    },
});

export const {
    FILTER_BY_SEARCH,
    SORT_PRODUCTS,
    FILTER_BY_CONTINENT,
    FILTER_BY_COUNTRY
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;