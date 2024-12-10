import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ArrowDown from '../../assets/icons/arrowDown';
import ArrowUp from '../../assets/icons/arrowUp';

function SidebarLink({ to, icon, children, subLinks }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <li className="nav-item text-textAdmin-light dark:text-secondTextAdmin-dark">
            {subLinks ? (
                <>
                    <button
                        className={`nav-link w-full ${!isCollapsed ? 'collapsed' : ''}`}
                        onClick={toggleCollapse}
                        aria-expanded={!isCollapsed}
                        aria-controls="collapseSubMenu"
                    >
                        <div className="flex justify-between w-full">
                            <div className="flex items-center">
                                <span className="link-icon">{icon}</span>
                                <span className="link-title">{children}</span>
                            </div>
                            <span className="collapse-icon">
                                {isCollapsed ? <ArrowDown strokeWidth={2} strokeColor="currentColor" /> : <ArrowUp strokeWidth={2} strokeColor="currentColor" />}
                            </span>
                        </div>
                    </button>
                    <div
                        className={`collapse transition-all duration-300 ${!isCollapsed ? 'show' : 'hidden'}`}
                        id="collapseSubMenu"
                    >
                        <ul className="nav sub-menu">
                            {subLinks.map((subLink) => (
                                <li className="nav-item" key={subLink.to}>
                                    <NavLink to={subLink.to} className="nav-link">
                                        {subLink.text}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="link-icon">{icon}</span>
                    <span className="link-title">{children}</span>
                </NavLink>
            )}
        </li>
    );
}

export default SidebarLink;
