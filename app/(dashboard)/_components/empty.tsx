import Image from "next/image"

interface EmptyProps{
      imageUrl: string,
      title: string,
      subtitle?: string,
      children?: React.ReactNode
}

export const Empty = ({imageUrl, title, subtitle, children }:EmptyProps) => {
  return (
        <div className="h-full flex flex-col items-center justify-center">
              <Image
                    src={imageUrl}
                    alt="Empty"
                    width={200}
                    height={200}
              />
              <h2 className="text-2xl font-semibold mt-6">
                    {title}
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                    {subtitle}
              </p>
              {children}
    </div>
  )
}
