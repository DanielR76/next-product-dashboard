'use client';

import { useMemo } from 'react';

import { endpoints } from '@services';
import { useGetData } from '@hooks';
import { Chart } from '@molecules';
import { productModel } from '@models';
import { Product } from '@types';

const PRD_LIMIT = 5;
const PRD_OFFSET = 5;

export default function Dashboard() {
  const {
    data: products,
    isFetching,
    isLoading,
  } = useGetData<Product[]>({
    queryKey: ['list-products'],
    url: endpoints.products.getListOfProducts(PRD_LIMIT, PRD_OFFSET),
  });

  const categoryList = useMemo(
    () => products?.map((product) => productModel(product).category),
    [products],
  );

  const categoryNames = useMemo(
    () => categoryList?.map((category) => category.name),
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
    </>
  );
}
