"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function CustomNavBar() {
  const pathname = usePathname();

  const index = pathname == "/home" ? true : false;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: "Inicio", href: "#" },
    { name: "Servicio", href: "#services" },
    { name: "Por qué debes escogernos", href: "#why" },
    { name: "Contacto", href: "contact-us/" },
  ];

  console.log(isMenuOpen)

  return (
    <Navbar className="bg-background" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-primary"
        />
        <NavbarBrand>
          <Link href="/">
            <h2 className="text-2xl font-bold text-inherit text-white md:pl-20">
              COMPUTECNICOS
            </h2>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href={index ? "#" : "/"}>
            <span className="text-[#fafafa] hover:text-primary hover:transition-colors hover:duration-300 hover:ease-in-out">
              Inicio
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={index ? "#services" : "home/#services"}
            aria-current="page"
          >
            <span className="text-[#fafafa] hover:text-primary hover:transition-colors hover:duration-300 hover:ease-in-out">
              Servicio
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={index ? "#why" : "home/#why"}>
            <span className="text-[#fafafa] hover:text-primary hover:transition-colors hover:duration-300 hover:ease-in-out">
              Por qué debes escogernos
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="contact-us/">
            <span className="text-[#fafafa] hover:text-primary hover:transition-colors hover:duration-300 hover:ease-in-out">
              Contacto
            </span>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, i) => (
          <NavbarMenuItem key={`${i}-${index}`}>
            <Button
              className="w-full text-white bg-primary"
              href={index ? `${item.href}` : `home/${item.href}`}
              size="lg"
	      onPress={toggleMenu}
	      as={Link}
            >
              {item.name}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
