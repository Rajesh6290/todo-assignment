import { useMutation } from '@/hooks';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import Button from './Button';
const AddTodo = ({ mutate }: { mutate: () => void }) => {
    const { isLoading, mutation } = useMutation()
    const validationSchema = Yup.object({
        title: Yup.string()
            .required("title is required"),
    });
    const initialValues = {
        title: "",
    };
    const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            const res = await mutation(`todos`, {
                method: "POST",
                isAlert: true,
                body: {
                    title: values.title,
                }
            })
            if (res?.status === 200) {
                mutate()
                resetForm();
                toast.success(res?.results?.msg)
            } else {
                toast.info(res?.results?.msg)
            }
        } catch (error) {
            toast.info(error instanceof Error)
        }
    }
    return (
        <div className='lg:w-[40%] w-full  flex flex-col gap-3  bg-white p-5 rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
            <p className=' w-full text-center font-semibold text-lg text-gray-700'>Add New Todo</p>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form className=" w-full flex md:flex-row flex-col items-center gap-3">
                        <div className="flex flex-col  gap-1 w-full">
                            <div className="relative w-full ">
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`block rounded-t-lg px-5 py-3 w-full text-lg bg-white ring-1  rounded-md text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 peer
                  ${props.touched.title && props.errors.title
                                            ? "ring-red-500"
                                            : "ring-gray-300"
                                        }
                  }
                  `}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="title"
                                    className={`absolute   bg-white px-2 duration-300 transform -translate-y-7 scale-75 top-3 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-focus:scale-75 peer-focus:-translate-y-7
                    ${props.touched.title && props.errors.title
                                            ? "text-red-500"
                                            : "text-gray-500 peer-placeholder-shown:translate-y-0"
                                        }
                    `}
                                >
                                    Title
                                </label>
                            </div>
                        </div>

                        <div className='md:w-[30%] w-full flex items-center justify-center'>
                            <Button loading={isLoading} type="submit">
                                Add Todo
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddTodo