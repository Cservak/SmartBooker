import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authService } from "../../services/authService";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'A név megadása kötelező';
        }

        if (!formData.password) {
            newErrors.password = 'A jelszó megadása kötelező.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'A jelszónak legalább 6 karaktert kell tartalmaznia.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'A jelszavak nem egyeznek.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate('/');
        } catch (err) {
            setErrors({ general: err.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Form rész - bal oldal */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Logo és fejléc */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            {/* Csavarkulcs ikon a logo mellett */}
                            <svg className="h-10 w-10 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Smart<span className="text-orange-600">Booker</span>
                            </h1>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Regisztráció
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Hozzon létre fiókot az időpontfoglaláshoz
                        </p>
                    </div>

                    {/* Általános hibaüzenet */}
                    {errors.general && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 rounded">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm font-medium">{errors.general}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Név mező */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Teljes név
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
                                placeholder="Kovács János"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Email mező */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                E-mail cím
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
                                placeholder="pelda@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Jelszó mező */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Jelszó
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Legalább 6 karakter hosszú
                            </p>
                        </div>

                        {/* Jelszó megerősítése mező */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Jelszó megerősítése
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Regisztráció gomb */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Regisztráció...
                                </span>
                            ) : (
                                'Fiók létrehozása'
                            )}
                        </button>

                        {/* Bejelentkezés link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Már van fiókja?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-orange-600 hover:text-orange-700 transition-colors"
                                >
                                    Jelentkezzen be
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Szolgáltatás info */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-xs text-center text-gray-500">
                            🔧 Csatlakozzon több száz elégedett ügyfélhez
                        </p>
                    </div>
                </div>
            </div>

            {/* Hero rész - jobb oldal (csak desktop-on) */}
            <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                {/* Háttér minta - hexagon grid */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center text-white max-w-lg">
                        {/* Autó szerviz grafika */}
                        <div className="mb-8 relative">
                            <div className="absolute inset-0 bg-orange-600 opacity-20 blur-3xl rounded-full"></div>
                            <svg className="mx-auto h-40 w-40 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                            {/* User add ikon */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                                <svg className="h-8 w-8 text-orange-500 animate-bounce" style={{ animationDuration: '3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold mb-4">
                            Üdvözöljük a <span className="text-orange-500">SmartBooker</span>-ben
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Regisztráljon most és foglaljon időpontot percek alatt
                        </p>

                        {/* Előnyök */}
                        <div className="grid grid-cols-1 gap-4 mt-12">
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center">
                                <div className="text-orange-500 mr-4">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold">Ingyenes regisztráció</p>
                                    <p className="text-xs text-gray-400 mt-1">Nincs rejtett költség</p>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center">
                                <div className="text-orange-500 mr-4">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold">Gyors időpontfoglalás</p>
                                    <p className="text-xs text-gray-400 mt-1">Pár kattintással kész</p>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center">
                                <div className="text-orange-500 mr-4">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold">Időpontemlékeztetők</p>
                                    <p className="text-xs text-gray-400 mt-1">E-mail és SMS értesítés</p>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center">
                                <div className="text-orange-500 mr-4">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold">Előzmények követése</p>
                                    <p className="text-xs text-gray-400 mt-1">Minden szerviz nyilvántartva</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA szöveg */}
                        <div className="mt-12 p-6 bg-orange-600/10 border border-orange-600/30 rounded-lg">
                            <p className="text-lg font-semibold text-orange-400 mb-2">
                                🎉 Csatlakozzon több mint 5000+ elégedett ügyfélhez!
                            </p>
                            <p className="text-sm text-gray-300">
                                Kényelmesen foglaljon időpontot autója szervizelésére
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dekoratív elem alul */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600"></div>
            </div>
        </div>
    );
}

export default Register;