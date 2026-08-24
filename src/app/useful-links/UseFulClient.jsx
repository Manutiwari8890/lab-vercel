"use client"

import { useRef } from "react";
import Link from "next/link";

export default function UseFulClient() {
    const section1 = useRef(null);
    const section2 = useRef(null);
    const section3 = useRef(null);
    const section4 = useRef(null);
    const section5 = useRef(null);
    const section6 = useRef(null);
    const section7 = useRef(null);
    const section8 = useRef(null);
    const section9 = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">Useful Links</h2>
                    <p className="text-sm xl:text-base text-justify leading-7 mb-8">Ready to take your chemistry knowledge to the next level? Check out Resources for the best tools and resources for learning about Laboratory Chemicals, Pharmaceutical Excipients, Aquaculture Specialties, and Food Grade Additives. Our selection of institutions provides the highest quality education and research. Get up to speed quickly with our comprehensive collection of educational materials and resources – start mastering chemistry today!</p>
                    <div className="relative overflow-x-auto md:max-w-[90%] xl:max-w-[70%] mx-auto mb-5 md:mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-primary">
                                <tr>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Sr.No.
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Content
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Read more
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-3 font-medium text-gray-900">
                                        1
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        Chemistry Website
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section1)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-3 font-medium text-gray-900">
                                        2
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        Basic SI Units
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section2)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-3 font-medium text-gray-900">
                                        3
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        Physical Constants
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section3)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-3 font-medium text-gray-900">
                                        4
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        Prefix used in SI System
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section4)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-3 font-medium text-gray-900">
                                        5
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        Acid-Base Indicator Selection
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section5)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-3 font-medium text-gray-900">
                                        6
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        Preparation of Standard Solution
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section6)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-3 font-medium text-gray-900">
                                        7
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        Concentrations
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section7)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900">
                                        8
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-4">
                                        Common Units of Mass & Weight, Length
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section8)}>Read More</button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900">
                                        9
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-4">
                                        Particle size Conversion
                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <button className="text-primary font-semibold cursor-pointer hover:text-secondary py-2" onClick={() => scrollToSection(section9)}>Read More</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-5" ref={section1}>Chemistry Websites</h3>
                    <div className="relative overflow-x-auto max-w-[100%] xl:max-w-[80%] mx-auto mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-secondary ">
                                <tr>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Pharmaceutical Department
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Website
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Warner Babcock Institute of Green Chemistry, USA
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.warnerbabcock.com" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.warnerbabcock.com</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Center for Green Chemistry & Green Engineering, Yale University, USA
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.greenchemistry.yale.edu" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.greenchemistry.yale.edu</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Green Chemistry Network Center (GCNC)
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.gcnc.in" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.gcnc.in</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Canadian Green Chemistry Network
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.greenchemistry.ca" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.greenchemistry.ca</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Environmental Chemistry
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.environmentalchemistry.com" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.environmentalchemistry.com</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        EPA Green Chemistry Program
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.epa.gov/greenchemistry" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.epa.gov/greenchemistry</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        American Chemical Society - Green Chemistry Institute
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.acs.org" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.acs.org</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Green Chemistry Network
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.rsc.org/Membership/Networking/GCN" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.rsc.org/Membership/Networking/GCN</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Greener Education Materials for Chemists
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.uoregon.edu" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.uoregon.edu</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Royal Chemical Society, UK
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.rsc.org" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.rsc.org</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Department Science & Technology, Govt. of India
                                        <br />(Green Chemistry Task Force)
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.dst.gov.in/about_us/ar04-05chemical.htm" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.dst.gov.in/about_us/ar04-05chemical.htm</Link>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        International Green Chemistry World
                                    </th>
                                    <td className="px-2 py-2 md:px-6 md:py-3">
                                        <Link href="https://www.industrialgreenchem.com" className="text-primary font-semibold cursor-pointer hover:text-secondary py-2">www.industrialgreenchem.com</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-5" ref={section2}>Basic SI Units</h3>
                    <div className="relative overflow-x-auto max-w-[100%] xl:max-w-[80%] mx-auto mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-secondary">
                                <tr>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Physical Dimension
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Symbol for Quantity
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        SI Symbol
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Name of SI Units
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Length
                                    </th>
                                    <td className="px-6 py-4">
                                        l
                                    </td>
                                    <td className="px-6 py-4">
                                        m
                                    </td>
                                    <td className="px-6 py-4">
                                        meter
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Mass
                                    </th>
                                    <td className="px-6 py-4">
                                        m
                                    </td>
                                    <td className="px-6 py-4">
                                        kg
                                    </td>
                                    <td className="px-6 py-4">
                                        kilogram
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Time
                                    </th>
                                    <td className="px-6 py-4">
                                        t
                                    </td>
                                    <td className="px-6 py-4">
                                        s
                                    </td>
                                    <td className="px-6 py-4">
                                        second
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Electric current
                                    </th>
                                    <td className="px-6 py-4">
                                        I
                                    </td>
                                    <td className="px-6 py-4">
                                        A
                                    </td>
                                    <td className="px-6 py-4">
                                        ampere
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Thermodynamic temperature
                                    </th>
                                    <td className="px-6 py-4">
                                        T
                                    </td>
                                    <td className="px-6 py-4">
                                        K
                                    </td>
                                    <td className="px-6 py-4">
                                        Kelvin
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Amount of substance
                                    </th>
                                    <td className="px-6 py-4">
                                        n
                                    </td>
                                    <td className="px-6 py-4">
                                        Mole
                                    </td>
                                    <td className="px-6 py-4">
                                        mole
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Luminous intensity
                                    </th>
                                    <td className="px-6 py-4">
                                        lv
                                    </td>
                                    <td className="px-6 py-4">
                                        cd
                                    </td>
                                    <td className="px-6 py-4">
                                        candela
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-5" ref={section3}>Physical Constants</h3>
                    <div className="relative overflow-x-auto max-w-[100%] xl:max-w-[80%] mx-auto mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-secondary">
                                <tr>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Symbol
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Traditional Units
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        SI Units
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Acceleration of gravity
                                    </th>
                                    <td className="px-6 py-4">
                                        g
                                    </td>
                                    <td className="px-6 py-4">
                                        980.6 cm/s
                                    </td>
                                    <td className="px-6 py-4">
                                        9.806 m/s
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Atomic mass unit
                                        <br />(1/12th of the mass of 12C atom)
                                    </th>
                                    <td className="px-6 py-4">
                                        amu
                                    </td>
                                    <td className="px-6 py-4">
                                        1.6606 X 10-24 g
                                    </td>
                                    <td className="px-6 py-4">
                                        1.6606 X 10-27 kg
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Avogadro constant
                                    </th>
                                    <td className="px-6 py-4">
                                        Na
                                    </td>
                                    <td className="px-6 py-4">
                                        6.022 X 1023 particles/mol
                                    </td>
                                    <td className="px-6 py-4">
                                        6.022 X 1023 particles/mol
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Boltzmann constant
                                    </th>
                                    <td className="px-6 py-4">
                                        k
                                    </td>
                                    <td className="px-6 py-4">
                                        1.3807 X10-16 erg/K
                                    </td>
                                    <td className="px-6 py-4">
                                        1.3807 X 10-23 J/K
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Charge-to-mass ratio of electron
                                    </th>
                                    <td className="px-6 py-4">
                                        e/m
                                    </td>
                                    <td className="px-6 py-4">
                                        1.7588 X 108 Coulomb/g
                                    </td>
                                    <td className="px-6 py-4">
                                        1.7588 X 1011 C/kg
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Electronic charge
                                    </th>
                                    <td className="px-6 py-4">
                                        e
                                    </td>
                                    <td className="px-6 py-4">
                                        1.60219 X 10-19 Coulomb 4.8033 X 10-19 esu
                                    </td>
                                    <td className="px-6 py-4">
                                        1.60219 X 10-19 C
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Faraday constant
                                    </th>
                                    <td className="px-6 py-4">
                                        F
                                    </td>
                                    <td className="px-6 py-4">
                                        96,487 C·eq-1
                                    </td>
                                    <td className="px-6 py-4">
                                        96,487 C·mol-1
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Gas constant
                                    </th>
                                    <td className="px-6 py-4">
                                        R
                                    </td>
                                    <td className="px-6 py-4">
                                        1.987 cal/mol. K
                                    </td>
                                    <td className="px-6 py-4">
                                        8.3145 kPa dm3/ mol .K 8.3145 J/ mol.K
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Molar volume (STP)
                                    </th>
                                    <td className="px-6 py-4">
                                        Vm
                                    </td>
                                    <td className="px-6 py-4">
                                        22.710981 L/mol
                                    </td>
                                    <td className="px-6 py-4">
                                        22.710981 X 10-3 m3/mol <br />
                                        22.710981 dm3/ mol
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-5" ref={section4}>Prefix used in SI System</h3>
                    <div className="relative overflow-x-auto max-w-[100%] xl:max-w-[80%] mx-auto mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-secondary">
                                <tr>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Multiple
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Prefix
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Symbol
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁻¹⁵
                                    </th>
                                    <td className="px-6 py-4">
                                        Femto
                                    </td>
                                    <td className="px-6 py-4">
                                        f
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁻¹²
                                    </th>
                                    <td className="px-6 py-4">
                                        Pico
                                    </td>
                                    <td className="px-6 py-4">
                                        p
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁻⁹
                                    </th>
                                    <td className="px-6 py-4">
                                        Nano
                                    </td>
                                    <td className="px-6 py-4">
                                        n
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁻⁶
                                    </th>
                                    <td className="px-6 py-4">
                                        Micro
                                    </td>
                                    <td className="px-6 py-4">
                                        µ
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁻³
                                    </th>
                                    <td className="px-6 py-4">
                                        Milli
                                    </td>
                                    <td className="px-6 py-4">
                                        m
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁻²
                                    </th>
                                    <td className="px-6 py-4">
                                        Centi
                                    </td>
                                    <td className="px-6 py-4">
                                        c
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁻¹
                                    </th>
                                    <td className="px-6 py-4">
                                        Deci
                                    </td>
                                    <td className="px-6 py-4">
                                        d
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10
                                    </th>
                                    <td className="px-6 py-4">
                                        Deca
                                    </td>
                                    <td className="px-6 py-4">
                                        da
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        1⁻¹
                                    </th>
                                    <td className="px-6 py-4">
                                        Hecta
                                    </td>
                                    <td className="px-6 py-4">
                                        h
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10³
                                    </th>
                                    <td className="px-6 py-4">
                                        Kilo
                                    </td>
                                    <td className="px-6 py-4">
                                        k
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁶
                                    </th>
                                    <td className="px-6 py-4">
                                        Mega
                                    </td>
                                    <td className="px-6 py-4">
                                        M
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10⁹
                                    </th>
                                    <td className="px-6 py-4">
                                        Giga
                                    </td>
                                    <td className="px-6 py-4">
                                        G
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10¹²
                                    </th>
                                    <td className="px-6 py-4">
                                        Tera
                                    </td>
                                    <td className="px-6 py-4">
                                        T
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        10¹⁵
                                    </th>
                                    <td className="px-6 py-4">
                                        Peta
                                    </td>
                                    <td className="px-6 py-4">
                                        P
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-5" ref={section5}>Acid-Base Indicator Selection</h3>
                    <div className="relative overflow-x-auto max-w-[100%] xl:max-w-[80%] mx-auto mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-secondary">
                                <tr>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        pH range
                                    </th>
                                    <th scope="col" className="px-2 py-2 md:px-6 md:py-3">
                                        Color Change
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Thymol Blue
                                    </th>
                                    <td className="px-6 py-4">
                                        1.2-2.8
                                    </td>
                                    <td className="px-6 py-4">
                                        Red to Yellow
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Bromophenol Blue
                                    </th>
                                    <td className="px-6 py-4">
                                        3.0-4.6
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Blue
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Congo Red
                                    </th>
                                    <td className="px-6 py-4">
                                        3.0-5.0
                                    </td>
                                    <td className="px-6 py-4">
                                        Blue to Red
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Bromophenol Blue
                                    </th>
                                    <td className="px-6 py-4">
                                        3.0-4.5
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Blue
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Methyl Orange
                                    </th>
                                    <td className="px-6 py-4">
                                        3.2-4.2
                                    </td>
                                    <td className="px-6 py-4">
                                        Red to Yellow/Orange
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Bromocresol Green
                                    </th>
                                    <td className="px-6 py-4">
                                        3.8-5.4
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Blue
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Methyl Red
                                    </th>
                                    <td className="px-6 py-4">
                                        4.2-6.2
                                    </td>
                                    <td className="px-6 py-4">
                                        Pink to Yellow
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Methyl Red Hydrochloride
                                    </th>
                                    <td className="px-6 py-4">
                                        4.2-6.2
                                    </td>
                                    <td className="px-6 py-4">
                                        Pink to Yellow
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Rosolic Acid
                                    </th>
                                    <td className="px-6 py-4">
                                        5.0-8.0
                                    </td>
                                    <td className="px-6 py-4">
                                        Mow to Red
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Bromocresol Purple
                                    </th>
                                    <td className="px-6 py-4">
                                        5.2-6.8
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Purple
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Alizarin
                                    </th>
                                    <td className="px-6 py-4">
                                        5.8-7.2
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Red
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Bromothymol Blue
                                    </th>
                                    <td className="px-6 py-4">
                                        6.0-7.6
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Blue
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        m-Nitrophenol
                                    </th>
                                    <td className="px-6 py-4">
                                        6.8-8.6
                                    </td>
                                    <td className="px-6 py-4">
                                        Colorless to Yellow
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Phenol Red
                                    </th>
                                    <td className="px-6 py-4">
                                        6.8-8.2
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Red
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Cresol Red
                                    </th>
                                    <td className="px-6 py-4">
                                        7.0-8.8
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Violet Red
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Thymol Blue
                                    </th>
                                    <td className="px-6 py-4">
                                        8.0-9.2
                                    </td>
                                    <td className="px-6 py-4">
                                        Yellow to Blue
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Phenolphthalein
                                    </th>
                                    <td className="px-6 py-4">
                                        8.0-10.0
                                    </td>
                                    <td className="px-6 py-4">
                                        Colorless to Red
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Thymolphthalein
                                    </th>
                                    <td className="px-6 py-4">
                                        8.8-10.5
                                    </td>
                                    <td className="px-6 py-4">
                                        Colorless to Blue
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Alizarin
                                    </th>
                                    <td className="px-6 py-4">
                                        1.0-13.0
                                    </td>
                                    <td className="px-6 py-4">
                                        Red to Purple
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 md:px-6 md:py-4">
                                        Acid Fuchsin
                                    </th>
                                    <td className="px-6 py-4">
                                        12.0-14.0
                                    </td>
                                    <td className="px-6 py-4">
                                        Red to Colorless
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-5" ref={section6}>Acid-Base Indicator Selection</h3>
                    <div className="relative overflow-x-auto max-w-[100%] mx-auto mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-secondary">
                                <tr>
                                    <th scope="col" className="px-3 py-3">

                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Specific Gravity (20°C)
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Molarity (M)
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Qualtity required in ml to make <br /> 1 liter 1 Molar Solution
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Normality (N)
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Quantity required in ml to make <br /> 1 liter 1 Normal Solution
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Glacial Acetic acid
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.05
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        17.4
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        57.5
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        17.4
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        57.5
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Ammonia 30%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.89
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        14.5
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        69
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        14.5
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        69
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Ammonia 25%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.91
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        13.4
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        74.6
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        13.4
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        74.6
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Hydrochloric acid 36%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.18
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        11.7
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        85.8
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        11.7
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        85.8
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Hydrofluoric acid 40%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.13
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        22.6
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        44.2
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        22.6
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        44.2
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Hydrofluoric acid 48%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.15
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        28.9
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        34.5
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        28.9
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        34.5
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Nitric acid 70%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.42
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        15.8
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        63.3
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        15.8
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        63.3
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Perchloric acid 60%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.54
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        9.2
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        108.7
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        9.2
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        108.7
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Perchloric acid 70%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.67
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        11.6
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        86.2
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        11.6
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        86.2
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Sulphuric acid 98%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.84
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        18
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        53.1
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        36
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        26.2
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        Phosphoric acid 85%
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1.7
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        15.2
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        65.8
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        45.6
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        21.9
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-5" ref={section7}>Concentrations</h3>
                    <div className="relative overflow-x-auto max-w-[100%] xl:max-w-[80%] mx-auto mb-15">
                        <table className="w-full text-sm xl:text-base text-left">
                            <thead className="text-sm text-white uppercase bg-secondary">
                                <tr>
                                    <th scope="col" className="px-3 py-3">
                                        Percentage (%)	
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Part per Million (ppm)	
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Part per Billion (ppb)	
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Part per Trillion (ppt)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        1
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        10,000	
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        10,000,000	
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        10,000,000,000
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        0.1	
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1,000	
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1,000,000	
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1,000,000,000
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        0.0001
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1,000
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1,000,000
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        0.0000001
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.001
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1,000
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        0.0000000001	
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.000001
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.001
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        1
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                        0.0000000000001
                                    </th>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.000000001
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.000001
                                    </td>
                                    <td className="px-1 py-1 lg:px-3 lg:py-3">
                                        0.001
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-10">
                        <div>
                            <h3 className="text-2xl font-semibold text-center mb-5" ref={section8}>Common Units of Mass & Weight</h3>
                            <div className="relative overflow-x-auto max-w-[100%] mx-auto ">
                                <table className="w-full text-sm xl:text-base text-left">
                                    <tbody>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 pound =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                453.5924 grams	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                0.45359 kilograms	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                7000 grains
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 kilogram =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1000 grams	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                2.205 pounds	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 gram =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                10 decigrams	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                100 centigrams	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1000 milligrams
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 metric ton =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1000 kilograms	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                2204.62 pounds	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-center mb-5" ref={section9}>Common Units of Length</h3>
                            <div className="relative overflow-x-auto max-w-[100%] mx-auto">
                                <table className="w-full text-sm xl:text-base text-left">
                                    <tbody>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 inch =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                2.54 centimeters	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 mile =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                5280 feet	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1.609 kilometers	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                0.3048 meters	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 mile =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                5280 feet	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1.609 kilometers	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 yard =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                36 inches	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                0.9144 meter	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 meter =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                100 centimeters	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                39.37 inches	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                3.281 feet	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1.094 yards
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 kilometer =	
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1000 meter	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1094 yards	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                0.6215 mile	
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-1 py-1 lg:px-3 lg:py-3 font-medium text-gray-900">
                                                1 angstrom =		
                                            </th>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1.0 X 10-8 centimeter		
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                0.10 nanometer		
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                1.0 X 10-10 meter		
                                            </td>
                                            <td className="px-1 py-1 lg:px-3 lg:py-3">
                                                -
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
