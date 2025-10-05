import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('') // törli a hibaüzenetet újragépeléskor
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(formData.email, formData.password);
            console.log(formData.email)
            console.log(formData.password)
            navigate('/');
        } catch (err) {
            setError(err.message);
            console.log("error")
            console.log("error", formData.email)
            console.log("error", formData.password)
        } finally {
            setLoading(false);
        }
    };

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
                            Műhely bejelentkezés
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Autószerelő időpontfoglaló rendszer
                        </p>
                    </div>

                    {/* Hibaüzenet */}
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 rounded">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="pelda@email.com"
                            />
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Elfelejtett jelszó */}
                        <div className="flex items-center justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Elfelejtett jelszó?
                            </Link>
                        </div>

                        {/* Bejelentkezés gomb */}
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
                                    Bejelentkezés...
                                </span>
                            ) : (
                                'Bejelentkezés'
                            )}
                        </button>

                        {/* Regisztráció link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Még nincs fiókja?{' '}
                                <Link
                                    to="/register"
                                    className="font-medium text-orange-600 hover:text-orange-700 transition-colors"
                                >
                                    Regisztráljon most
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Szolgáltatás info */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-xs text-center text-gray-500">
                            🔧 Professzionális autószerelő szolgáltatások egy kattintásra
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
                            {/* Szerszám ikonok körben */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                                <svg className="h-8 w-8 text-orange-500 animate-bounce" style={{ animationDuration: '3s' }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold mb-4">
                            Autó<span className="text-orange-500">szerviz</span> időpontfoglalás
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Professzionális autószerelő műhelyek online időpontfoglalója
                        </p>

                        {/* Szolgáltatások */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="text-orange-500 mb-2">
                                    <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold">Gyors foglalás</p>
                                <p className="text-xs text-gray-400 mt-1">Azonnali időpont</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="text-orange-500 mb-2">
                                    <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold">Megbízható</p>
                                <p className="text-xs text-gray-400 mt-1">Ellenőrzött szerelők</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="text-orange-500 mb-2">
                                    <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold">Átlátható árak</p>
                                <p className="text-xs text-gray-400 mt-1">Nincs rejtett költség</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="text-orange-500 mb-2">
                                    <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold">Követhető</p>
                                <p className="text-xs text-gray-400 mt-1">Munka állapota</p>
                            </div>
                        </div>

                        {/* Műszaki vizsga, szerviz típusok */}
                        <div className="mt-12 flex flex-wrap justify-center gap-3">
                            <span className="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-xs font-medium">
                                🔧 Szerviz
                            </span>
                            <span className="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-xs font-medium">
                                🛠️ Javítás
                            </span>
                            <span className="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-xs font-medium">
                                ⚙️ Karbantartás
                            </span>
                            <span className="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-xs font-medium">
                                📋 Műszaki vizsga
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dekoratív elem alul */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600"></div>
            </div>
        </div>
    );
}

export default Login;