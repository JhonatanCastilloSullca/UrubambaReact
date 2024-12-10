import routes from '../Services/Routes/routes'
import SidebarLink from '../SidebarLink';
import * as Icons from '../../assets/icons';

function Sidebar({ isOpen }) {
    return (
        <aside
            className={`border-2 bg-backAdmin-light dark:bg-backAdmin-dark border-borderAdmin-light dark:border-borderAdmin-dark flex-shrink-0 w-64 flex flex-col border-r transition-all duration-300 ${isOpen ? '' : '-ml-64'}`}
        >

            <div className="h-16 bg-backAdmin-light dark:bg-backAdmin-dark text-gray-900 dark:text-white"></div>
            <nav className="sidebar-body flex bg-backAdmin-light dark:bg-backAdmin-dark flex-col p-6 pb-12">
                <ul className="nav">

                    {routes.map((route) => {
                        const IconComponent = Icons[route.icon]; // Resuelve el ícono desde el objeto Icons
                        return (
                            <SidebarLink
                                key={route.to || route.text}
                                to={route.to}
                                icon={IconComponent && <IconComponent strokeWidth={3} strokeColor="currentColor" />}
                                subLinks={route.subLinks}
                            >
                                {route.text}
                            </SidebarLink>
                        );
                    })}

                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
