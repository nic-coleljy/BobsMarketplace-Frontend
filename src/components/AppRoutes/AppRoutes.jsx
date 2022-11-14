import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AddLicense, EditCommodityDetails, Home, Login, NotFound, CommodityDetails, Purchase, Register, Search, EditCategoryDetails, EditProductDetails, CommodityProductsTable, EditProfile, OrderPanel, Profile, SellerLicensesTable, SellerProducts } from '..';
import { UserContext } from '../../helpers/Contexts';
import { RoleEnum } from '../../helpers/Role';

const AppRoutes = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/" element={
                <Home />
            } />
            {!currentUser ? (
                <>
                    <Route path="/login" element={
                        <Login />
                    } />
                    <Route path="/register" element={
                        <Register />
                    } />
                    <Route path="*" element={
                        <Navigate
                            to="/login"
                        />
                    } />
                </>
            ) : (
                <>
                    <Route path="/login" element={
                        <Navigate
                            to="/"
                        />
                    } />
                    <Route path="/register" element={
                        <Navigate
                            to="/"
                        />
                    } />
                    <Route
                        path="/profile"
                        element={
                            <Profile />
                        }
                    />
                    <Route
                        path="/profile/edit/:field"
                        element={
                            <EditProfile />
                        }
                    />
                    <Route
                        path="/purchase/:id"
                        element={
                            <Purchase />
                        }
                    />
                    <Route
                        path="/commodity/:id"
                        element={
                            <CommodityDetails />
                        }
                    />
                    <Route
                        path="/:searchQuery"
                        element={
                            <Search />
                        }
                    />
                    {currentUser.role === RoleEnum.SELLER && (
                        <>
                            <Route
                                path="/product"
                                element={
                                    <SellerProducts />
                                }
                            />
                            <Route
                                path="/license"
                                element={
                                    <SellerLicensesTable />
                                }
                            />
                            <Route
                                path="/license/add"
                                element={
                                    <AddLicense />
                                }
                            />
                            <Route
                                path="/product/edit/:id"
                                element={
                                    <EditProductDetails />
                                }
                            />
                        </>
                    )}
                    {currentUser.role !== RoleEnum.ADMIN ? (
                        <>
                            <Route
                                path="/order"
                                element={
                                    <OrderPanel />
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/category/edit/:id"
                                element={
                                    <EditCategoryDetails />
                                }
                            />
                            <Route
                                path="/commodity/edit/:id"
                                element={
                                    <EditCommodityDetails />
                                }
                            />
                            <Route
                                path="/commodity/product/:id"
                                element={
                                    <CommodityProductsTable />
                                }
                            />
                        </>
                    )}
                </>
            )}
            <Route path='*' element={
                <NotFound />
            } />
        </Routes>
    )
}

export default AppRoutes