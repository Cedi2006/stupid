import React, { useState } from 'react';
import { Plus, User, Calendar, Clock, Search, Eye } from 'lucide-react';

const UnemploymentTracker = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Marie Dubois",
      age: 28,
      profession: "Dormeuse",
      unemploymentDuration: 45,
      lastJob: "Startup Tech",
      skills: ["React", "Node.js", "Python"],
      registrationDate: "2024-06-10"
    },
    {
      id: 2,
      name: "Pierre Martin",
      age: 35,
      profession: "Philosophe du Chômage",
      unemploymentDuration: 120,
      lastJob: "Consulting IT",
      skills: ["Management", "Agile", "PMO"],
      registrationDate: "2024-03-15"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      age: 42,
      profession: "Scrolleur sans fin",
      unemploymentDuration: 30,
      lastJob: "Cabinet d'expertise",
      skills: ["Comptabilité", "Excel", "SAP"],
      registrationDate: "2024-06-25"
    },
    {
      id: 4,
      name: "Ahmed Benali",
      age: 31,
      profession: "Cuisinier de goudron",
      unemploymentDuration: 75,
      lastJob: "Entreprise automobile",
      skills: ["Java", "Spring", "Docker"],
      registrationDate: "2024-05-10"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    profession: '',
    unemploymentDuration: '',
    lastJob: '',
    skills: '',
    registrationDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.age || !formData.profession || !formData.unemploymentDuration || !formData.lastJob || !formData.skills) {
      return;
    }
    const newPerson = {
      id: Date.now(),
      ...formData,
      age: parseInt(formData.age),
      unemploymentDuration: parseInt(formData.unemploymentDuration),
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    setPersons(prev => [...prev, newPerson]);

    setFormData({
      name: '',
      age: '',
      profession: '',
      unemploymentDuration: '',
      lastJob: '',
      skills: '',
      registrationDate: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
  };

  const getDurationColor = (duration) => {
    if (duration < 30) return 'bg-green-100 text-green-800 border-green-200';
    if (duration < 90) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getDurationText = (duration) => {
    if (duration < 30) return 'Chaumeur debutant';
    if (duration < 60) return 'Chomeur intermediare';
    if (duration < 90) return 'Chomeur avance';
    return 'Chaumeur Certifie';
  };

  const getDurationBadge = (duration) => {
    const colorClass = getDurationColor(duration);
    const text = getDurationText(duration);
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${colorClass} shadow-sm`}>
        {text} • {duration} jours
      </span>
    );
  };

  const sortedPersons = persons
    .filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.profession.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.unemploymentDuration - a.unemploymentDuration);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                📊 Plateforme de Suivi des chômeurs xd 
              </h1>
              <p className="text-blue-200">
                Gestion et suivi des personnes par durée de chômage
              </p>
            </div>
            
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <User className="text-blue-300" size={24} />
              <div>
                <p className="text-blue-200 text-sm">Total</p>
                <p className="text-white text-2xl font-bold">{persons.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <Clock className="text-green-300" size={24} />
              <div>
                <p className="text-blue-200 text-sm">Court terme (&lt;30j)</p>
                <p className="text-white text-2xl font-bold">
                  {persons.filter(p => p.unemploymentDuration < 30).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-300" size={24} />
              <div>
                <p className="text-blue-200 text-sm">Moyen terme (30-90j)</p>
                <p className="text-white text-2xl font-bold">
                  {persons.filter(p => p.unemploymentDuration >= 30 && p.unemploymentDuration < 90).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <Clock className="text-red-300" size={24} />
              <div>
                <p className="text-blue-200 text-sm">Long terme (90j+)</p>
                <p className="text-white text-2xl font-bold">
                  {persons.filter(p => p.unemploymentDuration >= 90).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom ou profession..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">
              Ajouter une nouvelle personne
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="number"
                name="age"
                placeholder="Âge"
                value={formData.age}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="profession"
                placeholder="Profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="number"
                name="unemploymentDuration"
                placeholder="Durée de chômage (jours)"
                value={formData.unemploymentDuration}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="lastJob"
                placeholder="Dernier emploi"
                value={formData.lastJob}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="skills"
                placeholder="Compétences (séparées par des virgules)"
                value={formData.skills}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="date"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 rounded-lg font-medium transition-all duration-300"
                  style={{ backgroundColor: '#FCDC4B' }}
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {selectedPerson && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">Profil de {selectedPerson.name}</h2>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Badge de durée de chômage */}
                <div className="text-center">
                  <div className="inline-block">
                    {getDurationBadge(selectedPerson.unemploymentDuration)}
                  </div>
                </div>

                {/* Informations personnelles */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-200 text-sm">Nom</p>
                      <p className="text-white font-medium text-lg">{selectedPerson.name}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Âge</p>
                      <p className="text-white font-medium text-lg">{selectedPerson.age} ans</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Profession</p>
                      <p className="text-white font-medium text-lg">{selectedPerson.profession}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Date d'inscription</p>
                      <p className="text-white font-medium text-lg">
                        {new Date(selectedPerson.registrationDate).toLocaleDateString('fr-FR')}
                      </p>Long
                    </div>
                  </div>
                </div>

                {/* Historique professionnel */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Historique professionnel</h3>
                  <div>
                    <p className="text-blue-200 text-sm">Dernier emploi</p>
                    <p className="text-white font-medium text-lg">{selectedPerson.lastJob}</p>
                  </div>
                </div>

                {/* Compétences */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerson.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Durée de chômage détaillée */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Situation actuelle</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {selectedPerson.unemploymentDuration}
                    </div>
                    <div className="text-blue-200">jours de chômage</div>
                    <div className="mt-3">
                      {getDurationBadge(selectedPerson.unemploymentDuration)}
                    </div>
                    <div className="mt-4 text-sm text-blue-200">
                      Soit environ {Math.floor(selectedPerson.unemploymentDuration / 30)} mois et {selectedPerson.unemploymentDuration % 30} jours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Person List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
          <div className="p-4 border-b border-white/20">
            <h2 className="text-xl font-bold text-white">
              Liste des demandeurs d'emploi ({sortedPersons.length})
            </h2>
            <p className="text-blue-200 text-sm">Triés par durée de chômage (du plus long au plus court)</p>
          </div>
          
          <div className="divide-y divide-white/10">
            {sortedPersons.map((person, index) => (
              <div key={person.id} className="p-6 hover:bg-white/5 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-2xl font-bold text-yellow-400 bg-white/10 w-12 h-12 rounded-full flex items-center justify-center">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                        {getDurationBadge(person.unemploymentDuration)}
                      </div>
                      <div className="text-blue-200 space-y-1">
                        <p><span className="font-medium">Profession:</span> {person.profession}</p>
                        <p><span className="font-medium">Âge:</span> {person.age} ans</p>
                        <p><span className="font-medium">Dernier emploi:</span> {person.lastJob}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {person.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {person.skills.length > 3 && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs">
                              +{person.skills.length - 3} autres
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-3">
                    <div className="text-center lg:text-right">
                      <div className="text-2xl font-bold text-white">
                        {person.unemploymentDuration}
                      </div>
                      <div className="text-blue-200 text-sm">jours de chômage</div>
                    </div>
                    <button
                      onClick={() => setSelectedPerson(person)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <Eye size={16} />
                      <span className="text-sm">Voir le profil</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sortedPersons.length === 0 && (
            <div className="p-12 text-center">
              <User className="mx-auto text-blue-300 mb-4" size={48} />
              <p className="text-blue-200 text-lg">Aucune personne trouvée</p>
              <p className="text-blue-300 text-sm">Ajoutez des demandeurs d'emploi ou modifiez votre recherche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnemploymentTracker;