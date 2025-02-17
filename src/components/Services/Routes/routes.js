
const routes = [
    {
        to: '/',
        text: 'Dashboard',
        private: true,
        icon: 'MenuIcon',
    },
    {
        to: '/usuarios',
        text: 'Usuarios',
        private: true,
        icon: 'MenuIcon',
    },

    {
        text: 'Fichas',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            // { to: '/fichas/ficha-catalogacion-espacios-publicos', text: 'Ficha de catalogación espacios públicos' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles', text: 'Ficha de registro de catalogación de inmuebles' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles-area-monumental', text: 'Ficha de registro de catalogación de inmuebles del area monumental' },
            { to: '/fichas/ficha-registro-historico', text: 'Ficha de registro Historico' },
        ],
    },
    {
        text: 'Impresion de Fichas',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            // { to: '/fichas/ficha-catalogacion-espacios-publicos', text: 'Ficha de catalogación espacios públicos' },
            { to: '/impresion/ficha-registro-catalogacion-inmuebles', text: 'Ficha de registro de catalogación de inmuebles' },
            { to: '/impresion/ficha-registro-catalogacion-inmuebles-area-monumental', text: 'Ficha de registro de catalogación de inmuebles del area monumental' },
            { to: '/impresion/ficha-registro-historico', text: 'Ficha de registro Historico' },
        ],
    },

];

export default routes;
