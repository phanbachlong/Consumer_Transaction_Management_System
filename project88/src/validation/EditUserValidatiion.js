import { z } from 'zod';

export const EditUserValidation = z.object({
    email: z.string().nonempty("Email không được để trống").email("Email không hợp lệ"),
    phone: z.string()
        .nonempty("Số điện thoại không được để trống")
        .regex(/^\d{10}$/, "Số điện thoại phải gồm đúng 10 chữ số"),
})