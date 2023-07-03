"use client"

import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import { CustomButton } from "../Index";
import { updateSearchparams } from "@/utils";

const ShowMore = ({pageNumber, isNext}: ShowMoreProps) => {
    const router = useRouter();

    const handleNavigate = () => {
        const newLimit = (pageNumber + 1) * 10;
        const newpathName = updateSearchparams("limit", `${newLimit}`)

        router.push(newpathName);
    }
  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton
            title="Show More"
            btnType="button"
            containerStyles="bg-primary-blue rounded-full text-white"
            handleClick={handleNavigate}/>
        )}
    </div>
  )
}

export default ShowMore