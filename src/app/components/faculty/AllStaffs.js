"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import axios from 'axios';

const StaffCard = dynamic(() => import("./Staffcard"), {
    loading: () => (
        <div className="w-[100%] h-[100%] m-4 p-4 bg-[grey]">Loading</div>
    ),
});
const AllStaffs = () => {
    const [otheremployee, setotheremployee] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setloading] = useState(false);
    // const api = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/faculty?type=all`;
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                setloading(true);

                let allFaculty = [];
                let page = 1;
                let totalPages = 1;

                do {
                    const { data } = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/faculty?type=all&page=${page}&limit=50`
                    );

                    allFaculty.push(...data.data);
                    totalPages = data.totalPages;
                    page++;
                } while (page <= totalPages);

                const filteredFaculty = allFaculty.filter(
                    (item) => item.department === "Other Employees"
                );

                setotheremployee(filteredFaculty);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setloading(false);
            }
        };

        fetchFaculty();
    }, []);
    if (error) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-center">
                    <p className="text-red-500">Sorry, failed to fetch the otheremployee data.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-wrap justify-center gap-10 p-5 my-2 text-black">
            {loading ? <>Loading ...</> : <></>}
            {otheremployee?.map((faculty) =>
                <StaffCard
                    key={faculty.id}
                    name={faculty.name}
                    image={faculty.image}
                    designation={faculty.designation}
                    email={faculty.email}
                />)
            }
        </div>
    )
}

export default AllStaffs
