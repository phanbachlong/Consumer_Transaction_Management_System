import { z } from 'zod';

export const Validation = z.object({
    username: z.string().min(6, "Tên tài khoản phải có ít nhất 6 ký tự"),
    firstName: z.string().min(1, "Họ phải bắt buộc"),
    lastName: z.string().min(1, "Tên phải bắt buộc"),
    email: z.string().min(1, "Email phải bắt buộc").email("Email không hợp lệ"),
    gender: z.enum(['Male', 'Female', 'Other'], {
        errorMap: () => ({ message: 'Vui lòng chọn giới tính' })
    }),
    password: z.string().min(6, "Mật khẩu cần ít nhất 6 ký tựtự"),
    confirmPassword: z
        .string()
        .min(6, "Xác nhận mật khẩu ít nhất 6 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
})