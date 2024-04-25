import Image from "next/image"


export const Loading = () => {
  return (
        <div className="w-fulll h-full flex flex-col justify-center items-center">
              <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="animate-spin duration-7000"
              />
    </div>
  )
}
