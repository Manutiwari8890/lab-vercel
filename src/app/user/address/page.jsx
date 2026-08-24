"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import AccountSidebar from "@/components/AccountSidebar";
import SearchSelect from "@/components/SearchSelect";
import { OverlayContext } from "@/context/OverlayContext";
import { LoadingContext } from "@/context/LoadingContext";
import { AuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function Page() {
    const { overlay, toggleOverlay } = useContext(OverlayContext);
    const [addShip, setAddShip] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { startLoading, stopLoading, loading } = useContext(LoadingContext);
    const { showToast } = useToast();
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const [inLoading, setInLoading] = useState(false);
    const [upLoading, setUpLoading] = useState(false);
    const [billLoading, setBillLoading] = useState(false);
    const [adds, setAdds] = useState([]);
    const [currentError, setCurrentError] = useState({});
    const [billErrors, setBillErrors] = useState({});
    const [shipErrors, setShipErrors] = useState({});
    const [address_fname, setAfname] = useState("");
    const [address_lname, setAlname] = useState("");
    const [address_email, setAemail] = useState("");
    const [address_phone, setAphone] = useState("");
    const [address_address, setAaddress] = useState("");
    const [address_address2, setAaddress2] = useState("");
    const [address_country, setAcountry] = useState("United States");
    const [address_city, setAcity] = useState("");
    const [address_postcode, setApostCode] = useState("");
    const [address_state, setAstate] = useState("");
    const [shipping_residential, setSresident] = useState(false);
    const [refreshAddresses, setRefreshAddresses] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [billingAdd, setBillingAdd] = useState({
        billing_first_name: "",
        billing_last_name: "",
        billing_email: "",
        billing_phone: "",
        billing_address_1: "",
        billing_address_2: "",
        billing_city: "",
        billing_country: "United States",
        billing_postcode: "",
        billing_state: "",
    });
    const [currentAdd, setCurrentAdd] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address_1: "",
        city: "",
        country: "United States",
        postcode: "",
        state: "",
    });

    const handleCurrent = (e) => {
        const { name, value } = e.target;
        setCurrentAdd(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleBilling = (e) => {
        const { name, value } = e.target;
        setBillingAdd((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const states = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
    ];


    const handleAddress = (e) => {
        e.preventDefault();
        setInLoading(true);

        const customerDetails = {
            type: "shipping",
            first_name: address_fname,
            last_name: address_lname,
            email: address_email,
            phone: address_phone,
            address_1: address_address,
            address_2: address_address2,
            city: address_city,
            country: address_country,
            postcode: address_postcode,
            state: address_state,
            is_default: true,
            shipping_residential : shipping_residential,
        }

        const errors = shippingFormValidate(customerDetails);
        setShipErrors(errors)

        if (Object.keys(errors).length === 0) {

            fetch(`${baseUrl}user/addresses`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
                body: JSON.stringify(customerDetails)
            }).then((response) => {
                return response.json().then((data) => ({
                    status: response.status,
                    body: data,
                }))
            }).then(({ status, body }) => {
                setAddShip(false)
                if (!body.status) throw new Error(body.message)
                showToast(body?.message, body.status ? "success" : "warning")
                setRefreshAddresses(prev => !prev);
                setInLoading(false);
            }).catch((err) => {
                console.error("Validation error: " + err.message);
            })
        } else {
            setInLoading(false);
        }
    }

    const updateAdd = (e) => {
        e.preventDefault();
        const id = currentAdd.id;
        const customerDetails = {
            type: "shipping",
            first_name: currentAdd.first_name,
            last_name: currentAdd.last_name,
            email: currentAdd.email,
            phone: currentAdd.phone,
            address_1: currentAdd.address_1,
            city: currentAdd.city,
            country: currentAdd.country,
            postcode: currentAdd.postcode,
            state: currentAdd.state,
            is_default: true,
            shipping_residential : true
        }

        const errors = shippingFormValidate(customerDetails);
        setCurrentError(errors)
        if(Object.keys(errors).length === 0){
            setUpLoading(true);
            const getOptions = {
                method: "PUT",
                headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
                body: JSON.stringify(customerDetails)
            };
            fetch(`${baseUrl}user/addresses/${id}`, getOptions).then(
                (response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                }).then(({ status, body }) => {
                    showToast(body?.message, body.status ? "success" : "warning")
                    setRefreshAddresses(prev => !prev);
                    viewAdd()
                }).catch((err) => {
                    console.error("Validation error: " + err.message);
                }).finally(() => {
                    setUpLoading(false);
            })
        }
    }


    const shippingFormValidate = (val) => {
        const shippingError = {}

        if (!val.first_name) {
            shippingError.fname = "The first name field is required."
        }
        if (!val.last_name) {
            shippingError.lname = "The last name field is required."
        }
        if (!val.email) {
            shippingError.email = "The email field is required."
        }
        if (!val.phone) {
            shippingError.phone = "The phone field is required."
        }
        if (!val.address_1) {
            shippingError.address = "The address field is required."
        }
        if (!val.city) {
            shippingError.city = "The city field is required."
        }
        if (!val.country) {
            shippingError.country = "The country field is required."
        }
        if (!val.postcode) {
            shippingError.postcode = "The postcode field is required."
        }
        if (!val.state) {
            shippingError.state = "The state field is required."
        }
        if (!val.shipping_residential) {
            shippingError.resdetial = "We donot ship to residential address. Please confirm your given address is not residential address"
        }

        return shippingError
    }

    const billingFormValidate = (val) => {
        const billingError = {}
        if (!val.billing_first_name) {
            billingError.fname = "The first name field is required."
        }
        if (!val.billing_last_name) {
            billingError.lname = "The last name field is required."
        }
        if (!val.billing_email) {
            billingError.email = "The email field is required."
        }
        if (!val.billing_phone) {
            billingError.phone = "The phone field is required."
        }
        if (!val.billing_address_1) {
            billingError.address = "The address field is required."
        }
        if (!val.billing_city) {
            billingError.city = "The city field is required."
        }
        if (!val.billing_country) {
            billingError.country = "The country field is required."
            console.log(val.billing_country)
        }
        if (!val.billing_postcode) {
            billingError.postcode = "The postcode field is required."
        }
        if (!val.billing_state) {
            billingError.state = "The state field is required."
        }

        return billingError
    }


    useEffect(() => {
        const fetchAddress = async () => {
            startLoading();
            const getOptions = {
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
            };

            try {
                const response = await fetch(`${baseUrl}user/addresses`, getOptions); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setAdds(data.data);
            } catch (err) {
                console.error(err.message);
            } finally {
                stopLoading();
            }
        };
        fetchAddress();

    }, [refreshAddresses]); 

    function deleteAdd(id) {
        setIsDelete(id);
        fetch(`${baseUrl}user/addresses/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
        }).then((response) => {
            return response.json().then((data) => ({
                status: response.status,
                body: data,
            }))
        }).then(({ status, body }) => {
            showToast(body?.message, body.status ? "error" : "warning")
            setIsDelete(false)
            setRefreshAddresses(prev => !prev);
        }).catch((err) => {
            console.error("Validation error: " + err.message);
        })
    }


    function viewAdd(addId) {
        if (addId) {
            const current = adds.find(item => item.id === addId);
            setCurrentAdd(prev => ({ ...prev, ["id"]: current.id }))
            setCurrentAdd(prev => ({ ...prev, ["type"]: current.type }))
            setCurrentAdd(prev => ({ ...prev, ["first_name"]: current.first_name }))
            setCurrentAdd(prev => ({ ...prev, ["last_name"]: current.last_name }))
            setCurrentAdd(prev => ({ ...prev, ["email"]: current.email }))
            setCurrentAdd(prev => ({ ...prev, ["phone"]: current.phone }))
            setCurrentAdd(prev => ({ ...prev, ["address_1"]: current.address_1 }))
            setCurrentAdd(prev => ({ ...prev, ["country"]: current.country }))
            setCurrentAdd(prev => ({ ...prev, ["state"]: current.state }))
            setCurrentAdd(prev => ({ ...prev, ["postcode"]: current.postcode }))
            setCurrentAdd(prev => ({ ...prev, ["city"]: current.city }))

            document.documentElement.style.overflow = "hidden";
            toggleOverlay("Edit Add");
        } else {
            document.documentElement.style.overflow = "auto";
            toggleOverlay(null);
        }
        setCurrentError(null)
    }

    useEffect(() => {
        const getBillAdd = async () => {
            startLoading();

            const getOptions = {
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
            };

            try {
                const response = await fetch(`${baseUrl}user/address`, getOptions); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setBillingAdd({
                    billing_first_name: data.data?.billing_first_name || "",
                    billing_last_name: data.data?.billing_last_name || "",
                    billing_email: data.data?.billing_email || "",
                    billing_phone: data.data?.billing_phone || "",
                    billing_address_1: data.data?.billing_address_1 || "",
                    billing_address_2: data.data?.billing_address_2 || "",
                    billing_city: data.data?.billing_city || "",
                    billing_country: data.data?.billing_country || "United States",
                    billing_postcode: data.data?.billing_postcode || "",
                    billing_state: data.data?.billing_state || "",
                });
            } catch (err) {
                console.error(err.message);
            } finally {
                stopLoading();
            }
        };

        getBillAdd();

    }, [refreshAddresses]); // Re-run effect when slug changes

    const updateBillAdd = async (e) => {
        e.preventDefault();
        const errors = billingFormValidate(billingAdd);
        setBillErrors(errors)
        if (Object.keys(errors).length === 0) {
            setBillLoading(true);
            try {
                const response = await fetch(`${baseUrl}user/address/billing`, {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
                    body: JSON.stringify(billingAdd)
                })

                if (!response.ok) {
                    throw new Error("Update Bill Failed")
                }
                const result = await response.json();
                if (result) {
                    showToast(result.message, result.status ? "success" : "warning")
                }
            } catch (err) {
                console.error(err)
            } finally {
                setBillLoading(false)
            }
        }
    }

    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">My Account</h2>
                    <div className="grid grid-cols-4 gap-5 xl:gap-6">
                        <div className="col-span-1 hidden lg:block">
                            <AccountSidebar />
                        </div>
                        <div className="col-span-4 lg:col-span-3">
                            {overlay === "Edit Add" &&
                                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] max-w-[800px] max-h-screen w-full h-auto overflow-auto">
                                    <div className=" mx-auto bg-white py-4 px-8 modal">
                                        <form onSubmit={(e) => updateAdd(e)}>
                                            <h2 className="text-xl font-semibold text-dark page-title mb-5">Edit Address</h2>
                                            <div className="grid grid-cols-3 gap-2 gap-x-4">
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.fname ? "border-red-500" : "border-[#afafaf]"}`} id="fname" name="first_name" placeholder="Your First Name" value={currentAdd.first_name} onChange={handleCurrent} />
                                                    {currentError?.fname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.fname}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.lname ? "border-red-500" : "border-[#afafaf]"}`} id="lname" name="last_name" placeholder="Your Last Name" value={currentAdd.last_name} onChange={handleCurrent} />
                                                    {currentError?.lname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.lname}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                                    <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.email ? "border-red-500" : "border-[#afafaf]"}`} id="email" name="email" placeholder="Your Email" value={currentAdd.email} onChange={handleCurrent} />
                                                    {currentError?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.email}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                                    <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.phone ? "border-red-500" : "border-[#afafaf]"}`} id="tel" name="phone" placeholder="Your Contact Number" value={currentAdd.phone} onChange={handleCurrent} />
                                                    {currentError?.phone && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.phone}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="address1" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 1</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.address ? "border-red-500" : "border-[#afafaf]"}`} id="address1" name="address_1" placeholder="Address Line 1" value={currentAdd.address_1} onChange={handleCurrent} />
                                                    {currentError?.address && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.address}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="address2" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 2 (Optional)</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="address2" name="address_2" placeholder="Address Line 2" value={currentAdd.address_2} onChange={handleCurrent} />
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="country" className="text-left text-sm font-semibold inline-block w-full mb-2">Country</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.country ? "border-red-500" : "border-[#afafaf]"}`} id="country" name="country" placeholder="Country" value={currentAdd.country} readOnly />
                                                    {currentError?.country && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.country}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="cstate" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                                    <SearchSelect
                                                        classes={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary placeholder:text-black/80 ${currentError?.state ? "border-red-500" : "border-[#afafaf]"}`}
                                                        placeholder={states.find((s) => s.value === currentAdd.state)?.label || "Select State"}
                                                        name="state"
                                                        id="cstate"
                                                        value={states.find((s) => s.value === currentAdd.state)?.value}
                                                        data={states}
                                                        onSelect={(cat) => {
                                                            setBillingAdd({...currentAdd, state:cat});
                                                        }}
                                                    />
                                                    {currentError?.state && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.state}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="city" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.city ? "border-red-500" : "border-[#afafaf]"}`} id="city" name="city" placeholder="City" value={currentAdd.city} onChange={handleCurrent} />
                                                    {currentError?.city && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.city}</p>}
                                                </div>
                                                <div className="form-group mb-2 relative">
                                                    <label htmlFor="postcode" className="text-left text-sm font-semibold inline-block w-full mb-2">Postcode</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${currentError?.postcode ? "border-red-500" : "border-[#afafaf]"}`} id="postcode" name="postcode" placeholder="Post Code" value={currentAdd.postcode} onChange={handleCurrent} />
                                                    {currentError?.postcode && <p className="text-sm font-semibold text-red-500 text-left mt-1">{currentError?.postcode}</p>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2 ">
                                                <button className={`text-sm font-bold uppercase text-white btn btn-primary py-4 px-5 btn-scale-0  mr-2 cursor-pointer ${upLoading ? "bg-primary/70" : "bg-primary"}`} disabled={upLoading}>
                                                    {upLoading ?
                                                        <div role="status" className="flex gap-2 items-center justify-center">
                                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                                            Please Wait...
                                                        </div> :
                                                        <span className="relative z-1 flex gap-2 items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 mr-2 -rotate-90">
                                                                <g>
                                                                    <path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor" />
                                                                    <path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor" />
                                                                </g>
                                                            </svg>
                                                            Submit
                                                        </span>
                                                    }
                                                </button>
                                                <button className="text-sm font-bold uppercase text-white btn btn-secondary py-4 px-5 bg-secondary btn-scale-0 cursor-pointer" 
                                                    type="button"
                                                    onClick={() => viewAdd()}
                                                >
                                                    <span className="relative z-1 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 relative z-1"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                                        Close
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                            <div className="bg-[#fff] shadow-sm  py-4 px-3 mb-5 md:px-5 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-5">Shipping Address & Billing Address</h2>
                                <div className="overflow-x-scroll lg:overflow-x-hidden">
                                    <table className="text-base font-semibold text-dark w-max lg:w-full">
                                        {adds?.length > 0 ?
                                            <>
                                                <thead className="text-sm md:text-base xl:text-lg">
                                                    <tr className="bg-primary text-white">
                                                        <th scope="col" className="font-semibold px-2 py-3  text-left md:py-4 md:px-3">Sr. No.</th>
                                                        <th scope="col" className="font-semibold py-3 px-2 text-center md:py-4 md:px-3">Name</th>
                                                        <th scope="col" className="font-semibold py-3 px-2 text-center md:py-4 md:px-3">Address</th>
                                                        <th scope="col" className="font-semibold py-3 px-2 text-center md:py-4 md:px-3">City</th>
                                                        <th scope="col" className="font-semibold py-3 px-2 md:py-4 md:px-3">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-base xl:text-lg">
                                                    {adds?.map((add, index) => (
                                                        <tr className="border-b border-gray-300 last:border-0" key={add?.id}>
                                                            <td className="py-4 px-3">
                                                                {index+1}.
                                                            </td>
                                                            <td className="py-4 px-3 text-center">
                                                                {add.first_name}
                                                            </td>
                                                            <td className="py-4 px-3 text-center">
                                                                <div className="flex gap-1 items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-4 h-4 text-primary"><path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor"></path><path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor"></path></svg>
                                                                    {add.address_1}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-3 text-center">
                                                                {add.city}
                                                            </td>
                                                            <td className="py-4 px-3 text-center">
                                                                <button className="px-3 py-1 text-xs font-semibold mr-2 bg-primary text-white uppercase cursor-pointer hover:bg-primary/70" onClick={() => viewAdd(add.id)} aria-label="Edit Add" >
                                                                    Edit
                                                                </button>
                                                                <button className="px-3 py-1 text-xs font-semibold bg-secondary text-white uppercase cursor-pointer hover:bg-secondary/70 inline-flex gap-1 items-center" 
                                                                    onClick={
                                                                        () =>  deleteAdd(add.id)
                                                                    } 
                                                                aria-label="Delete Add" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="text-white w-3 h-3"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" fill="currentColor" /><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" fill="currentColor" /><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" fill="currentColor" /></svg>
                                                                    {isDelete===add.id ? "Deleting..." : "Delete"}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    
                                                </tbody>
                                            </> :
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                                                        <p className="text-base font-semibold text-gray-400">Your orders will appear here once you make a purchase.</p>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        }
                                        
                                    </table>
                                </div>

                            </div>
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <form onSubmit={updateBillAdd}>
                                    <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Your Billing Address</h2>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.fname ? "border-red-500" : "border-[#afafaf] "}`} id="fname" name="billing_first_name" placeholder="Your First Name" value={billingAdd?.billing_first_name || ""} onChange={handleBilling} />
                                            {billErrors?.fname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.fname}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.lname ? "border-red-500" : "border-[#afafaf] "}`} id="lname" name="billing_last_name" placeholder="Your Last Name"  value={billingAdd?.billing_last_name || ""} onChange={handleBilling} />
                                            {billErrors?.lname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.lname}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                            <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.email ? "border-red-500" : "border-[#afafaf] "}`} id="email" name="billing_email" placeholder="Your Email" value={billingAdd?.billing_email || ""} onChange={handleBilling} />
                                            {billErrors?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.email}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                            <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.phone ? "border-red-500" : "border-[#afafaf] "}`} id="tel" name="billing_phone" placeholder="Your Contact Number" value={billingAdd?.billing_phone || ""} onChange={handleBilling} />
                                            {billErrors?.phone && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.phone}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="address1" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 1</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.address ? "border-red-500" : "border-[#afafaf] "}`} id="address1" name="billing_address_1" placeholder="Address Line 1" value={billingAdd?.billing_address_1 || ""} onChange={handleBilling} />
                                            {billErrors?.address && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.address}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="address2" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 2 (Optional)</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="address2" name="billing_address_2" placeholder="Address Line 2" value={billingAdd?.billing_address_2 || ""} onChange={handleBilling} />
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="country" className="text-left text-sm font-semibold inline-block w-full mb-2">Country</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.country ? "border-red-500" : "border-[#afafaf] "}`} id="country" name="billing_country" placeholder="Country" value={billingAdd?.billing_country || "United States"} readOnly />
                                            {billErrors?.country && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.country}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            {!loading &&
                                                <>
                                                    <label htmlFor="state" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                                    <SearchSelect
                                                        classes={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary placeholder:text-black/80 ${billErrors?.state ? "border-red-500" : "border-[#afafaf]"}`}
                                                        placeholder={states.find((s) => s.value === billingAdd?.billing_state)?.label || "Select State"}
                                                        name="billing_state"
                                                        id="state"
                                                        value={states.find((s) => s.value === billingAdd?.billing_state)?.value}
                                                        data={states}
                                                        onSelect={(cat) => {
                                                            setBillingAdd({...billingAdd, billing_state:cat});
                                                        }}
                                                    />
                                                </>
                                            }
                                                {billErrors?.state && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.state}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="city" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.city ? "border-red-500" : "border-[#afafaf] "}`} id="city" name="billing_city" placeholder="City" value={billingAdd?.billing_city || ""} onChange={handleBilling} />
                                            {billErrors?.city && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.city}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="postcode" className="text-left text-sm font-semibold inline-block w-full mb-2">Postcode</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.postcode ? "border-red-500" : "border-[#afafaf] "}`} id="postcode" name="billing_postcode" placeholder="Post Code" value={billingAdd?.billing_postcode || ""} onChange={handleBilling} />
                                            {billErrors?.postcode && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.postcode}</p>}
                                        </div>
                                    </div>
                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${billLoading ? "bg-primary/70" : "bg-primary"} mt-2 cursor-pointer`} disabled={billLoading}>
                                        {billLoading ?
                                            <div role="status" className="flex gap-2 items-center justify-center">
                                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                                Please Wait...
                                            </div> :
                                            <span className="relative z-1 flex gap-2 items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 mr-2 -rotate-90">
                                                    <g>
                                                        <path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor" />
                                                        <path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor" />
                                                    </g>
                                                </svg>
                                                Submit
                                            </span>
                                        }
                                    </button>
                                </form>
                            </div>
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <AnimatePresence mode="wait">
                                    {addShip ?
                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            viewport={{ once: true, amount: 0.2 }}
                                        >
                                            <form onSubmit={handleAddress}>
                                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Your Shipping Address</h2>
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-2 xl:gap-y-4">
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.fname ? "border-red-500" : "border-[#afafaf] "}`} id="fname" placeholder="Your First Name" value={address_fname} onChange={(e) => setAfname(e.target.value)} />
                                                        {shipErrors?.fname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.fname}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.lname ? "border-red-500" : "border-[#afafaf] "}`} id="lname" placeholder="Your Last Name" value={address_lname} onChange={(e) => setAlname(e.target.value)} />
                                                        {shipErrors?.lname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.lname}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                                        <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.email ? "border-red-500" : "border-[#afafaf] "}`} id="email" placeholder="Your Email" value={address_email} onChange={(e) => setAemail(e.target.value)} />
                                                        {shipErrors?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.email}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                                        <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.phone ? "border-red-500" : "border-[#afafaf] "}`} id="tel" placeholder="Your Contact Number" value={address_phone} onChange={(e) => setAphone(e.target.value)} />
                                                        {shipErrors?.phone && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.phone}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="address1" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 1</label>
                                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.address ? "border-red-500" : "border-[#afafaf] "}`} id="address1" placeholder="Address Line 1" value={address_address} onChange={(e) => setAaddress(e.target.value)} />
                                                        {shipErrors?.address && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.address}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="address2" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 2 (Optional)</label>
                                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="address2" placeholder="Address Line 2" value={address_address2} onChange={(e) => setAaddress2(e.target.value)} />
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="country" className="text-left text-sm font-semibold inline-block w-full mb-2">Country</label>
                                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.country ? "border-red-500" : "border-[#afafaf] "}`} id="country" placeholder="Country" value={address_country} readOnly />
                                                        {shipErrors?.country && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.country}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="state" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                                        <SearchSelect
                                                            classes={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary placeholder:text-black/80 ${shipErrors?.state ? "border-red-500" : "border-[#afafaf]"}`}
                                                            placeholder="Select State"
                                                            name="shipping_state"
                                                            id="sstate"
                                                            value={states.find((s) => s.value === address_state)?.value}
                                                            data={states}
                                                            onSelect={(cat) => {
                                                                setAstate(cat);
                                                            }}
                                                        />
                                                        {shipErrors?.state && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.state}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="city" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.city ? "border-red-500" : "border-[#afafaf] "}`} id="city" placeholder="City" value={address_city} onChange={(e) => setAcity(e.target.value)} />
                                                        {shipErrors?.city && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.city}</p>}
                                                    </div>
                                                    <div className="form-group mb-3 relative">
                                                        <label htmlFor="postcode" className="text-left text-sm font-semibold inline-block w-full mb-2">Postcode</label>
                                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${shipErrors?.postcode ? "border-red-500" : "border-[#afafaf] "}`} id="postcode" placeholder="Post Code" value={address_postcode} onChange={(e) => setApostCode(e.target.value)} />
                                                        {shipErrors?.postcode && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.postcode}</p>}
                                                    </div>
                                                    <div className="form-group col-span-2 mb-3">
                                                        <div className="flex items-start">
                                                            <input id="shipDiff" type="checkbox" className="w-4 h-4 mt-1 accent-primary rounded-sm" checked={shipping_residential} onChange={() => setSresident(!shipping_residential)} />
                                                            <label htmlFor="shipDiff" className="ms-2 flex-1 text-sm font-medium text-justify cursor-pointer">Given address is not residential address</label>
                                                        </div>
                                                        {shipErrors?.resdetial && <p className="text-sm font-semibold text-red-500 text-left mt-1">{shipErrors?.resdetial}</p>}                                                    
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary py-4 px-5 btn-scale-0  mr-2 cursor-pointer ${inLoading ? "bg-primary/70" : "bg-primary"}`} disabled={inLoading}>
                                                        <span className="relative z-1 flex gap-1 items-center justify-center">
                                                            {inLoading ?
                                                                <div role="status" className="flex gap-2 items-center justify-center">
                                                                    <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                                                    Please Wait...
                                                                </div> :
                                                                <>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 mr-2 -rotate-90">
                                                                        <g>
                                                                            <path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor" />
                                                                            <path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor" />
                                                                        </g>
                                                                    </svg>
                                                                    Submit
                                                                </>
                                                            }
                                                            
                                                        </span>
                                                    </button>
                                                    <button className="text-sm font-bold uppercase text-white btn btn-secondary py-4 px-5 bg-secondary btn-scale-0 cursor-pointer" onClick={() => setAddShip(!addShip)}>
                                                        <span className="relative z-1 flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 relative z-1"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                                            Close
                                                        </span>
                                                    </button>
                                                </div>

                                            </form>
                                        </motion.div> :
                                        <button className="text-sm font-bold uppercase text-white btn btn-primary py-4 px-5 bg-primary btn-scale-0 mt-2 cursor-pointer" onClick={() => setAddShip(!addShip)}>
                                            <span className="relative z-1 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-6 h-6 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>
                                                Add New Shipping Address
                                            </span>
                                        </button>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
