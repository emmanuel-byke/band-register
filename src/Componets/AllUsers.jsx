import { useState } from "react";
import UserCard from "./UserCard";
import Pagination from "./Pagination";

export default function AllUsers(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(props.users.length / itemsPerPage);
    const paginatedUsers = props.users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full space-y-8">

            {/* Users Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {paginatedUsers.map((user) => (
                    <UserCard 
                        key={user.id}
                        user={user}
                        userRole={user.userRole}
                    />
                ))}
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
}