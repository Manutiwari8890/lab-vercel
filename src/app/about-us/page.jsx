import Image from "next/image";

export const metadata = {
  title: "LabDisposable – About Us | USA Lab Supplies & Consumables",
  description: "Learn about LabDisposable – a trusted USA supplier of lab supplies, disposable products, equipment & reagents. Committed to quality, service & fast shipping.",
  keywords: ["Laboratory consumables", "reagents", "equipment distributor USA", "Lab disposable company USA", "Lab consumables supplier USA", "Laboratory consumables distributor USA", "Laboratory solutions provider in NJ", "Quality laboratory products supplier", "Laboratory reagents supplier", "Disposable lab products", "ISO certified lab consumables", "Trusted lab equipment distributor", "Fast shipping lab supplies USA", "Where to buy fast shipping disposable lab products in the USA", "High-grade consumable materials for microbiological laboratory applications", "ISO certified laboratory company providing lab consumables in the USA", "Wholesale laboratory disposable products supplier in USA", "Which laboratory supply company offers bulk ordering and fast shipping"],

  alternates: {
    canonical: "https://www.labdisposable.com/about-us",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "LabDisposable – About Us | USA Lab Supplies & Consumables",
    description:
      "Learn about LabDisposable – a trusted USA supplier of lab supplies, disposable products, equipment & reagents. Committed to quality, service & fast shipping.",
    url: "https://www.labdisposable.com/about-us",
    siteName: "Lab Disposable Products",
    type: "website",
    locale: "en_IN",

    images: [
      {
        url: "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
        width: 1200,
        height: 630,
        alt: "Lab Disposable Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LabDisposable – About Us | USA Lab Supplies & Consumables",
    description:
      "Learn about LabDisposable – a trusted USA supplier of lab supplies, disposable products, equipment & reagents. Committed to quality, service & fast shipping.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};


export default function Page()
{
    const served = ["Aurovaccines.webp", "columbiauni.webp", "MtSinai.webp", "NYbloodcenter.webp", "NYMedicalCollege.webp", "NYUNI.webp", "PrincetonUNI.webp", "Rutgers.webp", "Weillcornell.webp"]
    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">About Us</h2>
                    <div className="grid grid-cols-1 gap-5 gap-y-5 items-start md:grid-cols-2 md:gap-y-10 xl:gap-10 xl:gap-y-5">
                        <div className="img-area relative mt-4">
                            <Image src="/assets/images/about-us.webp" alt="Lab Disposable Products (LDP)" className="pr-10 relative z-1 w-full h-auto" width={500} height={600} />
                            <Image src="/assets/images/labdisposable_Oana_Robin_9251107.webp" alt="Lab Disposable Products (LDP)" width={200} height={200} className=" z-1 w-1/2 h-auto border-10 border-white absolute top-[70%] right-[0%]" />
                        </div>
                        <div className="mb-5">
                            <p className="text-base font-mormal text-justify leading-7 mb-4 "><span className="text-xl uppercase font-bold text-primary xl:text-2xl">Laboratory</span> Disposable Products (LDP) is a one of the leading distributors of laboratory supplies, Reagents, Equipment, and safety products to the Life Science, Pharmaceutical industries, Hospitals, educational institutes, and many small businesses since 1979. Laboratory Disposable Products (LDP) is a proud Woman Owned Small Business.</p>
                            <p className="text-base font-mormal text-justify leading-7 mb-4">LDP is Small Business Certified, registered in SAM with DUNS NUMBER: 037175262 and CAGE/NCAGE: 537P3. LDP is certified Woman Owned company by WBENC, NY State and NJ State.</p>
                            <p className="text-base font-mormal text-justify leading-7 mb-4">We have been exploring new markets and expand our product portfolio to meet our customer requirements for their research needs. We have since increased our offering to over 100K products and diversified our product categories to include Laboratory consumables including Pipettes, tips, gloves, vials, centrifuge tubes, Reagents, Equipment, Safety & Hygiene Products. and many more. All our products have withstood rigorous international quality from leading manufactures.</p>
                            <p className="text-base font-mormal text-justify leading-7 mb-4">We continue to add more products to our portfolio for our customers across Life Science, Pharmaceutical industries, Hospitals, educational institutes, in domestic and international markets.</p>
                            <blockquote className="text-sm text-dark font-semibold text-justify leading-7 mt-6 mb-4 px-3 py-4 border-l-2 border-primary bg-primary/10">Our strong distribution network, Excellent Supply Chain Management, and Outstanding sales force give us confident to offering new and innovative products to our customers on an ongoing basis for their customary requirements and provide Optimum in Customer Satisfaction.</blockquote>
                        </div>
                        <div className="xl:mt-10">
                            <p className="text-base font-mormal text-justify leading-7 mb-4"><span className="text-2xl font-bold text-primary uppercase mr-1">Customer’s</span> feedback is our driving force for our growth and development. We create long term relationship with customers through value addition in their products and processes. We at LDP treat our customers with honesty, respect, and dignity.</p>
                            <p className="text-base font-mormal text-justify leading-7 mb-4">LDP, distributes premium laboratory products provided by world-recognized manufacturers and brands in the US including, Corning, Falcon, Biotix™, Thermo Scientific™, DWK™, Restek™, Trajan Scientific™, Globe Scientific™, High-Purity Standards™, Cayman Chemical™, Honeywell™, 3M™, BrandTech Scientific™ and many more!</p>
                            <blockquote className="text-sm font-semibold text-justify leading-7 mb-4 mt-6 pl-3 border-l-2 border-primary px-3 py-4 bg-primary/10">LDP is a direct seller, marketer, and supplier of analytical laboratory products and certified reference standards to analysts throughout North America. As a leading provider of standards and consumables for GC/LC, and ICP/ICP-MS instrumentation. The company’s core product offering has a wide range of analytical instrument components, high-purity standard solutions and reagents, plus many other general labware consumables for the clinical/toxicology, pharmaceutical, environmental, petrochemical, and cannabis testing laboratories.</blockquote>
                            <p className="text-base font-mormal text-justify leading-7 mb-4">All products offered by LDP are engineered and tested for compatibility with OEM instrumentation and each item is fully warranted, and 100% guaranteed.</p>
                        </div>
                        <div className="img-area before-img relative mt-4 xl:mt-10">
                            <Image src="/assets/images/labdisposable_Oana_10451155.webp" alt="LDP, distributes premium laboratory products" className="pr-10 relative z-1 w-full h-auto" width={500} height={400} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-100  py-5 md:py-15">
                <div className="container px-3 mx-auto md-px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5">
                        <div className="p-2 group">
                            <div className="border-2 border-primary p-3 rounded-full flex items-center gap-3 mb-4 group-hover:scale-103 xl:gap-5">
                                <div className="w-[50px] h-[50px] bg-primary text-white text-xl text-center content-center rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28" className="m-auto">
                                        <path d="M15.5,6c-1.378,0-2.5,1.122-2.5,2.5s1.122,2.5,2.5,2.5,2.5-1.122,2.5-2.5-1.122-2.5-2.5-2.5Zm0,4c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5,.673,1.5,1.5-.673,1.5-1.5,1.5ZM24,2.5c0-1.378-1.122-2.5-2.514-2.5-4.942,.141-9.444,2.552-13.111,7.001-1.586,.019-3.168,.404-4.585,1.115-2.302,1.155-3.79,3.661-3.79,6.384v.5H5c1.068,0,2.073,.416,2.829,1.171,.755,.756,1.171,1.76,1.171,2.829v5h.5c2.723,0,5.229-1.487,6.384-3.789,.712-1.417,1.096-3,1.115-4.586,4.448-3.667,6.86-8.17,7.001-13.125ZM4.238,9.01c1.034-.519,2.165-.845,3.317-.961-.098,.132-.196,.265-.293,.4-1.553,2.167-2.712,4.684-3.092,5.551H1.019c.166-2.15,1.393-4.074,3.219-4.99Zm10.752,10.752c-.917,1.826-2.84,3.053-4.99,3.219v-3.151c.868-.38,3.384-1.539,5.552-3.092,.135-.097,.268-.194,.4-.292-.116,1.152-.442,2.283-.961,3.317Zm-.021-3.837c-1.803,1.292-3.914,2.325-4.976,2.811-.064-1.236-.576-2.389-1.457-3.271-.882-.882-2.035-1.393-3.271-1.457,.486-1.062,1.519-3.173,2.811-4.976C10.629,5.469,15.033,1.184,21.5,1c.827,0,1.5,.673,1.5,1.486-.184,6.481-4.469,10.885-8.031,13.439ZM1.732,18.732c-.85,.849-1.419,3.881-1.524,4.48l-.124,.703,.703-.124c.599-.105,3.631-.674,4.48-1.524,.472-.472,.732-1.1,.732-1.768s-.26-1.296-.732-1.768c-.943-.944-2.592-.944-3.535,0Zm2.828,2.828c-.386,.386-1.934,.831-3.227,1.106,.275-1.293,.72-2.841,1.106-3.227,.283-.283,.66-.439,1.061-.439s.777,.156,1.061,.439,.439,.66,.439,1.061-.156,.777-.439,1.061Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-primary xl:text-2xl">Mission</h3>
                            </div>
                            <p className="text-sm leading-[26px] text-justify text-dark/80 px-4">Our mission is to provide personalized service to our customers, grant access to highest quality products from reliable & leading brand manufacturers & ensure timely delivery of required products by maintaining Global best practices in Quality standards & Safety to conduct their cutting-edge research & development more effectively.</p>
                        </div>
                        <div className="p-2 group">
                            <div className="border-2 border-primary p-3 rounded-full flex items-center gap-3 mb-4 group-hover:scale-103 xl:gap-5">
                                <div className="w-[50px] h-[50px] bg-primary text-white text-xl text-center content-center rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28" className="m-auto">
                                        <path d="M21.206,14.116c1.052-1.207,1.052-3.026,0-4.232-1-1.146-4.619-4.884-9.205-4.884S3.795,8.738,2.795,9.883c-1.054,1.207-1.054,3.026,0,4.232,1,1.146,4.619,4.884,9.205,4.884s8.206-3.738,9.206-4.884Zm-9.206,3.884c-3.309,0-6.535-2.346-8.452-4.542-.726-.831-.726-2.085,0-2.917,1.916-2.195,5.142-4.541,8.451-4.541s6.536,2.346,8.452,4.541c.726,.832,.726,2.086,0,2.918-1.917,2.195-5.143,4.541-8.452,4.541Zm0-9c-1.654,0-3,1.346-3,3s1.346,3,3,3,3-1.346,3-3-1.346-3-3-3Zm0,5c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2ZM0,6.5v-2C0,2.019,2.019,0,4.5,0h2c.276,0,.5,.224,.5,.5s-.224,.5-.5,.5h-2c-1.93,0-3.5,1.57-3.5,3.5v2c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5ZM7,23.5c0,.276-.224,.5-.5,.5h-2c-2.481,0-4.5-2.019-4.5-4.5v-2c0-.276,.224-.5,.5-.5s.5,.224,.5,.5v2c0,1.93,1.57,3.5,3.5,3.5h2c.276,0,.5,.224,.5,.5Zm17-6v2c0,2.481-2.019,4.5-4.5,4.5h-2c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h2c1.93,0,3.5-1.57,3.5-3.5v-2c0-.276,.224-.5,.5-.5s.5,.224,.5,.5Zm0-13v2c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5v-2c0-1.93-1.57-3.5-3.5-3.5h-2c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h2c2.481,0,4.5,2.019,4.5,4.5Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-primary xl:text-2xl">Vission</h3>
                            </div>
                            <p className="text-sm leading-[26px] text-justify text-dark/80 px-4">To be the market leader as Laboratory Disposable Products Supplier with a Comprehensive standpoint by beyond Customer expectations and achieve operational excellence through Quality & Service, Total Quality Management, Safety & Supply Chain management.</p>
                        </div>
                        <div className="p-2 group">
                            <div className="border-2 border-primary p-3 rounded-full flex items-center gap-3 mb-4 group-hover:scale-103 xl:gap-5">
                                <div className="w-[50px] h-[50px] bg-primary text-white text-xl text-center content-center rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28" className="m-auto">
                                        <path d="m24,2v1h-3.118l-3.265-1.633c-1.28-.639-2.903-.399-3.94.579l-5.188,4.917c-.548.548-.652,1.409-.232,1.993.267.37.659.594,1.105.629.442.034.871-.123,1.183-.434l4.648-4.477.693.721-2.108,2.03,2.387,1.79c-.435.069-.861.164-1.272.296l-1.845-1.384-1.804,1.737c-.465.465-1.099.726-1.76.726-.067,0-.135-.003-.203-.008-.732-.059-1.401-.439-1.836-1.042-.703-.977-.554-2.393.346-3.293l3.519-3.336-.992-.903c-1.065-.972-2.727-1.144-3.937-.54l-3.265,1.633H0v-1h2.882L5.936.473c.62-.309,1.312-.473,2.003-.473,1.156,0,2.227.415,3.054,1.168l1.046.953.951-.901c1.338-1.26,3.428-1.568,5.074-.747l3.055,1.527h2.882Zm0,15.5c0,3.584-2.916,6.5-6.5,6.5s-6.5-2.916-6.5-6.5,2.916-6.5,6.5-6.5,6.5,2.916,6.5,6.5Zm-1,0c0-3.032-2.467-5.5-5.5-5.5s-5.5,2.468-5.5,5.5,2.467,5.5,5.5,5.5,5.5-2.468,5.5-5.5Zm-6.02,1.451c-.055.057-.18.057-.241-.006l-1.856-1.8-.696.719,1.851,1.794c.221.221.514.342.825.342s.604-.121.822-.339l3.457-3.399-.701-.713-3.46,3.402Zm-7.974-1.567l-5.839-4.384H0v1h2.833l6.261,4.701c-.056-.393-.094-.792-.094-1.201,0-.039.005-.077.006-.116Z" fill="currentColor" />
                                    </svg>                                
                                </div>
                                <h3 className="text-xl font-semibold text-primary xl:text-2xl">Contribute to the Society</h3>
                            </div>
                            <p className="text-sm leading-[26px] text-justify text-dark/80 px-4">We at LDP, we are committed to create value in society through improvement in Health Care, Education and Environmental awareness. We make aware our employee and everyone who is associate with us for ecosystem preservation by various program and charitable contributions.</p>
                        </div>
                        <div className="p-2 group">
                            <div className="border-2 border-primary p-3 rounded-full flex items-center gap-3 mb-4 group-hover:scale-103 xl:gap-5">
                                <div className="w-[50px] h-[50px] bg-primary text-white text-xl text-center content-center rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28" className="m-auto">
                                        <path d="m20.212,2.798L12,.076,3.788,2.798c-1.069.355-1.788,1.349-1.788,2.473v6.664c0,6.609,7.159,10.702,9.354,11.8l.628.313.648-.262c2.817-1.133,9.37-4.545,9.37-11.744v-6.771c0-1.125-.719-2.118-1.788-2.473Zm.788,9.244c0,6.589-6.346,9.854-8.976,10.91-2.064-1.032-9.024-4.981-9.024-11.018v-6.664c0-.692.443-1.305,1.103-1.523l7.897-2.618,7.897,2.618c.659.219,1.103.831,1.103,1.523v6.771Zm-9-5.042c-1.379,0-2.5,1.121-2.5,2.5,0,1.208.86,2.218,2,2.45v4.05h1v-4.05c1.14-.232,2-1.242,2-2.45,0-1.379-1.121-2.5-2.5-2.5Zm0,4c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5.673,1.5,1.5-.673,1.5-1.5,1.5Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-primary xl:text-2xl">Commitment</h3>
                            </div>
                            <p className="text-sm leading-[26px] text-justify text-dark/80 px-4">We at LDP, we are providing positive and healthy work culture for our employee so they could be able to work to his or her full potential. We at LDP, we are creating a work culture that encourage trust, respect to an individual and value the diversity within the organization. At LDP, we are adopting best practices in business operations for everyone associate with us.</p>
                        </div>
                        <div className="p-2 group">
                            <div className="border-2 border-primary p-3 rounded-full flex items-center gap-3 mb-4 group-hover:scale-103 xl:gap-5">
                                <div className="w-[50px] h-[50px] bg-primary text-white text-xl text-center content-center rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28" className="m-auto">
                                        <path d="M23.964,12.314l-.003-.006-.002-.005-3.493-8.732c-.382-.955-1.293-1.572-2.321-1.572h-5.646V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5H5.854c-1.028,0-1.939,.617-2.321,1.572L.041,12.303l-.002,.005-.003,.006c-.024,.059-.036,1.101-.036,1.101,0,2.197,1.457,4.041,3.543,4.484,.314,.067,.634,.101,.95,.101h.008c2.48-.004,4.499-2.023,4.499-4.5,0,0-.012-1.126-.036-1.186l-.003-.006-.002-.005L5.283,3.112c.177-.073,.37-.112,.571-.112h5.646V23H4.5c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h15c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-7V3h5.646c.201,0,.395,.039,.571,.112l-3.676,9.191-.002,.005-.003,.006c-.024,.059-.036,1.186-.036,1.186,0,2.477,2.019,4.496,4.499,4.5h.008c.316,0,.636-.034,.949-.101,2.087-.444,3.544-2.288,3.544-4.484,0,0-.012-1.042-.036-1.101ZM4.499,17c-.283,.016-.5-.026-.748-.079-1.619-.344-2.751-1.786-2.751-3.506v-.415h7v.5c0,1.926-1.57,3.497-3.501,3.5Zm3.263-5H1.238S4.487,3.881,4.502,3.851l3.26,8.149ZM19.498,3.851c.015,.03,3.263,8.149,3.263,8.149h-6.523l3.26-8.149Zm.75,13.07c-.247,.053-.466,.097-.747,.079-1.931-.003-3.501-1.574-3.501-3.5v-.5h7v.415c0,1.72-1.132,3.162-2.752,3.506Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-primary xl:text-2xl">Integrity</h3>
                            </div>
                            <p className="text-sm leading-[26px] text-justify text-dark/80 px-4">We do business is fully aligned with our core values and applicable laws and regulations in countries where we operate. Honesty and Transparency in our business practices brings values to life for all employees and helps them apply our ethical standards in their day-to-day work. In addition to our Code of Business Principles with the highest level of ethical behaviour and professional performance with our customers, distributors, and manufacturers partners.</p>
                        </div>
                        <div className="p-2 group">
                            <div className="border-2 border-primary p-3 rounded-full flex items-center gap-3 mb-4 group-hover:scale-103 xl:gap-5">
                                <div className="w-[50px] h-[50px] bg-primary text-white text-xl text-center content-center rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28" className="m-auto">
                                        <path d="m5.383,17.722c.182.182.422.277.668.277.122,0,.246-.023.364-.072.355-.147.584-.491.584-.875v-4.11c.617-.631,1-1.492,1-2.442,0-1.93-1.57-3.5-3.5-3.5s-3.5,1.57-3.5,3.5c0,.95.383,1.81,1,2.442v4.11c0,.384.229.728.584.875.356.146.761.067,1.05-.224l.865-.957.883.976Zm-3.383-7.222c0-1.379,1.122-2.5,2.5-2.5s2.5,1.121,2.5,2.5-1.122,2.5-2.5,2.5-2.5-1.121-2.5-2.5Zm1,6.414v-3.265c.456.219.961.351,1.5.351s1.044-.133,1.5-.351v3.265l-1.129-1.249c-.189-.211-.553-.211-.742,0l-1.129,1.249Zm6,2.586c0-.276.224-.5.5-.5h9c.276,0,.5.224.5.5s-.224.5-.5.5h-9c-.276,0-.5-.224-.5-.5Zm1.5-7.5c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h8c.276,0,.5.224.5.5s-.224.5-.5.5h-8Zm-1,3h9c.276,0,.5.224.5.5s-.224.5-.5.5h-9c-.276,0-.5-.224-.5-.5s.224-.5.5-.5Zm12.596-9.611l-3.485-3.484c-1.227-1.228-2.859-1.904-4.596-1.904h-5.515c-2.481,0-4.5,2.019-4.5,4.5,0,.276.224.5.5.5s.5-.224.5-.5c0-1.93,1.57-3.5,3.5-3.5h5.515c.335,0,.663.038.985.096v5.404c0,1.379,1.122,2.5,2.5,2.5h5.404c.058.323.096.651.096.985v9.515c0,1.93-1.57,3.5-3.5,3.5h-11c-1.598,0-2.992-1.079-3.39-2.625-.068-.268-.343-.425-.609-.359-.268.069-.429.342-.36.609.512,1.987,2.304,3.375,4.358,3.375h11c2.481,0,4.5-2.019,4.5-4.5v-9.515c0-1.735-.676-3.368-1.904-4.597Zm-4.596,2.611c-.827,0-1.5-.673-1.5-1.5V1.379c.704.273,1.354.682,1.904,1.232l3.485,3.484c.55.551.959,1.2,1.231,1.904h-5.12Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-primary xl:text-2xl">Certificate</h3>
                            </div>
                            <p className="text-sm leading-[26px] text-justify text-dark/80 px-4">Lab disposable products is certified women owned business.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-4 pb-8 xl:pt-8 xl:pb-16">
                <div className="container px-3 mx-auto lg:px-5">
                    <div className="slider relative overflow-hidden">
                        <div className="absolute bg-gradient-to-r from-white to-transprante top-0 left-0 w-5 h-full z-1"></div>
                        <div className="slider-track w-max flex gap-5">
                            {served?.length > 0 &&
                                <>{served?.map((serve, index) => (
                                    <Image src={`/assets/images/${serve}`} alt={serve?.split(".")[0]} width={175} height={75}  className="w-[150px] h-auto grayscale hover:grayscale-0 xl:w-[175px]" key={index} />
                                ))}
                                    {served?.map((serve, index) => (
                                        <Image src={`/assets/images/${serve}`} alt={serve?.split(".")[0]} width={175} height={75} className="w-[150px] grayscale h-auto hover:grayscale-0 xl:w-[175px]" key={index + 100} />
                                    ))}
                                </>
                            }
                        </div>
                        <div className="absolute bg-gradient-to-l from-white to-transprante top-0 right-0 w-5 h-full z-1"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
