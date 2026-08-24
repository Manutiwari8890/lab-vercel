"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqData = [
    {
        title: "1. How Do I Place an Order?",
        description: "You have multiple options for placing your order: you can do so directly on our website, call us at 973-335-2966, or send an email to  <a href='mailto:sales@labdisposable.com' class='text-primary font-semibold hover:text-secondary'>sales@labdisposable.com</a>"
    },
    {
        title: "2. How Should I Contact if I Have Any Queries?",
        description: "If you have any Queries, feel free to reach out to us via email at <a href='mailto:sales@labdisposable.com' class='text-primary font-semibold hover:text-secondary'>sales@labdisposable.com</a>"
    },
    {
        title: "3. Do I Need an Account to Place an Order?",
        description: "While it’s possible to place an Order without creating an account, we highly recommend you place an order with account, due to the nature of products. Additionally, please note that we exclusively ship to non-residential addresses."
    },
    {
        title: "4. What is Laboratory Disposable Products (LDP) and what does it offer?",
        description: "LDP is a one-stop platform for laboratory consumables, equipment, and chemicals, offering a wide range of products to support daily laboratory operations across multiple industries."
    },
    {
        title: "5. What types of lab consumables are available on LDP?",
        description: "LDP offers a comprehensive range of laboratory consumables, including:<br><ul><li>• Glassware and plasticware</li><li>• Pipettes and liquid handling products</li><li>• Microtubes and centrifuge tubes</li><li>• Filter papers and membranes</li><li>• Weighing boats and sample preparation tools</li><li>• Microbiology consumables</li></ul>These products are designed for accuracy, efficiency, and reliability in lab workflows."
    },
    {
        title: "6. Which industries use Lab Disposable products?",
        description: "Lab Disposable products are widely used in:<br><ul><li>•	Pharmaceutical laboratories</li><li>•	Research and development labs</li><li>• Environmental testing and analysis</li><li>•	Environmental testing</li><li>•	Food and beverage analysis</li><li>•	Academic institutions</li></ul>These industries rely on high-quality products for consistent results."
    },
    {
        title: "7. What are laboratory consumables and why are they important?",
        description: "Laboratory consumables are single-use or limited-use products such as pipette tips, tubes, and filters. They help maintain hygiene, reduce contamination risk, and ensure accurate experimental results."
    },
    {
        title: "8. What brands are available on LDP?",
        description: "LDP offers products from leading brands such as:<br><ul><li>•	Thermo Fisher Scientific</li><li>•	BrandTech</li><li>•	Foxx Life Sciences</li><li>•	Heathrow Scientific</li><li>•	Scilogex and many more</li></ul>This ensures access to trusted and high-quality laboratory supplies."
    },
    {
        title: "9. Can I upload a list of required products for quotation?",
        description: "Yes, LDP allows customers to upload their supply list to receive quick pricing and availability details, making bulk purchasing more convenient."
    },
    {
        title: "10. Are Laboratory Disposable products available for bulk purchase?",
        description: "Yes, bulk purchasing options are available for laboratories and organizations with high-volume requirements. You can contact the sales team for customized pricing and quotations."
    },
    {
        title: "11. Do you offer special pricing for bulk orders?",
        description: "Bulk orders may qualify for discounted pricing. It is recommended to share your requirements with the sales team to receive a tailored quote."
    },
    {
        title: "12. Is technical documentation available for products?",
        description: "Yes, technical documents such as:<br><ul><li>•	Certificate of Analysis (COA)</li><li>•	Safety Data Sheet (SDS)</li><li>•	Product specifications</li></ul>may be available depending on the product and brand."
    },
    {
        title: "13. What should I do if I cannot find a product on the website?",
        description: "If you cannot find a specific product, you can submit a request through the website form. The team will assist you in sourcing or providing alternatives."
    },
    {
        title: "14. What are your shipping timelines?",
        description: "Shipping timelines depend on product availability and delivery location. Most standard orders are processed within regular business days, while larger or special orders may take additional time."
    },
    {
        title: "15. Are there any hazardous material (Hazmat) charges?",
        description: "Yes, certain laboratory chemicals and regulated items may incur additional hazardous material (Hazmat) charges in accordance with shipping and safety regulations."
    },
    {
        title: "16. What makes LDP different from other suppliers?",
        description: "LDP stands out due to:<br><ul><li>•	Wide product range across applications</li><li>•	Access to multiple trusted brands</li><li>•	Competitive pricing</li><li>•	Easy ordering and bulk quote options</li></ul>"
    },
    {
        title: "17. How can I contact LDP for support?",
        description: "You can contact LDP via:<br><ul><li>•	Email or phone</li><li>•	Website contact form</li></ul>for inquiries related to products, orders, or technical assistance."
    },
    {
        title: "18. What shipping methods are available?",
        description: "We use reliable shipping carriers such as FedEx and other logistics partners to deliver orders based on product type and quantity. For large or bulk orders, shipments may be arranged via freight or shipping trucks to ensure safe and efficient delivery."
    },
    {
        title: "19. How long will it take to receive my package?",
        description: "Delivery timelines depend on product availability, order size, and shipping location. Most standard orders are processed within business days, while bulk or specialized shipments may require additional transit time. Estimated delivery details are provided during order confirmation."
    },
    {
        title: "20. How do I track my order?",
        description: "Once your order has been shipped, tracking details will be shared via email or provided by the sales team. You can use the tracking number to monitor your shipment status directly through the shipping carrier’s website."
    },
]

export default function FaqClient() {
    const [open, setOpen] = useState(null);

    const toggleFaq = (id) => {
        setOpen(id === open ? null : id)
    }

    return (
        <>
            <section className="py-10 bg-gray-100">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">FAQ's</h2>
                    <div className="grid grid-cols-1 gap-y-15 gap-5 items-start md:grid-cols-1">
                        <div className="px-2">
                            {faqData?.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`border-b border-l-2 py-2 px-3 mb-3 transition-colors duration-300 bg-white ${open === index ? "border-primary" : "border-gray-300"
                                        }`}
                                >
                                    <button
                                        className={`w-full text-left py-2 text-base font-semibold flex items-center justify-between transition-colors duration-300 cursor-pointer hover:text-primary ${open === index ? "text-primary" : "text-dark"
                                            }`}
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <span>{faq.title}</span>
                                        <motion.svg
                                            animate={{ rotate: open === index ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-8 h-8"
                                        >
                                            <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" />
                                        </motion.svg>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {open === index && (
                                            <AnswerMotion key="content">
                                                <p className="text-base text-gray-600 mt-2 pl-1" dangerouslySetInnerHTML={{ __html: faq.description}}>
                                                </p>
                                            </AnswerMotion>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

const AnswerMotion = ({ children }) => {
    const ref = useRef(null);

    return (
        <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{
                height: ref.current ? ref.current.scrollHeight : "auto",
                opacity: 1,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
        >
            {children}
        </motion.div>
    );
};
