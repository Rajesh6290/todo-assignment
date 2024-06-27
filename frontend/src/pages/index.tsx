
import { AddTodo, AllToDos, Navbar } from '@/components';
import { useSwr } from '@/hooks';
const Home = () => {
  const { data, isValidating, mutate } = useSwr(`todos`)
  return (
    <section className=' w-full h-screen overflow-y-auto relative flex flex-col items-center gap-5 px-4'>
      <Navbar />
      <AddTodo mutate={mutate} />
      <AllToDos data={data} isValidating={isValidating} mutate={mutate} />
    </section>

  )
}

export default Home