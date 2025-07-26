import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle.jsx";
import Homer3D from "./Homer3D.jsx";

export default function AuthPage({ onLogin }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

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
                 <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10" style={{width: '500px', height: '1000px', pointerEvents: 'none'}}>
                        <div className="w-full h-full flex items-center justify-center ">
                            <Homer3D />
                        </div>
                    </div>
                <div className="flex w-full max-w-6xl h-[700px] stupid-login-container relative">
                    {/* Partie gauche : Homer 3D */}
                   
                    {/* Partie droite : Card */}
                    <div className="w-full flex items-center justify-end">
                        <div
                            className="shadow-2xl rounded-3xl w-full max-w-xl overflow-hidden border-4 p-14 flex flex-col justify-center space-y-10 mx-auto stupid-card"
                            style={{
                                backgroundColor: "#fff",
                                borderColor: "#FCDC4B",
                               
                                transform: "rotate(-2deg) scale(1.12)",
                            }}
                        >
                            <h1
                                className="text-5xl font-extrabold min-h-[56px] text-center drop-shadow-lg stupid-title"
                                style={{ color: "#2F4F93", letterSpacing: "2px", textShadow: "2px 2px #FCDC4B" }}
                            >
                                {isSignUp ? (step === 1 ? "Créer un compte" : "Créer un mot de passe") : "Connexion"}
                            </h1>
                            <form className="space-y-8 stupid-form">
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
                                            onClick={() => navigate("/jobs")}
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
                            <p className="text-center text-lg font-bold stupid-switch" style={{ color: "#2F4F93", textShadow: "1px 1px #FCDC4B" }}>
                                {isSignUp ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}
                                <button
                                    onClick={() => {
                                        setIsSignUp(!isSignUp);
                                        setStep(1);
                                    }}
                                    className="hover:underline ml-2 px-3 py-1 rounded-full bg-yellow-300 font-extrabold stupid-switch-btn"
                                    style={{ color: "#2F4F93", boxShadow: "0 2px 8px #FCDC4B" }}
                                >
                                    {isSignUp ? "Se connecter" : "Créer un compte"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}