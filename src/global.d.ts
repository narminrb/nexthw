export type NavbarItemsProps = {
    navItems: any
}

export type CardComponentProps = {
    image: string;
    desc?: string;
    title?: string;
    price?: string | number;
    onClick?: () => void;
    className?: string;
    link: string;
    categories: []
}