import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams()
    const [verificationStatus, setVerificationStatus] = useState('verifying')

    const success = searchParams.get("success")
    const appointmentId = searchParams.get("appointmentId")

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    // Function to verify stripe payment
    const verifyStripe = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/verifyStripe", 
                { success, appointmentId }, 
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                setVerificationStatus('success')
            } else {
                toast.error(data.message)
                setVerificationStatus('error')
            }

            // Navigate after a short delay to show feedback
            setTimeout(() => {
                navigate("/my-appointments")
            }, 2000)

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            console.log(error)
            setVerificationStatus('error')
            
            setTimeout(() => {
                navigate("/my-appointments")
            }, 3000)
        }
    }

    useEffect(() => {
        if (token && appointmentId && success) {
            verifyStripe()
        } else {
            toast.error("Missing required parameters for verification")
            setVerificationStatus('error')
            
            setTimeout(() => {
                navigate("/my-appointments")
            }, 2000)
        }
    }, [token])

    const renderContent = () => {
        switch(verificationStatus) {
            case 'success':
                return (
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Verified!</h2>
                        <p className="text-gray-600">Your appointment has been confirmed.</p>
                        <p className="text-gray-500 mt-2">Redirecting to your appointments...</p>
                    </div>
                )
            case 'error':
                return (
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-700 mb-2">Verification Failed</h2>
                        <p className="text-gray-600">There was an issue verifying your payment.</p>
                        <p className="text-gray-500 mt-2">Redirecting to your appointments...</p>
                    </div>
                )
            default:
                return (
                    <div className="text-center">
                        <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">Verifying Payment</h2>
                        <p className="text-gray-600">Please wait while we verify your payment details.</p>
                    </div>
                )
        }
    }

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                {renderContent()}
            </div>
        </div>
    )
}

export default Verify