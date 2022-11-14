import React from 'react';
import SellersTable from './SellersTable';
import BuyersTable from './BuyersTable';
import CommoditiesTable from './CommoditiesTable';
import CategoriesTable from './CategoriesTable';
import { Separator } from '../..';

const AdminPanel = () => {
  return (
    <>
      <CategoriesTable />
      <Separator />
      <CommoditiesTable />
      <Separator />
      <SellersTable />
      <Separator />
      <BuyersTable />
    </>
  )
}

export default AdminPanel