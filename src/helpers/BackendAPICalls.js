import { dummySorts } from "./dummyData";

// User
export const handleRegister = async (registration) => {
    return await fetch('/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registration),
    });
}
export const handleLogin = async (login) => {
    return await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login),
    });
}
export const fetchCategories = async () => {
    return await fetch('/api/category/')
        .then(response => response.json());
}
export const fetchSorts = async () => {
    // Todo: Link backend
    return dummySorts;
}
export const fetchCommodities = async () => {
    return await fetch('/api/commodityname/admin')
        .then(response => response.json());
}
export const fetchSellableCommodities = async () => {
    return await fetch('/api/commodityname/get-all-sellable-commodity')
        .then(response => response.json());
}
export const fetchCommodity = async (id) => {
    return await fetch(`/api/commodityname/user/${id}`);
}
export const handleSearch = async (searchRequest) => {
    return await fetch('/api/commodityname/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchRequest),
    }).then(response => response.json());
}
export const fetchOrders = async (id) => {
    return await fetch(`/api/transaction/user/${id}`)
        .then(response => response.json());
}

// Buyer
export const handleDeleteBuyer = async (email) => {
    return await fetch(`/api/buyer/${email}`, {
        method: 'DELETE',
    });
}
export const handleEditBuyerName = async (id, name) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const handleEditBuyerEmail = async (id, email) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const handleEditBuyerBusinessProfileUrl = async (id, businessProfileUrl) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const fetchAvailableLoanAmount = async (id, requestAmount) => {
    return await fetch(`/api/buyer/credit-limit`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            requestAmount: requestAmount
        }),
    });
}
export const handlePurchase = async (payload) => {
    return await fetch(`/api/transaction/buyer`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });
}

// Seller
export const handleDeleteSeller = async (email) => {
    return await fetch(`/api/seller/${email}`, {
        method: 'DELETE',
    });
}
export const handleEditSellerName = async (id, name) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const handleEditSellerEmail = async (id, email) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const handleEditSellerBusinessProfileUrl = async (id, businessProfileUrl) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const fetchSellerProducts = async (id) => {
    return await fetch(`/api/commodity/seller/${id}`)
        .then(response => response.json());
}
export const fetchProduct = async (id) => {
    return await fetch(`/api/commodity/find-by-cid/${id}`);
}
export const handleAddProduct = async (product) => {
    return await fetch(`/api/commodity/seller`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
    });
}
export const handleUpdateProduct = async (id, product) => {
    return await fetch(`/api/commodity/seller/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
    });
}
export const handleDeleteProduct = async (id) => {
    return await fetch(`/api/commodity/seller/${id}`, {
        method: 'DELETE',
    });
}
export const fetchSellerLicenses = async (id) => {
    // Todo: Pass user token to backend
    return await fetch(`/api/license/seller/${id}`)
        .then(response => response.json());
}
export const handleAddLicense = async (id, license) => {
    // Todo: Pass user token to backend
    return await fetch(`/api/license/seller/${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(license),
    });
}

// Admin
export const handleDeleteAdmin = async (email) => {
    // Todo: Link backend
    return 'delete';
}
export const handleEditAdminName = async (id, name) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const handleEditAdminEmail = async (id, email) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const handleEditAdminBusinessProfileUrl = async (id, businessProfileUrl) => {
    // Todo: Link Backend
    return {
        status: 200,
    };
}
export const fetchSellers = async () => {
    return await fetch('/api/seller')
        .then(response => response.json());
}
export const handleLockSeller = async (id) => {
    return await fetch(`/api/seller/lock/${id}`);
}
export const handleUnlockSeller = async (id) => {
    return await fetch(`/api/seller/unlock/${id}`);
}
export const fetchBuyers = async () => {
    return await fetch('/api/buyer')
        .then(response => response.json());
}
export const handleLockBuyer = async (id) => {
    return await fetch(`/api/buyer/lock/${id}`);
}
export const handleUnlockBuyer = async (id) => {
    return await fetch(`/api/buyer/unlock/${id}`);
}
export const fetchCategory = async (id) => {
    return await fetch(`/api/category/find-by-id/${id}`);
}
export const handleAddCategory = async (category) => {
    return await fetch(`/api/category/admin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    });
}
export const handleUpdateCategory = async (id, category) => {
    return await fetch(`/api/category/admin/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    });
}
export const handleRemoveCategory = async (id) => {
    return await fetch(`/api/category/admin/${id}`, {
        method: 'DELETE',
    });
}
export const handleAddCommodity = async (commodity) => {
    return await fetch(`/api/commodityname/admin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commodity),
    });
}
export const handleUpdateCommodity = async (id, commodity) => {
    return await fetch(`/api/commodityname/admin/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commodity),
    });
}
export const handleRemoveCommodity = async (id) => {
    return await fetch(`/api/commodityname/admin/${id}`, {
        method: 'DELETE',
    });
}
export const fetchCommodityProducts = async (id) => {
    return await fetch(`/api/commodity/admin/${id}`)
        .then(response => response.json());
}