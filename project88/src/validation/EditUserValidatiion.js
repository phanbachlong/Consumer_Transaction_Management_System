import { z } from 'zod';
import UserApi from '../api/UserApi';

export const EditUserValidation = (originalEmail, originalPhone) => {

    return z.object({
        email: z.string().nonempty("Email không được để trống").email("Email không hợp lệ")
            .refine(async (value) => {
                if (value === originalEmail) return true;
                const rs = await UserApi.isExistEmail(value);
                return !rs.data;
            }, {
                message: "Email đã tòn tại"
            }),
        phone: z.string()
            .nonempty("Số điện thoại không được để trống")
            .regex(/^\d{10}$/, "Số điện thoại phải gồm đúng 10 chữ số")
            .refine(async (value) => {
                if (value === originalPhone) return true;
                const rs = await UserApi.isExistPhone(value);
                return !rs.data;
            }, {
                message: "SDT đã tồn tại"
            }),
    });
}