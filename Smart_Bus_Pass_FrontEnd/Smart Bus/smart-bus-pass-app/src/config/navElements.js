export const navItemsByRole = {
    guest: [
        { path: '/', label: 'Home' },
        { path: '/login', label: 'Login' },
        { path: '/about', label: 'About' },
        { path: '/support', label: 'Contact' },
    ],
    user: [
        { path: '/dashboard', label: 'Home' },
        { path: '/create-pass', label: 'Generate Pass' },
        { path: '/about', label: 'About' },
        { path: '/support', label: 'Contact' }
    ],
    admin: [
        { path: '/admin-dashboard', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/support', label: 'Contact' },
    ]
};