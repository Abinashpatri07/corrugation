import React, { useEffect, useState } from 'react';

import {
    Search,
    Info,
    Box,
    MoreVertical,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';


const BoxSpecifications = ({
    specifications = []
}) => {

    const [searchQuery, setSearchQuery] =
        useState('');

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 10;


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredSpecifications =
        specifications.filter((spec) => {

            const search =
                searchQuery
                    .toLowerCase()
                    .trim();


            if (!search) {
                return true;
            }


            return (

                (spec.boxSpec || '')
                    .toLowerCase()
                    .includes(search)

                ||

                (spec.boxType || '')
                    .toLowerCase()
                    .includes(search)

                ||

                (spec.paperType || '')
                    .toLowerCase()
                    .includes(search)

            );
        });


    // =====================================================
    // PAGINATION
    // =====================================================

    const totalSpecifications =
        filteredSpecifications.length;


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalSpecifications /
                itemsPerPage
            )
        );


    const startIndex =
        (currentPage - 1) *
        itemsPerPage;


    const currentSpecifications =
        filteredSpecifications.slice(
            startIndex,
            startIndex + itemsPerPage
        );


    // =====================================================
    // RESET PAGE WHEN SEARCH CHANGES
    // =====================================================

    useEffect(() => {

        setCurrentPage(1);

    }, [searchQuery]);


    // =====================================================
    // PAGINATION
    // =====================================================

    const handlePrevious = () => {

        if (currentPage > 1) {

            setCurrentPage(
                previous => previous - 1
            );
        }
    };


    const handleNext = () => {

        if (currentPage < totalPages) {

            setCurrentPage(
                previous => previous + 1
            );
        }
    };


    return (

        <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 p-5">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3b30] via-[#b82db8] to-[#5a67d8] flex items-center justify-center">

                        <Box className="w-4 h-4 text-white" />

                    </div>


                    <h3 className="text-[16px] font-bold text-[#1a233a]">
                        Box Specifications
                    </h3>


                    <span className="text-[13px] text-gray-500 font-medium">
                        {totalSpecifications} Specifications
                    </span>

                </div>


                {/* Search */}

                <div className="relative w-[270px]">

                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={17}
                    />


                    <input
                        type="text"
                        value={searchQuery}
                        onChange={
                            event =>
                                setSearchQuery(
                                    event.target.value
                                )
                        }
                        placeholder="Search box code or type"
                        className="w-full h-10 pl-9 pr-3 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-[#a855f7] focus:ring-1 focus:ring-[#e9d5ff] transition-all"
                    />

                </div>

            </div>


            {/* =========================================
                DIMENSIONS
            ========================================= */}

            <div className="flex items-center gap-2 mb-4">

                <Info className="w-4 h-4 text-gray-500" />

                <span className="text-[12px] text-gray-500 font-medium">
                    Dimensions in inches
                </span>

            </div>


            {/* =========================================
                TABLE
            ========================================= */}

            <div className="border border-gray-200 rounded-lg overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px]">

                        <thead>

                            <tr className="border-b border-gray-200 bg-white">

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    Box Spec
                                </th>

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    Box Type
                                </th>

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    Paper Type
                                </th>

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    Size
                                </th>

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    Ply
                                </th>

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    L
                                </th>

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    W
                                </th>

                                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#1a233a]">
                                    H
                                </th>

                                <th className="w-[45px]"></th>

                            </tr>

                        </thead>


                        <tbody>

                            {currentSpecifications.length > 0 ? (

                                currentSpecifications.map(
                                    (spec, index) => (

                                        <tr
                                            key={`${spec.boxSpec}-${index}`}
                                            className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                                        >

                                            <td className="px-4 py-3.5">

                                                <span className="text-[12px] font-semibold text-[#1a233a]">
                                                    {spec.boxSpec || '-'}
                                                </span>

                                            </td>


                                            <td className="px-4 py-3.5">

                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[11px] font-medium ${
                                                        spec.boxType === 'Universal'
                                                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                                                            : 'bg-purple-50 text-purple-600 border-purple-200'
                                                    }`}
                                                >
                                                    {spec.boxType || '-'}
                                                </span>

                                            </td>


                                            <td className="px-4 py-3.5">

                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[11px] font-medium ${
                                                        spec.paperType === 'NS'
                                                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                                                            : 'bg-green-50 text-green-600 border-green-200'
                                                    }`}
                                                >
                                                    {spec.paperType || '-'}
                                                </span>

                                            </td>


                                            <td className="px-4 py-3.5 text-[12px] text-gray-600">
                                                {spec.size || spec.boxSize || '-'}
                                            </td>


                                            <td className="px-4 py-3.5 text-[12px] text-gray-600">
                                                {spec.ply ?? '-'}
                                            </td>


                                            <td className="px-4 py-3.5 text-[12px] text-gray-600">
                                                {spec.length ?? '-'}
                                            </td>


                                            <td className="px-4 py-3.5 text-[12px] text-gray-600">
                                                {spec.width ?? '-'}
                                            </td>


                                            <td className="px-4 py-3.5 text-[12px] text-gray-600">
                                                {spec.height ?? '-'}
                                            </td>


                                            <td className="px-2 py-3.5 text-center">

                                                <button
                                                    type="button"
                                                    className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="px-4 py-10 text-center text-[12px] text-gray-500"
                                    >
                                        No box specifications found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* =========================================
                    PAGINATION
                ========================================= */}

                <div className="flex items-center justify-between px-4 py-3.5">

                    <div className="text-[12px] text-gray-500">

                        {totalSpecifications > 0 ? (

                            <>
                                Showing{' '}

                                <span className="font-medium text-gray-700">
                                    {startIndex + 1}
                                </span>

                                {' '}to{' '}

                                <span className="font-medium text-gray-700">
                                    {Math.min(
                                        startIndex +
                                        itemsPerPage,
                                        totalSpecifications
                                    )}
                                </span>

                                {' '}of{' '}

                                <span className="font-medium text-gray-700">
                                    {totalSpecifications}
                                </span>

                                {' '}specifications
                            </>

                        ) : (

                            'Showing 0 specifications'

                        )}

                    </div>


                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>


                        <button
                            type="button"
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#8b5cf6] bg-white text-[#7c3aed] text-[12px] font-semibold"
                        >
                            {currentPage}
                        </button>


                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={
                                currentPage === totalPages
                            }
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default BoxSpecifications;