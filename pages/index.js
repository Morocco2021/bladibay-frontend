import { useState } from 'react';

export default function Home() {
  const [device, setDevice] = useState('mobile');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header BladiBay */}
      <header className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🏛️ BladiBay</h1>
          <p className="text-sm">بلادي باي</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Bienvenue sur BladiBay
        </h2>
        <p className="text-gray-600 mb-6">
          Le marketplace moderne du Maroc 🇲🇦
        </p>
        
        {/* Barre de recherche */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <input 
            type="text"
            placeholder="🔍 Que cherchez-vous ?"
            className="w-full p-3 border rounded-lg text-lg"
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg mt-3 font-bold">
            Rechercher
          </button>
        </div>

        {/* Catégories populaires */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="font-bold">Voitures</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🏠</div>
            <h3 className="font-bold">Immobilier</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-bold">Électronique</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">👕</div>
            <h3 className="font-bold">Mode</h3>
          </div>
        </div>
      </section>

      {/* Navigation mobile en bas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2 text-blue-600">
            <span className="text-xl">🏠</span>
            <span className="text-xs">Accueil</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <span className="text-xl">🔍</span>
            <span className="text-xs">Recherche</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <span className="text-xl">➕</span>
            <span className="text-xs">Publier</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <span className="text-xl">👤</span>
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
