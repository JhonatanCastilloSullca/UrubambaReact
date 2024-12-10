// routes.js
const routes = [
    {
        to: '/',
        text: 'Dashboard',
        private: true,
        icon: 'MenuIcon', // Nombre del ícono correspondiente
    },
    {
        to: '/roles',
        text: 'Roles',
        private: true,
        icon: 'MenuIcon',
    },
    {
        text: 'Configuración',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            { to: '/configuracion/sectores', text: 'Sectores' },
            { to: '/configuracion/manzanas', text: 'Manzanas' },
            { to: '/configuracion/vias', text: 'Vías' },
        ],
    },
    {
        text: 'Fichas',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            { to: '/fichas/ficha-catalogacion-espacios-publicos', text: 'Ficha de catalogación espacios públicos' },
        ],
    },
    {
        to: '/login',
        text: 'Login',
        private: false,
        publicOnly: true,
        icon: 'MenuIcon',
    },
    {
        to: '/logout',
        text: 'Logout',
        private: true,
        icon: 'MenuIcon',
    },
];

export default routes;
