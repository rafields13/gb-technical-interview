"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UsersPage() {
	const [users, setUsers] = useState([]);
	const router = useRouter();

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const res = await axios.get("http://localhost:5000/users");
			setUsers(res.data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	const handleDelete = async (id) => {
		if (confirm("Are you sure you want to delete this user?")) {
			try {
				await axios.delete(`http://localhost:5000/users/${id}`);
				fetchUsers();
			} catch (error) {
				console.error("Error deleting user:", error);
			}
		}
	};

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold text-gray-900">Users</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all users including their name and email.
					</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<button
						type="button"
						className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={() => router.push("/users/add")}
					>
						Add user
					</button>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
										Name
									</th>
									<th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Email
									</th>
									<th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Created At
									</th>
									<th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{users.map((user) => (
									<tr key={user.id}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
											{user.name}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{user.email}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{new Date(user.created_at).toLocaleString()} {/* Formata a data */}
										</td>
										<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex gap-2">
											<button
												onClick={() => router.push(`/users/edit/${user.id}`)}
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</button>
											<button
												onClick={() => handleDelete(user.id)}
												className="text-red-600 hover:text-red-900"
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
