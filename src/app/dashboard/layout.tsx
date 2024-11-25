"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Logo from "@/assets/logo_epamig.svg";
import { NavItems } from "@/components/pages/dashboard/nav-items";
import { UserDropdown } from "@/components/pages/dashboard/user-dropdown";
import { ThemeToggle } from "@/components/pages/shared/theme-toggle";
import { Menu, X } from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <div className="w-full h-screen overflow-hidden grid grid-cols-[1fr] md:grid-cols-[300px,1fr] bg-background text-foreground">
      {/* Botão de menu para dispositivos móveis */}
      <div className="md:hidden w-full p-4 flex items-center justify-between border-b border-border">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 border rounded-md border-border bg-card hover:bg-muted"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        ref={menuRef}
        className={`fixed inset-y-0 left-0 z-40 bg-card w-[250px] transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative transition-transform duration-300 shadow-lg md:shadow-none border-r border-border`}
      >

        <div className="w-full p-6 border-b border-border">
          <Logo className="max-w-[200px] mx-auto" />
        </div>

        <div className="w-full mt-auto border-b border-border px-3 py-4 flex items-center justify-between gap-2">
          <UserDropdown />
          <ThemeToggle />
        </div>

        <NavItems />


      </aside>



      {/* Conteúdo principal */}
      <main className="p-6 flex flex-col w-full h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
