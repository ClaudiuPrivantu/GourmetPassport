import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProducts: [],
    filteredProductsByContinent: [],
    filteredProductsByCountry: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            // console.log(action.payload);
            const { products, search } = action.payload;
            const tempProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
            );

            state.filteredProducts = tempProducts;
        },
        SORT_PRODUCTS(state, action) {
            const { sort } = action.payload;
            let tempProducts = state.filteredProducts.slice();
            if (sort === "latest") {
                tempProducts = tempProducts.sort((a, b) => {
                    return b.createdAt - a.createdAt;
                });
            }

            if (sort === "lowest-price") {
                tempProducts = tempProducts.sort((a, b) => {
                    return a.price - b.price;
                });
            }

            if (sort === "highest-price") {
                tempProducts = tempProducts.sort((a, b) => {
                    return b.price - a.price;
                });
            }

            if (sort === "a-z") {
                tempProducts = tempProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
            if (sort === "z-a") {
                tempProducts = tempProducts.sort((a, b) => {
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
            state.filteredProductsByContinent = tempProducts;
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_COUNTRY(state, action) {
            const { country } = action.payload;
            let tempProducts = [];
            if (country === "Toate") {
                tempProducts = state.filteredProductsByContinent;
            } else {
                tempProducts = state.filteredProductsByContinent.filter((product) => product.country === country);
            }
            state.filteredProductsByCountry = tempProducts;
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_PRICE(state, action) {
            const { price } = action.payload;
            let tempProducts = [];
            tempProducts = state.filteredProductsByCountry.filter((product) => product.price <= price);
            state.filteredProducts = tempProducts;
        },
    },
});

export const {
    FILTER_BY_SEARCH,
    SORT_PRODUCTS,
    FILTER_BY_CONTINENT,
    FILTER_BY_COUNTRY,
    FILTER_BY_PRICE
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export const selectFilteredProductsByContinent = (state) => state.filter.filteredProductsByContinent;

export default filterSlice.reducer;