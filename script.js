// Configuration et données du lycée
const lyceeData = {
    batiments: {
        batiment1: {
            nom: "Bâtiment 1",
            etages: {
                1: { nom: "1er étage", salles: [] },
                2: { nom: "2ème étage", salles: [] },
                3: { nom: "3ème étage", salles: [] },
                4: { nom: "4ème étage", salles: [] }
            },
            escaliers: ["Esc A", "Esc B", "Esc C", "Esc D", "Esc E"]
        },
        batiment2: {
            nom: "Bâtiment 2",
            etages: {
                1: { nom: "Étage 1", salles: [] },
                2: { nom: "Étage 2", salles: [] }
            },
            escaliers: ["Accès Agora", "Accès Direct"],
            connexionsSpeciales: {
                1: {
                    "Esc A": "Passer par l'agora puis descendre",
                    "Esc B": "Descendre",
                    "Esc C": "Descendre",
                    "Esc D": "Monter",
                    "Esc E": "Monter"
                },
                2: {
                    "Esc A": "Passer par l'agora puis descendre",
                    "Esc B": "Descendre",
                    "Esc C": "En face",
                    "Esc D": "Monter",
                    "Esc E": "Monter"
                }
            }
        }
    },
    
    // Données de proximité des escaliers (sera initialisé après)
    proximiteEscaliers: {},
    
    // Connexions entre bâtiments
    connexions: {
        "batiment1-batiment2": {
            chemin: ["Sortie Bât.1", "Cour niveau haut", "Escalier extérieur", "Cour niveau bas", "Entrée Bât.2"],
            duree: 180 // 3 minutes
        }
    }
};

// Données réelles du lycée basées sur le CSV
const sallesReelles = {
    batiment1: {
        1: ["101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115"],
        2: ["201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220"],
        3: ["301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320"],
        4: ["401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "CDI"]
    },
    batiment2: {
        1: ["601", "602", "603"],
        2: ["604", "605", "606"]
    }
};

// Mapping des salles vers leurs escaliers les plus proches (basé sur votre CSV)
const proximiteEscaliersReelle = {
    // 1er étage - Pas d'escalier A au 1er étage
    "112": "Esc B", "113": "Esc B", "114": "Esc B", "115": "Esc B",
    "110": "Esc C", "111": "Esc C",
    "105": "Esc D", "106": "Esc D", "107": "Esc D", "108": "Esc D", "109": "Esc D",
    "101": "Esc E", "102": "Esc E", "103": "Esc E", "104": "Esc E",
    
    // 2ème étage
    "218": "Esc A", "219": "Esc A", "220": "Esc A",
    "215": "Esc B", "216": "Esc B", "217": "Esc B",
    "210": "Esc C", "211": "Esc C", "212": "Esc C", "213": "Esc C", "214": "Esc C",
    "205": "Esc D", "206": "Esc D", "207": "Esc D", "208": "Esc D", "209": "Esc D",
    "201": "Esc E", "202": "Esc E", "203": "Esc E", "204": "Esc E",
    
    // 3ème étage
    "319": "Esc A", "320": "Esc A",
    "316": "Esc B", "317": "Esc B", "318": "Esc B",
    "312": "Esc C", "313": "Esc C", "314": "Esc C", "315": "Esc C",
    "306": "Esc D", "307": "Esc D", "308": "Esc D", "309": "Esc D", "310": "Esc D", "311": "Esc D",
    "301": "Esc E", "302": "Esc E", "303": "Esc E", "304": "Esc E", "305": "Esc E",
    
    // 4ème étage
    "419": "Esc A", "420": "Esc A", "421": "Esc A", "422": "Esc A", "423": "Esc A", "424": "Esc A", "CDI": "Esc A",
    "416": "Esc B", "417": "Esc B", "418": "Esc B",
    "411": "Esc C", "412": "Esc C", "413": "Esc C", "414": "Esc C", "415": "Esc C",
    "406": "Esc D", "407": "Esc D", "408": "Esc D", "409": "Esc D", "410": "Esc D",
    "401": "Esc E", "402": "Esc E", "403": "Esc E", "404": "Esc E", "405": "Esc E"
};

// Classe principale de l'application
class NavigationLycee {
    constructor() {
        this.initializerDonnees();
        this.initialiserInterface();
        this.attacherEvenements();
    }

    initializerDonnees() {
        // Remplir les données réelles
        for (const [batiment, etages] of Object.entries(sallesReelles)) {
            for (const [etage, salles] of Object.entries(etages)) {
                lyceeData.batiments[batiment].etages[etage].salles = salles;
            }
        }
        
        // Initialiser les données de proximité
        lyceeData.proximiteEscaliers = proximiteEscaliersReelle;
    }

    initialiserInterface() {
        this.remplirMenusSalles();
    }

    remplirMenusSalles() {
        const selectDepart = document.getElementById('depart');
        const selectArrivee = document.getElementById('arrivee');
        
        // Vider les menus
        selectDepart.innerHTML = '<option value="">-- Choisir une salle --</option>';
        selectArrivee.innerHTML = '<option value="">-- Choisir une salle --</option>';

        // Ajouter toutes les salles
        for (const [batimentId, batiment] of Object.entries(lyceeData.batiments)) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = batiment.nom;

            for (const [etageNum, etage] of Object.entries(batiment.etages)) {
                for (const salle of etage.salles) {
                    const option = document.createElement('option');
                    option.value = `${batimentId}_${etageNum}_${salle}`;
                    option.textContent = `${salle} (${batiment.nom} - ${etage.nom})`;
                    optgroup.appendChild(option);
                }
            }

            selectDepart.appendChild(optgroup.cloneNode(true));
            selectArrivee.appendChild(optgroup);
        }
    }

    attacherEvenements() {
        const boutonCalculer = document.getElementById('calculer-itineraire');
        boutonCalculer.addEventListener('click', () => this.calculerItineraire());

        // Empêcher de sélectionner la même salle pour départ et arrivée
        const selectDepart = document.getElementById('depart');
        const selectArrivee = document.getElementById('arrivee');
        
        selectDepart.addEventListener('change', () => this.verifierSelections());
        selectArrivee.addEventListener('change', () => this.verifierSelections());
    }

    verifierSelections() {
        const depart = document.getElementById('depart').value;
        const arrivee = document.getElementById('arrivee').value;
        const bouton = document.getElementById('calculer-itineraire');

        if (depart && arrivee && depart !== arrivee) {
            bouton.disabled = false;
            bouton.style.opacity = '1';
        } else {
            bouton.disabled = true;
            bouton.style.opacity = '0.6';
        }

        if (depart === arrivee && depart !== '') {
            this.afficherMessage("⚠️ La salle de départ et d'arrivée ne peuvent pas être identiques!", 'warning');
        }
    }

    calculerItineraire() {
        const depart = document.getElementById('depart').value;
        const arrivee = document.getElementById('arrivee').value;

        if (!depart || !arrivee) {
            this.afficherMessage("Veuillez sélectionner une salle de départ et d'arrivée.", 'error');
            return;
        }

        if (depart === arrivee) {
            this.afficherMessage("La salle de départ et d'arrivée ne peuvent pas être identiques!", 'error');
            return;
        }

        // Parser les informations des salles
        const infoDepart = this.parserSalle(depart);
        const infoArrivee = this.parserSalle(arrivee);

        // Calculer l'itinéraire
        const itineraire = this.calculerChemin(infoDepart, infoArrivee);
        
        // Afficher le résultat
        this.afficherItineraire(itineraire, infoDepart, infoArrivee);
    }

    parserSalle(salleId) {
        const [batiment, etage, salle] = salleId.split('_');
        return {
            batiment,
            etage: parseInt(etage),
            salle,
            nom: salle
        };
    }

    calculerChemin(depart, arrivee) {
        const instructions = [];
        let dureeTotal = 0;

        // Cas 1: Même salle (ne devrait pas arriver)
        if (depart.batiment === arrivee.batiment && 
            depart.etage === arrivee.etage && 
            depart.salle === arrivee.salle) {
            return { instructions: ["Vous êtes déjà à destination!"], duree: 0 };
        }

        // Cas 2: Même étage, même bâtiment
        if (depart.batiment === arrivee.batiment && depart.etage === arrivee.etage) {
            instructions.push(`Depuis la salle ${depart.salle}, dirigez-vous vers la salle ${arrivee.salle}`);
            dureeTotal = 60; // 1 minute pour traverser un étage
        }
        // Cas 3: Même bâtiment, étages différents
        else if (depart.batiment === arrivee.batiment) {
            const escalier = this.obtenirMeilleurEscalier(depart);
            
            instructions.push(`Sortez de la salle ${depart.salle}`);
            instructions.push(`Dirigez-vous vers ${escalier}`);
            
            if (depart.etage < arrivee.etage) {
                instructions.push(`Montez à l'étage ${arrivee.etage}`);
            } else {
                instructions.push(`Descendez à l'étage ${arrivee.etage}`);
            }
            
            instructions.push(`Dirigez-vous vers la salle ${arrivee.salle}`);
            
            dureeTotal = 60 + (Math.abs(arrivee.etage - depart.etage) * 30) + 60; // Base + temps par étage + final
        }
        // Cas 4: Bâtiments différents
        else {
            const escalierDepart = this.obtenirMeilleurEscalier(depart);
            const escalierArrivee = this.obtenirMeilleurEscalier(arrivee);

            instructions.push(`Sortez de la salle ${depart.salle}`);
            
            // Vérifier si on part d'une salle affectée à l'escalier A au 2ème étage vers le bâtiment 2
            const sallesEscalierA2eme = ["218", "219", "220"];
            const partDepuisEscalierA2eme = depart.etage === 2 && sallesEscalierA2eme.includes(depart.salle);
            const versLeBatiment2 = arrivee.batiment === 'batiment2';

            if (partDepuisEscalierA2eme && versLeBatiment2) {
                // Accès direct depuis les salles 218-220 vers le bâtiment 2 (pas besoin de descendre)
                instructions.push(`Dirigez-vous vers l'agora`);
                dureeTotal += 60;
            } else {
                // Logique normale : descendre au rez-de-chaussée si nécessaire
                instructions.push(`Dirigez-vous vers ${escalierDepart}`);
                
                if (depart.etage > 1) {
                    instructions.push(`Descendez au rez-de-chaussée`);
                    dureeTotal += depart.etage * 30;
                }
                
                instructions.push(`Sortez du ${lyceeData.batiments[depart.batiment].nom}`);
                dureeTotal += 60;
            }

            // Trajet entre bâtiments
            const connexion = lyceeData.connexions[`${depart.batiment}-${arrivee.batiment}`] || 
                             lyceeData.connexions[`${arrivee.batiment}-${depart.batiment}`];
            
            if (connexion) {
                for (let i = 1; i < connexion.chemin.length - 1; i++) {
                    instructions.push(`Dirigez-vous vers ${connexion.chemin[i]}`);
                }
                dureeTotal += connexion.duree;
            } else {
                instructions.push(`Traversez vers le ${lyceeData.batiments[arrivee.batiment].nom}`);
                dureeTotal += 120; // 2 minutes par défaut
            }

            // Entrer dans le bâtiment d'arrivée (sauf bâtiment 2 qui n'a pas d'entrée classique)
            if (arrivee.batiment !== 'batiment2') {
                instructions.push(`Entrez dans le ${lyceeData.batiments[arrivee.batiment].nom}`);
            }
            
            // Aller à l'étage de destination
            if (arrivee.etage > 1) {
                instructions.push(`Dirigez-vous vers ${escalierArrivee}`);
                instructions.push(`Montez à l'étage ${arrivee.etage}`);
                dureeTotal += arrivee.etage * 30;
            }
            
            instructions.push(`Dirigez-vous vers la salle ${arrivee.salle}`);
            dureeTotal += 60;
        }

        return { instructions, duree: dureeTotal };
    }

    obtenirMeilleurEscalier(salle) {
        // Si nous avons des données de proximité, les utiliser
        const salleId = `${salle.salle}`;
        if (lyceeData.proximiteEscaliers[salleId]) {
            return lyceeData.proximiteEscaliers[salleId];
        }
        
        // Sinon, utiliser le premier escalier du bâtiment
        return lyceeData.batiments[salle.batiment].escaliers[0];
    }

    afficherItineraire(itineraire, depart, arrivee) {
        const resultContainer = document.getElementById('resultat-itineraire');
        const instructionsContainer = document.getElementById('instructions');
        const tempsEstime = document.getElementById('temps-estime');

        // Créer les instructions
        instructionsContainer.innerHTML = '';
        itineraire.instructions.forEach((instruction, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'instruction-step';
            
            stepDiv.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-text">${instruction}</div>
            `;
            
            instructionsContainer.appendChild(stepDiv);
        });

        // Masquer le temps estimé
        tempsEstime.style.display = 'none';

        // Afficher le conteneur résultat
        resultContainer.classList.remove('hidden');
        
        // Scroller vers le résultat
        resultContainer.scrollIntoView({ behavior: 'smooth' });

        // Mettre en surbrillance les salles sur le plan
        this.mettreEnSurbrillanceSalles(depart, arrivee);
    }

    mettreEnSurbrillanceSalles(depart, arrivee) {
        // Réinitialiser toutes les surbrillances
        document.querySelectorAll('.etage').forEach(etage => {
            etage.classList.remove('salle-depart', 'salle-arrivee', 'salle-parcours');
        });

        // Cette fonction pourrait être étendue pour surligner graphiquement
        console.log(`Trajet: ${depart.salle} → ${arrivee.salle}`);
    }

    afficherMessage(message, type = 'info') {
        // Créer ou réutiliser un conteneur de message
        let messageContainer = document.getElementById('message-container');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'message-container';
            messageContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
            `;
            document.body.appendChild(messageContainer);
        }

        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
        `;

        // Couleurs selon le type
        const colors = {
            info: { bg: '#e3f2fd', border: '#2196F3', text: '#1976D2' },
            warning: { bg: '#fff3e0', border: '#FF9800', text: '#F57C00' },
            error: { bg: '#ffebee', border: '#F44336', text: '#D32F2F' },
            success: { bg: '#e8f5e8', border: '#4CAF50', text: '#388E3C' }
        };

        const color = colors[type] || colors.info;
        messageDiv.style.backgroundColor = color.bg;
        messageDiv.style.borderLeft = `4px solid ${color.border}`;
        messageDiv.style.color = color.text;
        messageDiv.textContent = message;

        messageContainer.appendChild(messageDiv);

        // Supprimer le message après 5 secondes
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new NavigationLycee();
});

// Fonction pour charger les données de proximité des escaliers
function chargerDonneesProximite(donnees) {
    lyceeData.proximiteEscaliers = donnees;
    console.log('Données de proximité des escaliers chargées:', donnees);
}

// Fonction pour charger une liste personnalisée de salles
function chargerSallesPersonnalisees(salles) {
    // Vider les données existantes
    for (const batiment of Object.values(lyceeData.batiments)) {
        for (const etage of Object.values(batiment.etages)) {
            etage.salles = [];
        }
    }
    
    // Charger les nouvelles données
    for (const [batimentId, etages] of Object.entries(salles)) {
        if (lyceeData.batiments[batimentId]) {
            for (const [etageNum, sallesList] of Object.entries(etages)) {
                if (lyceeData.batiments[batimentId].etages[etageNum]) {
                    lyceeData.batiments[batimentId].etages[etageNum].salles = sallesList;
                }
            }
        }
    }
    
    // Recharger l'interface
    const app = new NavigationLycee();
    console.log('Salles personnalisées chargées:', salles);
}