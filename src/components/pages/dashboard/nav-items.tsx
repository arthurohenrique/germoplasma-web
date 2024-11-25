"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coffee, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarouselCards } from "./carousel-cards";



export const NavItems = () => {
    
    const pathname = usePathname();

    const navItems = [
        {
            label: "Consultar",
            icon: Coffee,
            path: "/dashboard/resumes",
        },
        {
            label: "Cadastrar",
            icon: Plus,
            path: "/dashboard/account",
        }
    ];


    return (
        <nav className="w-full flex flex-col gap-2 px-2 py-4 h-f">

            {navItems.map((item) => {

                const isActive = pathname.startsWith(item.path);
                
                return (

                    <Link key={item.path} href={item.path}>
                        
                        <Button variant="ghost" className={cn(
                            "w-full gap-2 justify-start",
                            isActive && "bg-accent",
                        )}>

                            <item.icon size={16} />
                            {item.label}

                        </Button>

                    </Link>

                );
            })}
        <CarouselCards /> 
        </nav>
        
        
    )
}