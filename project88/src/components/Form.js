import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Validation } from "../validation/Validation";

const Form = ({ initialValues, onSubmit, btn }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(Validation),
        defaultValues: initialValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} initialValues={initialValues}>
            {Object.keys(initialValues).map((field, index) => (
                <div className="mb-4" key={index}>
                    {field === "gender" ? (
                        <div className="flex space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    value="Male"
                                    {...register(field)}
                                    id={`${field}-male`}
                                /> Nam
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Female"
                                    {...register(field)}
                                    id={`${field}-female`}
                                /> Nữ
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Other"
                                    {...register(field)}
                                    id={`${field}-Other`}
                                /> Khác
                            </label>
                        </div>
                    ) : (
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            {...register(field)}
                            type={field.includes("password") || field.includes("confirmPassword") ? "password" : "text"}
                            id={field}
                            name={field}
                            placeholder={field.includes("password") || field.includes("confirmPass") ? "********" : `Nhập ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                        />
                    )}
                    {errors[field] && (
                        <p className="text-red-500 text-sm mt-1">{errors[field]?.message}</p>
                    )}
                </div>

            ))}
            <button
                type="submit"
                className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition"
            >
                {btn}
            </button>
        </form>
    )
}

export default Form;