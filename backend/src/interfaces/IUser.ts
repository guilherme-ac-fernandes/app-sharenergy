import { z } from 'zod';

const UserZodSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Name must have at least 3 characters' }),
  email: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .email({
      message: 'Must be valid email',
    }),
  phoneNumber: z.string({
    required_error: 'Phone number is required',
    invalid_type_error: 'Phone number must be a string',
  }),
  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string',
  }),
  cpf: z
    .number({
      required_error: 'CPF is required',
      invalid_type_error: 'CPF must be a number',
    }),
});

type IUser = z.infer<typeof UserZodSchema>;

export { UserZodSchema, IUser };
