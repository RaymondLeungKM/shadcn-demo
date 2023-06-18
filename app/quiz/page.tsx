import Image from "next/image";

export default function Quiz() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Browse all quizzes:
      </h1>
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Browse by category</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
            <p className="relative z-10 text-white font-bold text-2xl">Physics</p>
            <Image className="brightness-50 group-hover:brightness-75 group-hover:scale-110 duration-500" src="/quiz-categories/physics.jpg" alt="Physics" fill/>
          </div>
          <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
            <p className="relative z-10 text-white font-bold text-2xl">Chemistry</p>
            <Image className="brightness-50 group-hover:brightness-75 group-hover:scale-110 duration-500" src="/quiz-categories/chemistry.jpg" alt="Physics" fill/>
          </div>
          <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
            <p className="relative z-10 text-white font-bold text-2xl">Biology</p>
            <Image className="brightness-50 group-hover:brightness-75 group-hover:scale-110 duration-500" src="/quiz-categories/biology.jpg" alt="Physics" fill/>
          </div>
          <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
            <p className="relative z-10 font-bold text-2xl duration-500 group-hover:scale-125">All Quiz &gt;</p>
          </div>
        </div>
      </section>
    </div>
  )
}
