export const getDashboardRoute = (role) => {
 
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'user') return '/dashboard';
    if(role === 'guest') return "/";

    return '/unauthorized';
};