'use client';

import { FC, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

import { Input } from '@molecules';

import { useForm, useGetData, useModalForm, usePostData } from '@hooks';
import { endpoints } from '@services';
import { Product } from '@types';
interface FormProps {
  onClose: () => void;
  initialData?: DataForm;
}

interface DataForm extends Pick<Product, 'title' | 'price' | 'description'> {
  category: number;
}

export const Form: FC<FormProps> = ({ initialData }) => {
  const { handleCloseModal } = useModalForm();
  const { values, handleChangeInput } = useForm<DataForm>({
    title: '',
    price: 1,
    category: 1,
    description: '',
  });
  const { title, price, description, category } = values;

  const { refetch } = useGetData<Product[]>({
    queryKey: ['list-all-products'],
    url: endpoints.products.getAllProducts,
  });

  const { mutate, error } = usePostData<Product>({
    url: endpoints.products.addProduct,
    onSuccess(response) {
      if (response?.id) {
        refetch();
        handleCloseModal();
      }
    },
  });

  const isInvalidForm = error?.response?.status === 400;
  const errorMessages = error?.response?.data?.message;

  const [image, setImage] = useState<string>('');

  const handleFileChange = (event: EventInput) => {
    const fileName = event?.target?.files?.[0]?.name;
    if (fileName) setImage(fileName);
  };

  const handleSumbmit = (event: EventSubmit) => {
    event.preventDefault();
    mutate({
      title,
      price,
      categoryId: category,
      description,
      images: [/* image */ 'https://picsum.photos/640/640?r=4586'],
    });
  };

  return (
    <form className="w-full" onSubmit={handleSumbmit}>
      {isInvalidForm && errorMessages && (
        <section className="mt-4 text-red-600">
          {errorMessages?.map((error, index) => (
            <ul>
              <li>
                <span key={index}>{error}</span>
              </li>
            </ul>
          ))}
        </section>
      )}

      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              label="title"
              defaultValue={initialData?.title}
              value={title}
              onChange={handleChangeInput}
            />

            <Input
              label="price"
              defaultValue={initialData?.price}
              value={price}
              onChange={handleChangeInput}
              inputtype="number"
            />

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>

              <div className="mt-2">
                <select
                  id="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  name="category"
                  onChange={handleChangeInput}
                  defaultValue={initialData?.category}
                  value={category}
                  autoComplete="category-name"
                >
                  <option value={1}>Clothes</option>
                  <option value={2}>Electronics</option>
                  <option value={3}>Furnite</option>
                  <option value={4}>Toys</option>
                  <option value={5}>Others</option>
                </select>
              </div>
            </div>

            <Input
              label="description"
              defaultValue={initialData?.description}
              value={description}
              onChange={handleChangeInput}
              type="textarea"
            />

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Update photo
              </label>

              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />

                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>

                      <input
                        id="file-upload"
                        className="sr-only"
                        name="file-upload"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </label>

                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => handleCloseModal()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
