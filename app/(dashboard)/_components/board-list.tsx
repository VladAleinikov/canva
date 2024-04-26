"use client"

import { Button } from "@/components/ui/button";
import { Empty } from "./empty";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
      orgId: string,
      query: {
            search?: string,
            favorites?: string
      }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
      const data = useQuery(api.boards.get, { orgId });

      if (data === undefined) {
            return (
                  <div>
                        <h2 className="text-3xl">
                              {query.favorites ? "Любимые доски" : "Доски команды"}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                              <NewBoardButton orgId={orgId} disabled />
                              <BoardCard.Skeleton />
                              <BoardCard.Skeleton />
                              <BoardCard.Skeleton />
                              <BoardCard.Skeleton />
                              <BoardCard.Skeleton />
                        </div>
                  </div>
            )
      }
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
            <div>
                  <h2 className="text-3xl">
                        {query.favorites ? "Любимые доски" : "Доски команды"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                        <NewBoardButton orgId={orgId} />
                        {data.map((board) =>
                              <BoardCard key={board._id} isFavorite={false} {...board} />
                        )}
                  </div>
            </div>
      )
}