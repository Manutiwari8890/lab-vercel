"use client"
import AccountSidebar from "@/components/AccountSidebar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { LoadingContext } from "@/context/LoadingContext";

export default function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const [passTogle, setPassToggle] = useState([false, false, false]);
    const [passError, setPassError] = useState(null);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dname, setDname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [passMessage, setPassMessage] = useState({ type: false, value: "" });
    const [current_password, setCurrentPass] = useState("");
    const [new_password, setNewPass] = useState("");
    const [con_new_password, setConNewPass] = useState("");


    const handleUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${baseUrl}user`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                name: fname,
                last_name: lname,
                display_name: dname,
                email: email
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                setMessage({ type: result?.status, value: result.message })
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        startLoading();
        fetch(`${baseUrl}user`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                setFname(result.data.name || "")
                setLname(result.data.last_name || "")
                setDname(result.data.display_name || "")
                setEmail(result.data.email || "")
                stopLoading();
            })
            .catch(error => {
                console.error('Error fetching menu data:', error);
            });
    },
        []);


    const handlePassword = (e) => {
        e.preventDefault();
        let errors = validate({
            current_password: current_password,
            new_password: new_password,
            new_password_confirmation: con_new_password,
        })
        setPassError(errors);
        if (Object.keys(errors).length === 0) {
            setPassLoading(true);
            fetch(`${baseUrl}user/change-password`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    current_password: current_password,
                    new_password: new_password,
                    new_password_confirmation: con_new_password,
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setPassMessage({
                        type: result.status, value: Array.isArray(result.message?.new_password) && result.message.new_password.length > 0
                            ? result.message.new_password[0]
                            : result.message
                    })

                    setPassLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching menu data:', error);
                });
        }
    }

    const validate = (val) => {
        const errors = {};
        if (!val.current_password) {
            errors.cpass = "Current Password is required !"
        }
        if (!val.new_password) {
            errors.npass = "New Password is required !"
        }
        if (!val.new_password_confirmation) {
            errors.repass = "Confirm New Password is required !"
        } else if (val.new_password !== val.new_password_confirmation) {
            errors.repass = "Confirm Password is not matched !"
        }
        return errors
    }

    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-3xl mx-auto font-semibold uppercase text-dark page-title mb-10 xl:mb-15">My Account</h2>
                    <div className="grid grid-cols-4 gap-5 xl:gap-6">
                        <div className="col-span-1 hidden lg:block">
                            <AccountSidebar />
                        </div>
                        <div className="col-span-4 lg:col-span-3">
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Profile Info</h2>
                                <form onSubmit={(e) => handleUpdate(e)}>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                            <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="fname" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                            <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="lname" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="company" className="text-left text-sm font-semibold inline-block w-full mb-2">Company Name</label>
                                            <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="company" placeholder="Company Name" value={dname} onChange={(e) => setDname(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email Address</label>
                                            <input type="email" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${isLoading ? "bg-primary/70" : "bg-primary"} mt-2 cursor-pointer`} disabled={isLoading}>
                                        {isLoading ?
                                            <div role="status" className="flex gap-2 items-center justify-center">
                                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                                Please Wait...
                                            </div> :
                                            <span className="relative z-1 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-4"><path d="M20.137,24a2.8,2.8,0,0,1-1.987-.835L12,17.051,5.85,23.169a2.8,2.8,0,0,1-3.095.609A2.8,2.8,0,0,1,1,21.154V5A5,5,0,0,1,6,0H18a5,5,0,0,1,5,5V21.154a2.8,2.8,0,0,1-1.751,2.624A2.867,2.867,0,0,1,20.137,24ZM6,2A3,3,0,0,0,3,5V21.154a.843.843,0,0,0,1.437.6h0L11.3,14.933a1,1,0,0,1,1.41,0l6.855,6.819a.843.843,0,0,0,1.437-.6V5a3,3,0,0,0-3-3Z" fill="currentColor" /></svg>
                                                Save Changes
                                            </span>
                                        }
                                    </button>
                                    {message?.value && <p className={`text-sm font-semibold ${message?.type ? "text-green-500" : "text-red-500"} text-left mt-4`}>{message?.value}</p>}
                                </form>
                            </div>
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Update Password</h2>
                                <form onSubmit={(e) => handlePassword(e)}>
                                    <div className="form-group mb-2 relative xl:mb-3">
                                        <label htmlFor="opassword" className="text-left text-sm font-semibold inline-block w-full mb-2">Old Password</label>
                                        <input type={`${passTogle[0] ? "text" : "password"}`} className={`peer w-full border py-4 pr-12 pl-12 text-sm font-semibold focus:border-primary ${passError?.cpass ? "border-red-500" : "border-[#E4DFDF]"}`} id="opassword" placeholder="Old Password" value={current_password} onChange={(e) => setCurrentPass(e.target.value)} />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none" className={`absolute top-[48px] left-[16px] peer-focus:text-primary transition-colors duration-200 ${passError?.cpass ? "text-red-500" : "text-[#807A7A] "}`}>
                                            <path d="M12.8702 7.54742V5.5445C12.8702 3.20014 10.969 1.29891 8.62465 1.29891C6.28029 1.28865 4.37159 3.18055 4.36133 5.52584V5.5445V7.54742" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1794 18.5572H5.0512C3.09772 18.5572 1.51367 16.9741 1.51367 15.0197V11.0185C1.51367 9.06411 3.09772 7.48099 5.0512 7.48099H12.1794C14.1329 7.48099 15.717 9.06411 15.717 11.0185V15.0197C15.717 16.9741 14.1329 18.5572 12.1794 18.5572Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.61586 11.9832V14.0552" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span className="absolute top-[50px] right-[4%] cursor-pointer text-[#3333337a]"
                                            onClick={() => setPassToggle((prev) =>
                                                prev.map((val, index) => (index === 0 ? !val : val))
                                            )}
                                        >
                                            {passTogle[0] ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" id="Outline" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg> :                                        
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor"></path></g></svg>
                                            }
                                        </span>
                                        {passError?.cpass && <p className="text-sm font-semibold text-red-500 text-left mt-1">{passError?.cpass}</p>}
                                    </div>
                                    <div className="form-group mb-2 relative xl:mb-3">
                                        <label htmlFor="npassword" className="text-left text-sm font-semibold inline-block w-full mb-2">New Password</label>
                                        <input type={`${passTogle[1] ? "text" : "password"}`} className={`peer w-full border py-4 pr-12 pl-12 text-sm font-semibold focus:border-primary ${passError?.npass ? "border-red-500" : "border-[#E4DFDF]"}`} id="npassword" placeholder="New Password" value={new_password} onChange={(e) => setNewPass(e.target.value)} />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none" className={`absolute top-[48px] left-[16px] peer-focus:text-primary transition-colors duration-200 ${passError?.npass ? "text-red-500" : "text-[#807A7A] "}`}>
                                            <path d="M12.8702 7.54742V5.5445C12.8702 3.20014 10.969 1.29891 8.62465 1.29891C6.28029 1.28865 4.37159 3.18055 4.36133 5.52584V5.5445V7.54742" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1794 18.5572H5.0512C3.09772 18.5572 1.51367 16.9741 1.51367 15.0197V11.0185C1.51367 9.06411 3.09772 7.48099 5.0512 7.48099H12.1794C14.1329 7.48099 15.717 9.06411 15.717 11.0185V15.0197C15.717 16.9741 14.1329 18.5572 12.1794 18.5572Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.61586 11.9832V14.0552" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span className="absolute top-[50px] right-[4%] cursor-pointer text-[#3333337a]"
                                            onClick={() => setPassToggle((prev) =>
                                                prev.map((val, index) => (index === 1 ? !val : val))
                                            )}
                                        >
                                            {passTogle[1] ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" id="Outline" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg> :                                        
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor"></path></g></svg>
                                            }
                                        </span>
                                        {passError?.npass && <p className="text-sm font-semibold text-red-500 text-left mt-1">{passError?.npass}</p>}
                                    </div>
                                    <div className="form-group mb-2 relative xl:mb-3">
                                        <label htmlFor="cpassword" className="text-left text-sm font-semibold inline-block w-full mb-2">Confirm New Password</label>
                                        <input type={`${passTogle[2] ? "text" : "password"}`} className={`peer w-full border py-4 pr-12 pl-12 text-sm font-semibold focus:border-primary ${passError?.repass ? "border-red-500" : "border-[#E4DFDF]"}`} id="cpassword" placeholder="Confirm New Password" value={con_new_password} onChange={(e) => setConNewPass(e.target.value)} />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none" className={`absolute top-[48px] left-[16px] peer-focus:text-primary transition-colors duration-200 ${passError?.repass ? "text-red-500" : "text-[#807A7A] "}`}>
                                            <path d="M12.8702 7.54742V5.5445C12.8702 3.20014 10.969 1.29891 8.62465 1.29891C6.28029 1.28865 4.37159 3.18055 4.36133 5.52584V5.5445V7.54742" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1794 18.5572H5.0512C3.09772 18.5572 1.51367 16.9741 1.51367 15.0197V11.0185C1.51367 9.06411 3.09772 7.48099 5.0512 7.48099H12.1794C14.1329 7.48099 15.717 9.06411 15.717 11.0185V15.0197C15.717 16.9741 14.1329 18.5572 12.1794 18.5572Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.61586 11.9832V14.0552" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span className="absolute top-[50px] right-[4%] cursor-pointer text-[#3333337a]"
                                            onClick={() => setPassToggle((prev) =>
                                                prev.map((val, index) => (index === 2 ? !val : val))
                                            )}
                                        >
                                            {passTogle[2] ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" id="Outline" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg> :                                        
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor"></path></g></svg>
                                            }                                           </span>
                                        {passError?.repass && <p className="text-sm font-semibold text-red-500 text-left mt-1">{passError?.repass}</p>}
                                    </div>
                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${passLoading ? "bg-primary/70" : "bg-primary"} mt-2 cursor-pointer`} disabled={passLoading}>
                                        {passLoading ?
                                            <div role="status" className="flex gap-2 items-center justify-center">
                                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                                Please Wait...
                                            </div> :
                                            <span className="relative z-1 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5" ><path d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM20,12c0,5.455-6.319,9.033-8,9.889-1.683-.853-8-4.42-8-9.889V6.883A3,3,0,0,1,6.052,4.037L12,2.054l5.948,1.983A3,3,0,0,1,20,6.883Z" fill="currentColor" /><path d="M15.3,8.3,11.112,12.5,8.868,10.16a1,1,0,1,0-1.441,1.386l2.306,2.4a1.872,1.872,0,0,0,1.345.6h.033a1.873,1.873,0,0,0,1.335-.553l4.272-4.272A1,1,0,0,0,15.3,8.3Z" fill="currentColor" /></svg>
                                                Update Password
                                            </span>
                                        }
                                    </button>
                                    {passMessage?.value && <p className={`text-sm font-semibold ${passMessage?.type ? "text-green-500" : "text-red-500"} text-left mt-4`}>{passMessage?.value}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
