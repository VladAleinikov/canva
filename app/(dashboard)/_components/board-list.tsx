"use client"

import { Button } from "@/components/ui/button";
import { Empty } from "./empty";

interface BoardListProps {
      orgId: string,
      query: {
            search?: string,
            favorites?: string
      }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
      const data = [];

      if (!data.length && query.search) {
            return (
                  <Empty
                        imageUrl="/empty-search.svg"
                        title="Ничего не найдено по запросу!"
                        subtitle="Попробуй найти что-нибудь другое"
                  />
            )
      }
      if (!data.length && query.favorites) {
            return (
                  <Empty
                        imageUrl="/empty-favorites.svg"
                        title="Нет любимых досок!"
                        subtitle="Попробуй добавить доску в список любимых"
                  />
            )
      }
      if (!data.length) {
            return (
                  <Empty
                        imageUrl="/empty-boards.svg"
                        title="Нет досок!"
                        subtitle="Попробуй создать свою первую"
                  >
                        <div className="mt-6">
                              <Button
                                    size="lg"
                              >
                                    Создать!
                              </Button>
                        </div>
                  </Empty>
            )
      }
      return (
            <div>BoardList</div>
      )
}
