import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/loader";
import { deleteProduct, getProducts } from "../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProducts()).finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">All Entries</h1>
        <Link
          to="/product"
          className="text-white bg-indigo-600 px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
        >
          + Add Entry
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <Loader />
        </div>
      )}

      {/* No Data Message */}
      {!isLoading && products.length === 0 && (
        <p className="text-center text-gray-600 font-medium">
          No data available. Please add some entries.
        </p>
      )}

      {/* Product Table */}
      {!isLoading && products.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Production
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Feed</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.customID}>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.customID}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.production}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.rate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.feed}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.production * product.rate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <Link
                      to={`/productupdate/${product.customID}`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => dispatch(deleteProduct(product.customID))}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
