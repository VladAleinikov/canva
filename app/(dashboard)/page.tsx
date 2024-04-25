"use client"

import { CreateOrganization, useOrganization } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { BoardList } from "./_components/board-list"
import { Empty } from "./_components/empty"

interface DashboardPageProps {
  searchParams: {
    search?: string,
    favorites?: string
  }
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization
        ? <Empty
          imageUrl="/elements.svg"
          title="Приветствуем в Canva"
          subtitle="Создайте организацию чтобы начать!"
        >
          <div className="mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  Создать организацию
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 bg-transparent border-none max-w-[432px]">
                <CreateOrganization routing="hash" />
              </DialogContent>
            </Dialog>
          </div>
        </Empty>
        : <BoardList orgId={ organization.id} query={searchParams}/>}
    </div>
  )
}

export default DashboardPage