"use client"

import AccountSidebar from "@/components/AccountSidebar";
import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "@/context/LoadingContext";
import { AuthContext } from "@/context/AuthContext";

export default function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const [role, setRole] = useState("");
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const [companyError, setCompanyError] = useState({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [users, setUsers] = useState([]);

    const [textId, setTextId] = useState("");
    const [website, setWebsite] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [appLoading, setAppLoading] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        value: "",
    });

    const [company, setCompany] = useState({
        name: "",
        tax_id: "",
        status: "",
        updated_at: "",
        website: ""
    });


    useEffect(() => {
        startLoading()
        fetch(`${baseUrl}user`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                setRole(result.data.role || "")
                if (result.data.company) {
                    setCompany(prev => ({
                        ...prev,
                        name: result.data.company.company,
                        tax_id: result.data.company.tax_id,
                        status: result.data.company.status,
                        updated_at: result.data.company.updated_at,
                        website: result.data.company.website
                    }));
                }

                stopLoading();
            })
            .catch(error => {
                console.error('Error fetching User data:', error);
            });
    },
        []);


    const applyCompany = async (e) => {
        e.preventDefault();

        let errors = validateCompany({
            company_name: companyName,
            tax_id: textId,
            website: website,
        })
        setCompanyError(errors);
        if (Object.keys(errors).length === 0) {
            setAppLoading(true);
            const comOptions = {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    company_name: companyName,
                    tax_id: textId,
                    website: website,
                })
            };
            try {
                const response = await fetch(`${baseUrl}company`, comOptions);
                if (!response.ok) {
                    throw new Error("Company Create Failed");
                }

                const result = await response.json();
                setMessage({
                    type: result.status,
                    value: result.message
                })
            } catch (err) {
                console.error(err)
            } finally {
                setAppLoading(false);
            }
        }
    }

    const handleUser = async (e) => {
        e.preventDefault();
        let errors = validate({ name, email })
        setFormErrors(errors);
        setAppLoading(true);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`${baseUrl}company/user`, {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                    })
                })
                if (!response.ok) {
                    throw new Error("Fecthed Failed User Resgister");
                }

                const result = await response.json();
                setMessage({
                    type: result.status,
                    value: result.message
                })

            } catch (err) {
                console.error(err)
            } finally {
                setAppLoading(false);
            }
        } else {
            setAppLoading(false);
        }
    }


    useEffect(() => {
        const getUsers = async () => {
            startLoading()
            try {
                const response = await fetch(`${baseUrl}company/users`, {
                    method: 'GET',
                    headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
                })

                if (!response.ok) {
                    throw new Error("Get Users Failed")
                }

                const result = await response.json();
                setUsers(result.data)
            } catch (err) {
                console.log(err)
            } finally {
                stopLoading();
            }
        }

        getUsers();
    }, [])

    const validate = (val) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!val.name) {
            errors.name = "Name is required !"
        }
        if (!val.email) {
            errors.email = "Email is required !"
        } else if (!regex.test(val.email)) {
            errors.email = "Email is not valid"
        }

        return errors
    }

    const validateCompany = (val) => {
        const errors = {};
        if (!val.company_name) {
            errors.company = "Company Name is required !";
        }
        if (!val.tax_id) {
            errors.tax_id = "Tax ID is required !";
        }
        if (!val.website) {
            errors.website = "Website is required !";
        }
        return errors;
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
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Apply For Corporate Account</h2>
                                <form onSubmit={applyCompany}>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="cname" className="text-left text-sm font-semibold inline-block w-full mb-2">Company Name</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${companyError?.company ? "border-red-500" : "border-[#E4DFDF]"}`} id="cname" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                            {companyError?.company && <p className="text-sm font-semibold text-red-500 text-left mt-1">{companyError?.company}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="taxId" className="text-left text-sm font-semibold inline-block w-full mb-2">Tax ID</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${companyError?.tax_id ? "border-red-500" : "border-[#E4DFDF]"}`} id="taxId" placeholder="Tax ID" value={textId || ""} onChange={(e) => setTextId(e.target.value)} />
                                            {companyError?.tax_id && <p className="text-sm font-semibold text-red-500 text-left mt-1">{companyError?.tax_id}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="webUrl" className="text-left text-sm font-semibold inline-block w-full mb-2">Website URL</label>
                                            <input type="url" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${companyError?.website ? "border-red-500" : "border-[#E4DFDF]"}`} id="webUrl" placeholder="Website URL" value={website || ""} onChange={(e) => setWebsite(e.target.value)} />
                                            {companyError?.website && <p className="text-sm font-semibold text-red-500 text-left mt-1">{companyError?.website}</p>}
                                        </div>
                                    </div>
                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${appLoading ? "bg-primary/70" : "bg-primary"} mt-2 cursor-pointer`} disabled={appLoading}>
                                        {appLoading ?
                                            <div role="status" className="flex gap-2 items-center justify-center">
                                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                                Please Wait...
                                            </div> :
                                            <span className="relative z-1 flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 mr-2 -rotate-90"><g><path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor"></path><path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor"></path></g></svg>
                                                Submit
                                            </span>
                                        }
                                    </button>
                                    {message?.value && <p className={`text-sm font-semibold ${message?.type ? "text-green-500" : "text-red-500"} text-left mt-4`}>{message?.value}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
