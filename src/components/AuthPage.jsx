import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import DarkModeToggle from "../components/DarkModeToggle";

export default function AuthPage({ onLogin }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setStep(1);
    };

    return (
        <div
            className="min-h-screen flex flex-col relative font-['Poppins',sans-serif] overflow-hidden"
            style={{ backgroundColor: "#2F4F93" }} // couleur principale en bleu palette
        >
            <DarkModeToggle />
            {/* Contenu principal */}
            <div className="flex-grow flex items-center justify-end">
                <div className="flex w-full max-w-4xl h-[600px]">
                    {/* Partie gauche (illustration, vide pour l'instant) */}
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="flex w-full h-full items-center justify-center">
                            <div
                                className="shadow-xl rounded-xl w-full max-w-md overflow-hidden border p-10 flex flex-col justify-center space-y-6 mx-auto"
                                style={{
                                    backgroundColor: "#fff",
                                    borderColor: "#FCDC4B", // accent jaune sur border
                                    boxShadow: "0 8px 32px 0 rgba(252,220,75,0.15)",
                                }}
                            >
                                <h1
                                    className="text-3xl font-extrabold min-h-[56px] text-center"
                                    style={{ color: "#2F4F93" }}
                                >
                                    {isSignUp ? (step === 1 ? "Créer un compte" : "Créer un mot de passe") : "Connexion"}
                                </h1>
                                <form className="space-y-4">
                                    {isSignUp ? (
                                        <>
                                            {step === 1 && (
                                                <>
                                                    <div>
                                                        <label className="block text-sm font-medium" style={{ color: "#2F4F93" }}>
                                                            Nom complet
                                                        </label>
                                                        <div className="mt-1 relative">
                                                            <input
                                                                type="text"
                                                                placeholder="Votre nom"
                                                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 outline-none"
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    color: "#2F4F93",
                                                                    borderColor: "#2F4F93",
                                                                }}
                                                            />
                                                            <FaUser className="absolute left-3 top-3" style={{ color: "#2F4F93" }} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium" style={{ color: "#2F4F93" }}>
                                                            Email
                                                        </label>
                                                        <div className="mt-1 relative">
                                                            <input
                                                                type="email"
                                                                placeholder="Entrer votre email"
                                                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 outline-none"
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    color: "#2F4F93",
                                                                    borderColor: "#2F4F93",
                                                                }}
                                                            />
                                                            <FaEnvelope className="absolute left-3 top-3" style={{ color: "#2F4F93" }} />
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleNextStep}
                                                        className="w-full font-semibold py-3 rounded-md transition"
                                                        style={{
                                                            backgroundColor: "#FCDC4B",
                                                            color: "#2F4F93",
                                                        }}
                                                    >
                                                        Suivant
                                                    </button>
                                                </>
                                            )}
                                            {step === 2 && (
                                                <>
                                                    <div>
                                                        <label className="block text-sm font-medium" style={{ color: "#2F4F93" }}>
                                                            Mot de passe
                                                        </label>
                                                        <div className="mt-1 relative">
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="••••••••"
                                                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 outline-none"
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    color: "#2F4F93",
                                                                    borderColor: "#2F4F93",
                                                                }}
                                                            />
                                                            <FaLock className="absolute left-3 top-3" style={{ color: "#2F4F93" }} />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-3"
                                                                style={{ color: "#2F4F93" }}
                                                            >
                                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium" style={{ color: "#2F4F93" }}>
                                                            Confirmer mot de passe
                                                        </label>
                                                        <div className="mt-1 relative">
                                                            <input
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                placeholder="••••••••"
                                                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 outline-none"
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    color: "#2F4F93",
                                                                    borderColor: "#2F4F93",
                                                                }}
                                                            />
                                                            <FaLock className="absolute left-3 top-3" style={{ color: "#2F4F93" }} />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                className="absolute right-3 top-3"
                                                                style={{ color: "#2F4F93" }}
                                                            >
                                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={handleBack}
                                                            className="w-1/2 py-3 rounded-md font-semibold border"
                                                            style={{
                                                                borderColor: "#2F4F93",
                                                                color: "#2F4F93",
                                                            }}
                                                        >
                                                            Retour
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="w-1/2 font-semibold py-3 rounded-md transition"
                                                            style={{
                                                                backgroundColor: "#FCDC4B",
                                                                color: "#2F4F93",
                                                            }}
                                                        >
                                                            Confirmer
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {/* Connexion classique */}
                                            <div>
                                                <label className="block text-sm font-medium" style={{ color: "#2F4F93" }}>
                                                    Email
                                                </label>
                                                <div className="mt-1 relative">
                                                    <input
                                                        type="email"
                                                        placeholder="Entrer votre email"
                                                        className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 outline-none"
                                                        style={{
                                                            backgroundColor: "#fff",
                                                            color: "#2F4F93",
                                                            borderColor: "#2F4F93",
                                                        }}
                                                    />
                                                    <FaEnvelope className="absolute left-3 top-3" style={{ color: "#2F4F93" }} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium" style={{ color: "#2F4F93" }}>
                                                    Mot de passe
                                                </label>
                                                <div className="mt-1 relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 outline-none"
                                                        style={{
                                                            backgroundColor: "#fff",
                                                            color: "#2F4F93",
                                                            borderColor: "#2F4F93",
                                                        }}
                                                    />
                                                    <FaLock className="absolute left-3 top-3" style={{ color: "#2F4F93" }} />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-3"
                                                        style={{ color: "#2F4F93" }}
                                                    >
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={onLogin}
                                                className="w-full font-semibold py-3 rounded-md transition"
                                                style={{
                                                    backgroundColor: "#FCDC4B",
                                                    color: "#2F4F93",
                                                }}
                                            >
                                                Se connecter
                                            </button>
                                        </>
                                    )}
                                </form>
                                <p className="text-center text-sm" style={{ color: "#2F4F93" }}>
                                    {isSignUp ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}
                                    <button
                                        onClick={() => {
                                            setIsSignUp(!isSignUp);
                                            setStep(1);
                                        }}
                                        className="hover:underline ml-1"
                                        style={{ color: "#2F4F93" }}
                                    >
                                        {isSignUp ? "Se connecter" : "Créer un compte"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}