import { MessageCircle } from 'lucide-react'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useEffect } from 'react'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Player() {
  const { load, course, isLoading } = useStore((store) => {
    return {
      load: store.load,
      course: store.course,
      isLoading: store.isLoading,
    }
  })

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson?.title}`
  }, [currentLesson])

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside
            className={`w-80 absolute bottom-0 top-0 right-0 border-l border-zinc-800 bg-zinc-900 divide-y-2
                      divide-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-700`}
          >
            {isLoading && (
              <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                <div className="flex flex-col space-y-3">
                  {Array(8)
                    .fill(null)
                    .map((_, i) => {
                      return (
                        <div
                          key={i}
                          className="w-72 bg-gray-300 h-8 rounded-md "
                        ></div>
                      )
                    })}
                </div>
              </div>
            )}
            {!isLoading &&
              course?.modules &&
              course?.modules.map((module, index) => {
                return (
                  <Module
                    key={module.id}
                    moduleIndex={index}
                    title={module.title}
                    amountOfLessons={module.lessons.length}
                  />
                )
              })}
          </aside>
        </main>
      </div>
    </div>
  )
}
