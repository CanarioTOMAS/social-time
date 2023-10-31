import React from 'react';



const RecentOrders = () => {
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
      <h1>Recent Orders</h1>
      <ul>
        {(new Array(10)).fill(0).map((_, id) => (
          <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'
          >
            <div className='bg-purple-100 rounded-lg p-3'>

            </div>
            <div className='pl-4'>
              <p className='text-gray-800 font-bold'>${}</p>
              <p className='text-gray-400 text-sm'>{}</p>
            </div>
            <p className='lg:flex md:hidden absolute right-6 text-sm'>{}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;