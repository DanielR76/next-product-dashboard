'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid';

import { useGetData, useDeleteData, useModalForm } from '@hooks';
import { endpoints } from '@services';
import { Button, Modal } from '@molecules';
import { Product } from '@types';
import { Paths } from '@constants';

export default function Products() {
  const { handleOpenModal } = useModalForm();

  const { data: products, refetch } = useGetData<Product[]>({
    queryKey: ['list-all-products'],
    url: endpoints.products.getAllProducts,
  });

  const { mutate } = useDeleteData<boolean>({
    onSuccess(result) {
      if (result) refetch();
    },
  });

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            List of products
          </h2>
        </div>

        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <Button value="Add product" onClick={handleOpenModal} />
          </span>
        </div>
      </div>

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
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={product?.images?.[0]}
                              alt="avatar"
                              width={20}
                              height={20}
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
                        <Link href={`${Paths.Product}/${product.id}`}>
                          <PencilSquareIcon className="h-5 cursor-pointer text-blue-500" />
                        </Link>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <TrashIcon
                          className="h-5 cursor-pointer text-red-400"
                          onClick={() => mutate(endpoints.products.removeProductById(product.id))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal />
    </>
  );
}
