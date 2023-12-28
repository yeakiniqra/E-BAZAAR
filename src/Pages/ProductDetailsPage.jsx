import React from 'react'
import { Link } from 'react-router-dom'

function ProductDetailsPage() {
  return (
    <div className="mt-20 rounded-2xl p-6 py-12 bg-violet-400 text-gray-900">
	<div className="container mx-auto">
		<div className="flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-6xl tracki font-bold">Up to
				<span className="flex">50% Off </span>
			</h2>
			<div className="space-x-2 text-center py-2 lg:py-0">
				<span className='text-gray-800' >Plus free shipping! Use code:</span>
				<span className="font-bold text-lg">IQRA</span>
			</div>
			<Link to="/products" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 text-gray-900 border-gray-400">Shop Now</Link>
		</div>
	</div>
</div>
  )
}

export default ProductDetailsPage
