import { z } from "zod";
import UserApi from "../api/UserApi";

export const CreateEmployeeValidation = z.object({
    firstName: z.string().nonempty("Họ phải bắt buộc"),
    lastName: z.string().nonempty("Tên phải bắt buộc"),
    username: z.string().min(6, "Tên tài khoản phải có ít nhất 6 ký tự")
        .refine(async (value) => {
            const rs = await UserApi.isExistUsername(value);
            return !rs.data;
        }, {
            message: "Username đã tồn tại"
        }),
    email: z.string().nonempty("Email không được để trống").email("Không đúng định dạng email")
        .refine(async (value) => {
            const res = await UserApi.isExistEmail(value);
            return !res.data;
        }, {
            message: "Email đã tồn tại"
        }),
    cccd: z
        .string()
        .nonempty({ message: "CCCD không được để trống" })
        .regex(/^\d{12}$/, { message: "CCCD phải gồm đúng 12 chữ số" })
        .refine(async (value) => {
            const rs = await UserApi.isExistCccd(value);
            return !rs.data;
        }, {
            message: "CCCD đã tồn tại"
        }),
    gender: z.enum(['Male', 'Female', 'Other'], {
        errorMap: () => ({ message: 'Vui lòng chọn giới tính' })
    }),
    birth: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Ngày không hợp lệ"
    }),
    phone: z
        .string()
        .nonempty({ message: "Số điện thoại không được để trống" })
        .regex(/^\d{10}$/, { message: "Số điện thoại phải gồm đúng 10 chữ số" })
        .refine(async (value) => {
            const rs = await UserApi.isExistPhone(value);
            return !rs.data
        }, {
            message: "SDT đã tồn tại"
        }),
})