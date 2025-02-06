import React, { useEffect } from "react";
import {
  CALC_PRODUCTION_VALUE,
  CALC_STORE_VALUE,
  selectTotalStoreValue,
  selectProductionValue,
  selectFeedValue,
  CALC_FEED_VALUE,
} from "../../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";

const Productsumm = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const usedFeed = useSelector(selectFeedValue);
  const totaleggs = useSelector(selectProductionValue);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_PRODUCTION_VALUE(products));
    dispatch(CALC_FEED_VALUE(products));
  }, [dispatch, products]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <main className="max-w-7xl mx-auto">
        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
        </header>

        {/* Dashboard content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Store Value */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-600">Total Store Value</h2>
            <p className="text-2xl lg:text-3xl font-bold text-indigo-600 mt-2">
              Rs.{totalStoreValue}
            </p>
          </div>

          {/* Total Eggs */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-600">Total Eggs</h2>
            <p className="text-2xl lg:text-3xl font-bold text-indigo-600 mt-2">
              {totaleggs}
            </p>
          </div>

          {/* Feed Used */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-600">Feed Used</h2>
            <p className="text-2xl lg:text-3xl font-bold text-indigo-600 mt-2">
              {usedFeed}
            </p>
          </div>
        </div>

        <hr className="my-10" />

        {/* Product List */}
        <div>
          <ProductList />
        </div>
      </main>
    </div>
  );
};

export default Productsumm;
