import { Plus } from "lucide-react"
import { ResumeCardButton } from "../resume-card"

export const AddResumeButton = () => {
    return(
        <ResumeCardButton
            title="teste"
            description="teste adicionar"
            icon={<Plus size={50} />}
        />
    )
}