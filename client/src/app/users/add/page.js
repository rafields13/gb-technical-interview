"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddUserPage() {
	const [formData, setFormData] = useState({ name: "", email: "" });
	const router = useRouter();
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await axios.post("http://localhost:5000/users", formData);
			router.push("/users");
		} catch (err) {
			if (err.response && err.response.status === 409) {
				setError("This email is already in use.");
			} else {
				console.error("Error adding user:", err);
			}
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
			<h1 className="text-xl font-semibold text-gray-900">Add User</h1>
			<form onSubmit={handleSubmit} className="mt-6 space-y-6">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-900">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Freddie Mercury"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2"
						required
					/>
				</div>
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-900">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="freddie.mercury@example.com"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2"
						required
					/>
				</div>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				<div className="flex justify-end gap-4">
					<button
						type="button"
						className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
						onClick={() => router.push("/users")}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
