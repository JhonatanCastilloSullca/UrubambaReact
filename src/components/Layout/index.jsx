import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Roles from '../../pages/Roles';
import Page404 from '../../pages/404';
import Page403 from '../../pages/403';
import MainLayout from '../InnerLayout';
import Sectores from '../../pages/Sectores';
import Manzanas from '../../pages/Manzanas';
import Vias from '../../pages/Vias';
import FichaCatalogacionEspaciosPublicos from '../../pages/FichaCatalogacionEspaciosPublicos';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';
import { AuthProvider } from '../Services/Auth/auth';





// Routes Config
function Layout() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />


                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="configuracion/sectores" element={<Sectores />} />
                        <Route path="configuracion/manzanas" element={<Manzanas />} />
                        <Route path="configuracion/vias" element={<Vias />} />
                        <Route path="fichas/ficha-catalogacion-espacios-publicos" element={<FichaCatalogacionEspaciosPublicos />} />
                        <Route path="404" element={<Page404 />} />
                        <Route path="403" element={<Page403 />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Layout;
