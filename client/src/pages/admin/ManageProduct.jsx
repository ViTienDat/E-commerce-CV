import React, { useEffect, useState } from "react";
import { InputField, InputFrom } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProducts } from "../../apis";

const ManageProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [counts, setCounts] = useState(0);
  const [products, setProducts] = useState(null);
  const fetchProducts = async (params) => {
    const response = await apiGetProducts(params);
    if (response?.success) {
      setProducts(response?.data);
      setCounts(response?.counts);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchProduct = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div>
        <h1 className="h-[75px] flex items-center justify-center text-3xl font-bold px-4 border-b">
          Manage Products
        </h1>
      </div>
      <div className="w-full px-4">
        <div className="flex justify-end py-4">
          <InputFrom
            id={"q"}
            register={register}
            error={errors}
            fullwidth
            placeholder={"Search products by title"}
            style={"px-4 py-2"}
          />
        </div>
        <form className="" onSubmit={handleSubmit(handleSearchProduct)}>
          <table className="table-auto mb-6 text-left w-full">
            <thead>
              <tr>
                <th>Order</th>
                <th>Thubmail</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Color</th>
                <th>Size</th>
                <th>Isready</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((el, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={el?.thumbnail}
                      alt=""
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="">{el?.title}</td>
                  <td>{el?.price}</td>
                  <td>{el.category}</td>
                  <td>{el?.color}</td>
                  <td>{el?.size}</td>
                  <td>{el?.isready}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ManageProduct;
