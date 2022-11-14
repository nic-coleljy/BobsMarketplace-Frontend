import { createContext } from "react";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => { },
    searchTerm: null,
    setSearchTerm: () => { },
    sort: null,
    setSort: () => { },
    categories: null,
    setCategories: () => { },
    isLoading: false,
    setIsLoading: () => { },
    errorMessage: null,
    setErrorMessage: () => { },
});