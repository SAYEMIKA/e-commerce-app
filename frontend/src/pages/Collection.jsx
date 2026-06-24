import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Tittle';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch  } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavan')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      const lowerCategories = category.map(c => c.toLowerCase());
      productsCopy = productsCopy.filter(item => lowerCategories.includes(item.category.toLowerCase()));
    }

    if (subCategory.length > 0) {
      const lowerSubCategories = subCategory.map(sc => sc.toLowerCase());
      productsCopy = productsCopy.filter(item => lowerSubCategories.includes(item.subCategory.toLowerCase()));
    }
   
    setFilterProducts(productsCopy);

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high' :
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
          break;

        default:
          applyFilter();
          break;
    }    
  }

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} checked={category.includes('Men')} /> Pria
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} checked={category.includes('Women')} /> Wanita
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Anak'} onChange={toggleCategory} checked={category.includes('Anak')} /> Anak-anak
            </p>
          </div>
        </div>
        {/* Subcategory filter */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Atasan'} onChange={toggleSubCategory} checked={subCategory.includes('Atasan')} /> Atasan
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bawahan'} onChange={toggleSubCategory} checked={subCategory.includes('Bawahan')} /> Bawahan
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Gamis'} onChange={toggleSubCategory} checked={subCategory.includes('Gamis')} /> Gamis Set
            </p>
          </div>
        </div>
       </div>
      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'SEMUA'} text2={'KOLEKSI'} />
          {/* Product Sort*/}
         <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: relevant</option>
            <option value="low-high">Sort by: low-high</option>
            <option value="high-low">Sort by: high-low</option>
          </select>
        </div>

        {/* Map Products */}
        {filterProducts.length === 0 ? (
          <p className="col-span-full text-center py-8 text-gray-500">Tidak ada produk yang ditemukan untuk filter ini.</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item,index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))
            }
          </div>
        )}

      </div>

    </div>
  )
}

export default Collection