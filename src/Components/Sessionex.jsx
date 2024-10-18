import React, { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '../ReduxToolkit/Slice/User.slice'
import { persistor } from '../ReduxToolkit/Store/Store'
import toast from 'react-hot-toast'

const SessionExpiredPopup = () => {
    const [isVisible, setIsVisible] = useState(true)
    const dispatch = useDispatch()

    const handleRelogin = () => {
        dispatch(logout())
        persistor.purge()
        toast.success('user logged out')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-transparent">
            <div className="bg-gray-800 bg-opacity-90 rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <AlertCircle className="text-red-400 w-6 h-6 mr-2" />
                        <h2 className="text-xl font-bold text-gray-100">Session Expired</h2>
                    </div>
                    <p className="text-gray-300 mb-4">
                        Your login session has expired. Please log in again to continue.
                    </p>
                    <div className="flex justify-end">
                        <button
                            onClick={handleRelogin}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                        >
                            Re-login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionExpiredPopup