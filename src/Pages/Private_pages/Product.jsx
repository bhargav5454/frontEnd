import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addproduct, deleteProduct, fetchProduct } from '../../ReduxToolkit/Slice/Product.slice'
import { Edit, Trash2, X } from 'lucide-react'
import './Product.css'

const Product = () => {
    const [formData, setFormData] = useState({})
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const dispatch = useDispatch()
    const { product } = useSelector((state) => state.productData)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEditChange = (e) => {
        setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addproduct({ endpoint: '/product/create', payload: formData }))
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        // dispatch(updateProduct({ endpoint: `/product/update/${editingProduct.id}`, payload: editingProduct }))
        setEditModalOpen(false)
    }

    const openEditModal = (product) => {
        setEditingProduct(product)
        setEditModalOpen(true)
    }

    const getProductData = () => {
        dispatch(fetchProduct({ endpoint: '/product/getAll' }))
    }

    const handleDelete = (productId) => {
        console.log("🚀 ~ handleDelete ~ productId:", productId)
        dispatch(deleteProduct({ endpoint: `/product/delete`, productId }))
    }
    useEffect(() => {
        getProductData()
    }, [dispatch])

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <h1 className="text-3xl font-bold mb-6">Product Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Product Form */}
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="space-y-6 border-2 border-gray-300 rounded-lg p-6 bg-white shadow-sm">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="mt-1 block w-full rounded-md p-2 px-3 border border-black shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows="3"
                                className="mt-1 block w-full rounded-md p-2 px-3 border resize-none border-black shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                className="mt-1 block w-full rounded-md p-2 px-3 border  border-black shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                id="category"
                                className="mt-1 block w-full rounded-md p-2 px-3 border border-black shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home-appliances">Home Appliances</option>
                                <option value="books">Books</option>
                                <option value="toys">Toys</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="mt-1 block w-full rounded-md p-2 px-3 border  border-black shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>

                {/* Product Display */}
                <div className="md:col-span-2">
                    {product?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product?.map((item, ind) => (
                                <Fragment key={ind}>
                                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                                        <div className="relative mb-4">
                                            <div className="absolute top-4 right-4 flex space-x-2">
                                                <button
                                                    className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-white"
                                                    aria-label="Edit Product"
                                                    onClick={() => openEditModal(item)}
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-white"
                                                    aria-label="Delete Product"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        {/* Product details */}
                                        <div className="flex flex-col gap-2">
                                            <p className="text-lg font-bold">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                            <p className="text-sm text-gray-500">Category: {item.category}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-2xl font-bold mt-4">${item.price.toFixed(2)}</p>
                                            <button className="text-white bg-gray-700 hover:bg-green-600 rounded-lg text-sm px-4 py-2 mt-3">Add to cart</button>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white border border-gray-200 rounded-lg">
                            <p className="text-gray-500">No product added yet. Use the form to add a new product.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-transform duration-300 scale-95 opacity-0 animate-modalIn border-2 border-gray-600 ">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold">Edit Product</h2>
                            <button onClick={() => setEditModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 " >
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="edit-name"
                                        value={editingProduct.name}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-3 text-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        id="edit-description"
                                        rows="3"
                                        value={editingProduct.description}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-3 text-lg"
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="edit-price"
                                        value={editingProduct.price}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-3 text-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        name="category"
                                        id="edit-category"
                                        value={editingProduct.category}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-3 text-lg"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="home-appliances">Home Appliances</option>
                                        <option value="books">Books</option>
                                        <option value="toys">Toys</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="edit-quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="edit-quantity"
                                        value={editingProduct.quantity}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-3 text-lg"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </div>
    )
}

export default Product