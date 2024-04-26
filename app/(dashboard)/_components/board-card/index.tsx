"use client"

import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./overlay"
import { useAuth } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { Footer } from "./footer"
import { Skeleton } from "@/components/ui/skeleton"

interface BoardCardProps {
  _id: string,
  title: string,
  imageUrl: string,
  authorId: string,
  authorName: string,
  _creationTime: number,
  orgId: string,
  isFavorite: boolean
}

export const BoardCard = ({
  _id,
  title,
  imageUrl,
  authorId,
  authorName,
  _creationTime,
  orgId,
  isFavorite
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId == authorId ? "Вы" : authorName;
  const createdAtLabel = formatDistanceToNow(_creationTime, {
    addSuffix: true
  })

  return (
    <Link href={`/board/${_id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fit"
          />
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => { }}
          disabled={false}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  )
}