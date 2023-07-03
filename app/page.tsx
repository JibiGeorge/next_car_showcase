"use client"

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components/Index'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home({ searchParams }: any) {

  const [allCars, setAllCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const [fuel, setFuel] = useState<string>("");
  const [year, setYear] = useState<number>(2022);

  const [limit, setLimit] = useState<number>(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2023,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || ''
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => <CarCard car={car} />)}
            </div>
            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image
                  src="/loader.svg"
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain' />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit} />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  )
}