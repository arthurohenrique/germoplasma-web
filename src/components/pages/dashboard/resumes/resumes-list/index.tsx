import { ResumeCard } from "../resume-card";
import { AddResumeButton } from "./add-resume-button";

export const Resumeslist = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max gap-4 lg:gap-5 flex-1">
        <AddResumeButton /> 
        <ResumeCard /> 
        <ResumeCard /> 
        <ResumeCard /> 
    </section>
  );
}