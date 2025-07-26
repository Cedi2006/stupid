import React, { useState } from 'react';
import { Plus, User, Calendar, Clock, Search, Edit2, Trash2 } from 'lucide-react';

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
      profession: "Philosophe du Chômage ",
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
  const [editingPerson, setEditingPerson] = useState(null);
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
      id: editingPerson ? editingPerson.id : Date.now(),
      ...formData,
      age: parseInt(formData.age),
      unemploymentDuration: parseInt(formData.unemploymentDuration),
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    if (editingPerson) {
      setPersons(prev => prev.map(p => p.id === editingPerson.id ? newPerson : p));
      setEditingPerson(null);
    } else {
      setPersons(prev => [...prev, newPerson]);
    }

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

  const handleEdit = (person) => {
    setEditingPerson(person);
    setFormData({
      ...person,
      skills: person.skills.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setPersons(prev => prev.filter(p => p.id !== id));
  };

  const getDurationColor = (duration) => {
    if (duration < 30) return 'bg-green-100 text-green-800';
    if (duration < 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDurationText = (duration) => {
    if (duration < 30) return 'Court terme';
    if (duration < 90) return 'Moyen terme';
    return 'Long terme';
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
                📊 Plateforme de Suivi des chaumeurs xd 
              </h1>
              <p className="text-blue-200">
                Gestion et suivi des personnes  par durée de chômage
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingPerson(null);
                  setFormData({
                    name: '',
                    age: '',
                    profession: '',
                    unemploymentDuration: '',
                    lastJob: '',
                    skills: '',
                    registrationDate: new Date().toISOString().split('T')[0]
                  });
                }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                style={{ backgroundColor: '#FCDC4B' }}
              >
                <Plus size={20} />
                Ajouter une personne
              </button>
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
              {editingPerson ? 'Modifier la personne' : 'Ajouter une nouvelle personne'}
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
                  {editingPerson ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPerson(null);
                  }}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Annuler
                </button>
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
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDurationColor(person.unemploymentDuration)}`}>
                          {getDurationText(person.unemploymentDuration)}
                        </span>
                      </div>
                      <div className="text-blue-200 space-y-1">
                        <p><span className="font-medium">Profession:</span> {person.profession}</p>
                        <p><span className="font-medium">Âge:</span> {person.age} ans</p>
                        <p><span className="font-medium">Dernier emploi:</span> {person.lastJob}</p>
                        <p><span className="font-medium">Inscription:</span> {new Date(person.registrationDate).toLocaleDateString('fr-FR')}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {person.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs"
                            >
                              {skill}
                            </span>
                          ))}
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(person)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(person.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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