// import { parse } from 'date-fns';
import { z } from 'zod';

export const Validation = z.object({
    username: z.string().nonempty("Tên tài khoản phải có ít nhất 6 ký tự"),
    firstName: z.string().nonempty("Họ phải bắt buộc"),
    lastName: z.string().nonempty("Tên phải bắt buộc"),
    email: z.string().nonempty("Email phải bắt buộc").email("Email không hợp lệ"),
    birth: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Ngày không hợp lệ"
    }),
    cccd: z
        .string()
        .nonempty({ message: "CCCD không được để trống" })
        .regex(/^\d{12}$/, { message: "CCCD phải gồm đúng 12 chữ số" }),
    gender: z.enum(['Male', 'Female', 'Other'], {
        errorMap: () => ({ message: 'Vui lòng chọn giới tính' })
    }),
    phone: z
        .string()
        .nonempty({ message: "Số điện thoại không được để trống" })
        .regex(/^\d{10}$/, { message: "Số điện thoại phải gồm đúng 10 chữ số" }),
    password: z.string().min(6, "Mật khẩu cần ít nhất 6 ký tựtự"),
    confirmPassword: z
        .string()
        .min(6, "Xác nhận mật khẩu ít nhất 6 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
})