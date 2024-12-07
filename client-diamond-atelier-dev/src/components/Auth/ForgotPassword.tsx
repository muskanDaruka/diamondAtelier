import React from "react";

function ForgotPassword() {
    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen rounded-lg">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl max-h-2xl bg-white p-4 rounded-lg shadow-md">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="grid gap-3 mb-5">
                                    <div className="mb-5 text-center">
                                        <a href="#!" className="text-decoration-none">
                                            <div className="text-3xl my-4 text-blue-500">DIAMOND ATELIER</div>
                                        </a>
                                    </div>
                                    <div className="text-center text-secondary m-0 md:px-5">
                                        <h2 className="text-lg font-normal text-center">Provide the email address associated with your account to recover your password.</h2>
                                    </div>
                                </div>
                                <form action="#!">
                                    <div className="grid gap-3 md:gap-4">
                                        <div>
                                            <label htmlFor="email" className="form-label">Email <span className="text-red-500">*</span></label>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                                    </svg>
                                                </span>
                                                <input type="email" className="form-control flex-1 min-w-0 block w-full px-3 py-1.5 border border-gray-300 rounded-r-md" name="email" id="email" required />
                                            </div>
                                        </div>
                                        <div >
                                            <div>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full" type="submit">Reset Password</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <hr className="mt-5 mb-4 border-t border-gray-300" />
                                <div className="flex gap-4 justify-center">
                                    <a href="/" className="text-gray-500 hover:text-gray-700">Log In</a>
                                    <a href="./sign-up" className="text-gray-500 hover:text-gray-700">Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
