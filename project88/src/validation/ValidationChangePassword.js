import { z } from 'zod';

export const ValidationChangePassword = z.object({
    password: z.string().min(6, "Mật khẩu cần ít nhất 6 ký tựtự"),
    confirmPassword: z
        .string()
        .min(6, "Xác nhận mật khẩu ít nhất 6 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
})