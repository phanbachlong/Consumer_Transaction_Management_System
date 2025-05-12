import { z } from 'zod';

export const ValidationLogin = z.object({
    username: z.string().min(6, "Tên tài khoản phải có ít nhất 6 ký tự"),

    password: z.string().min(6, "Mật khẩu cần ít nhất 6 ký tự"),

})