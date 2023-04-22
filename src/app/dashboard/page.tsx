'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import { endpoints } from 'services';
import { useGetData } from 'hooks';
import Chart from 'components/common/Chart';

const PRD_LIMIT = 5;
const PRD_OFFSET = 5;

export default function Dashboard() {
  const {
    data: products,
    isFetching,
    isLoading,
  } = useGetData({
    queryKey: ['list-products'],
    url: endpoints.products.getListOfProducts(PRD_LIMIT, PRD_OFFSET),
  });

  const categoryList = useMemo(() => products?.map((product: any) => product.category), [products]);

  const categoryNames = useMemo(
    () => categoryList?.map((category: any) => category.name),
    [categoryList],
  );

  const countOcurrences = useMemo(
    () =>
      categoryNames?.reduce((acc: any, curr: string) => ((acc[curr] = ++acc[curr] || 1), acc), {}),
    [categoryNames],
  );

  const chartData = {
    datasets: [
      {
        label: 'Categories',
        data: countOcurrences,
        borderWidth: 2,
        backgroundColor: ['#d73333', '#33d788', '#336fd7', '#d733be', '#d7bc33'],
      },
    ],
  };

  if (isFetching || isLoading) return <span>Loading...</span>;

  return (
    <>
      <Chart chartData={chartData} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CATEGORY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product: any) => (
                    <tr key={product.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={product?.images?.[0]}
                              alt="image-avatar"
                            />
                          </div>

                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product?.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product?.category?.name}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          $ {product?.price}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product?.id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href="#" className="text-indigo-600 hover:text-indigo-900">
                          Remove
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
