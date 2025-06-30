// import { parse } from 'date-fns';
import { z } from 'zod';
import UserApi from '../api/UserApi';

export const Validation = z.object({
    username: z.string().min(6, "Tên tài khoản phải có ít nhất 6 ký tự")
        .refine(async (value) => {
            const rs = await UserApi.isExistUsername(value);
            return !rs.data;
        }, {
            message: "Username đã tồn tại"
        }),
    firstName: z.string().nonempty("Họ phải bắt buộc"),
    lastName: z.string().nonempty("Tên phải bắt buộc"),
    email: z.string().nonempty("Email phải bắt buộc").email("Email không hợp lệ")
        .refine(async (value) => {
            const rs = await UserApi.isExistEmail(value);
            return !rs.data;
        }, {
            message: "Email đã tồn tại"
        }),
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
        .regex(/^\d{10}$/, { message: "Số điện thoại phải gồm đúng 10 chữ số" })
        .refine(async (value) => {
            const rs = await UserApi.isExistPhone(value);
            return !rs.data;
        }, {
            message: "SDT đã tồn tại"
        }),
    password: z.string().min(6, "Mật khẩu cần ít nhất 6 ký tựtự"),
    confirmPassword: z
        .string()
        .min(6, "Xác nhận mật khẩu ít nhất 6 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
})