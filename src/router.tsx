import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                </Route>

                <Route path="/admin" element={<AppLayout />}>
                    <Route index={true} element={<LinkTreeView />} />
                    <Route path="profile" element={<ProfileView />} />
                </Route>

                <Route path="/:handle" element={<AuthLayout />}>
                    {" "}
                    {/*we use auth layout just because the design adapts better with what we want */}
                    <Route index={true} element={<HandleView />} />
                </Route>

                <Route path="/" element={<HomeView />} />

                <Route path="/404" element={<AuthLayout />}>
                    <Route index={true} element={<NotFoundView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
