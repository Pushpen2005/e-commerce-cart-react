import React from 'react'
import { useContext } from 'react'
import { getData } from '../context/DataContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const {data,fetchAllProducts} = getData();
    const navigate = useNavigate();

    const getUniqueCategory = (data, property) => {
        let newVA1 = data?.map((curElem) => {
            return curElem[property]
        })
        newVA1 = [...new Set(newVA1)]
        return newVA1
    }
    const categoryOnlyData = getUniqueCategory(data, "category")
    console.log(categoryOnlyData);
    

    useEffect(() => {
        fetchAllProducts();
    }, []);

  return (
    <div className='bg-[#101829]'>
       <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4'>
        {
            categoryOnlyData?.map((item, index)=>{
                return <div key={index}>
                    <button onClick={()=>navigate(`/products?category=${item}`)} className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>{item}</button>
                </div>
            })
        }
       </div>
    </div>
  )
}

export default Category
