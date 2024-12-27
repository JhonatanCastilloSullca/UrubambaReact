import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
import { AuthProvider, useAuth } from '../Services/Auth/auth';
import FichaRegistroCatalogacionInmuebles from '../../pages/FichaRegistroCatalogacionInmuebles';
import FichaRegistroCatalogacionInmueblesAreaMonumental from '../../pages/FichaRegistroCatalogacionInmueblesAreaMonumental';
import Usuarios from '../../pages/Usuarios';
import Tecnicos from '../../pages/Tecnicos';
import FichaRegistroHistorico from '../../pages/FichaRegistroHistorico';
import ImpresionFichaRegistroHistorico from '../../pages/ImpresionFichaRegistroHistorico';
import ImpresionFichaRegistroCatalogacionInmuebles from '../../pages/ImpresionFichaRegistroCatalogacionInmuebles';
import ImpresionFichaRegistroCatalogacionInmueblesAreaMonumental from '../../pages/ImpresionFichaRegistroCatalogacionInmueblesAreaMonumental';
import ImpresionFichaRegistroHistoricoShow from '../../pages/ImpresionFichaRegistroHistoricoShow';
import ImpresionFichaRegistroCatalogacionInmueblesShow from '../../pages/ImpresionFichaRegistroCatalogacionInmueblesShow';
import ImpresionFichaRegistroCatalogacionInmueblesAreaMonumentalShow from '../../pages/ImpresionFichaRegistroCatalogacionInmueblesAreaMonumentalShow';

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    console.log("ProtectedRoute: user", user);

    return user ? children : <Navigate to="/login" replace />;
}




function PublicRoute({ children }) {
    const { user } = useAuth();
    console.log("PublicRoute: user", user);

    return user ? <Navigate to="/" replace /> : children;
}

function Layout() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        path="login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="logout" element={<Logout />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="usuarios" element={<Usuarios />} />
                        <Route path="configuracion/sectores" element={<Sectores />} />
                        <Route path="configuracion/manzanas" element={<Manzanas />} />
                        <Route path="configuracion/vias" element={<Vias />} />
                        <Route path="configuracion/tecnicos" element={<Tecnicos />} />
                        <Route path="fichas/ficha-catalogacion-espacios-publicos" element={<FichaCatalogacionEspaciosPublicos />} />
                        <Route path="fichas/ficha-registro-catalogacion-inmuebles" element={<FichaRegistroCatalogacionInmuebles />} />
                        <Route path="fichas/ficha-registro-catalogacion-inmuebles-area-monumental" element={<FichaRegistroCatalogacionInmueblesAreaMonumental />} />
                        <Route path="fichas/ficha-registro-historico" element={<FichaRegistroHistorico />} />

                        <Route path="impresion/ficha-registro-catalogacion-inmuebles" element={<ImpresionFichaRegistroCatalogacionInmuebles />} />
                        <Route path="impresion/ficha-registro-historico" element={<ImpresionFichaRegistroHistorico />} />
                        <Route path="impresion/ficha-registro-catalogacion-inmuebles-area-monumental" element={<ImpresionFichaRegistroCatalogacionInmueblesAreaMonumental />} />

                        <Route path="impresion/ficha-registro-historico/:id" element={<ImpresionFichaRegistroHistoricoShow />} />
                        <Route path="impresion/ficha-registro-catalogacion-inmuebles/:id" element={<ImpresionFichaRegistroCatalogacionInmueblesShow />} />
                        <Route path="impresion/ficha-registro-catalogacion-inmuebles-area-monumental/:id" element={<ImpresionFichaRegistroCatalogacionInmueblesAreaMonumentalShow />} />

                        <Route path="404" element={<Page404 />} />
                        <Route path="403" element={<Page403 />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}


export default Layout;