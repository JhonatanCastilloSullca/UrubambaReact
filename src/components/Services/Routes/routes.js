
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
        to: '/roles',
        text: 'Roles',
        private: true,
        icon: 'MenuIcon',
    },
    {
        text: 'Mantenimiento',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            { to: '/configuracion/sectores', text: 'Sectores' },
            { to: '/configuracion/manzanas', text: 'Manzanas' },
            { to: '/configuracion/vias', text: 'Vías' },
            { to: '/configuracion/vias', text: 'Tecnicos' },
        ],
    },
    {
        text: 'Fichas',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            { to: '/fichas/ficha-catalogacion-espacios-publicos', text: 'Ficha de catalogación espacios públicos' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles', text: 'Ficha de registro de catalogación de inmuebles' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles-area-monumental', text: 'Ficha de registro de catalogación de inmuebles del area monumental' },
        ],
    },
    {
        text: 'Impresion de Fichas',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            { to: '/fichas/ficha-catalogacion-espacios-publicos', text: 'Ficha de catalogación espacios públicos' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles', text: 'Ficha de registro de catalogación de inmuebles' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles-area-monumental', text: 'Ficha de registro de catalogación de inmuebles del area monumental' },
        ],
    },
    {
        text: 'Reportes',
        private: true,
        icon: 'MenuIcon',
        subLinks: [
            { to: '/fichas/ficha-catalogacion-espacios-publicos', text: 'Reporte de Fichas' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles', text: 'Reporte de Titular' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles-area-monumental', text: 'Reporte por Usuario' },
            { to: '/fichas/ficha-catalogacion-espacios-publicos', text: 'Reporte por llenado' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles', text: 'Reporte por Usuario' },
            { to: '/fichas/ficha-registro-catalogacion-inmuebles-area-monumental', text: 'Reporte por Fechas' },
        ],
    },
    {
        to: '/login',
        text: 'Progreso de fichas',
        private: false,
        publicOnly: true,
        icon: 'MenuIcon',
    },
    {
        to: '/logout',
        text: 'Visor de mapas',
        private: true,
        icon: 'MenuIcon',
    },
];

export default routes;
