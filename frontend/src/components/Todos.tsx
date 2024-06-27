import { useMutation } from "@/hooks";
import { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { MdDelete, MdEdit, MdOutlinePendingActions } from 'react-icons/md';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Skelton from "./Skelton";
import EditTodo from "./EditTodo";
const Todos = ({ data, isValidating, mutate }: any) => {
    const { isLoading, mutation } = useMutation()
    const [open, setOpen] = useState(false)
    const [editDetails, setEditDetails] = useState<any>()
    const handleDelete = (id: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",

                text: `You want to  delete`,

                icon: "warning",

                showCancelButton: true,

                confirmButtonColor: "#3085d6",

                cancelButtonColor: "#d33",

                confirmButtonText: `Yes, Delete !`,
            }).then(async (result: any) => {
                if (result.isConfirmed) {
                    const res = await mutation(`todos/${id}`, {
                        method: "DELETE",
                        isAlert: true
                    })
                    if (res?.status === 200) {
                        mutate()
                        toast.success("Deleted Successfully")
                    } else {
                        toast.error(res?.results?.msg)
                    }
                }
            })
        } catch (error) {
            toast.info(error instanceof Error)
        }
    }
    const handleEdit = async (id: string) => {
        try {
            const res = await mutation(`todos/${id}`, {
                method: "PUT",
                isAlert: true,
                body: {
                    completed: true
                }
            })
            if (res?.status === 200) {
                mutate()
                toast.success("Todo Completed Successfully")
            } else {
                toast.error(res?.results?.msg)
            }
        } catch (error) {
            toast.info(error instanceof Error)
        }
    }
    return (
        <>
            {open && <EditTodo open={open} close={setOpen} item={editDetails} mutate={mutate} />}
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2  w-full">
                {
                    isValidating ? (
                        <Skelton />
                    ) :
                        data?.length > 0 ?
                            data.map((item: any) => (
                                <div key={item?._id} className="p-2 sm:w-1/2 w-full relative">
                                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        {
                                            item?.completed === false ?
                                                <MdOutlinePendingActions className="text-2xl text-yellow-300 mr-2" /> :
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                                    className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                                    <path d="M22 4L12 14.01l-3-3"></path>
                                                </svg>
                                        }
                                        <span className="font-medium capitalize">{item?.title}</span>
                                    </div>
                                    <div className=' absolute top-6 right-4 flex items-center gap-3'>
                                        <MdEdit onClick={() => {
                                            setOpen(true);
                                            setEditDetails(item)
                                        }} className=" text-2xl text-blue-500 cursor-pointer " />
                                        <MdDelete onClick={() => handleDelete(item?._id)} className=" text-2xl text-red-500 cursor-pointer " />
                                        {
                                            item?.completed === false &&
                                            <div className=' relative group'>

                                                <CiMenuKebab className=' text-2xl text-gray-700 cursor-pointer' />


                                                <article onClick={() => handleEdit(item?._id)} className='z-10 hidden group-hover:block absolute px-4 py-2 bg-white -top-10 left-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-gray-600 cursor-pointer font-semibold tracking-wide rounded-lg'>Completed</article>

                                            </div>
                                        }
                                    </div>
                                </div>
                            )) : <p className="w-full text-center">No Todo Found!</p>
                }


            </div>
        </>

    )
}

export default Todos

