# 🏫 Navigation Lycée

Application web progressive (PWA) pour naviguer entre les salles de votre lycée. Convertible en APK pour Android.

## 🚀 Fonctionnalités

- ✅ Interface simple avec menus déroulants
- ✅ Calcul d'itinéraires entre salles
- ✅ Instructions étape par étape
- ✅ Support des bâtiments multiples et étages
- ✅ Application web progressive (PWA)
- ✅ Convertible en APK
- ✅ Fonctionne hors ligne

## 📱 Structure de votre lycée supportée

- **Bâtiment 1** : 4 étages
- **Bâtiment 2** : 2 étages avec accès extérieurs
- **Connexions** : Cours extérieures avec escaliers

## 🛠️ Installation et utilisation

### 1. Test immédiat
```bash
# Ouvrir index.html dans un navigateur
# Ou utiliser un serveur local simple
python -m http.server 8000
# Puis aller sur http://localhost:8000
```

### 2. Personnalisation avec vos données

#### A. Modifier les salles
Éditez le fichier `script.js` et remplacez `sallesExemple` :

```javascript
const sallesExemple = {
    batiment1: {
        1: ["101", "102", "103", "104", "105"], // Vos salles étage 1
        2: ["201", "202", "203", "204", "205"], // Vos salles étage 2
        3: ["301", "302", "303", "304", "305"], // Vos salles étage 3
        4: ["401", "402", "403", "404", "405"]  // Vos salles étage 4
    },
    batiment2: {
        1: ["B201", "B202", "B203", "B204"],    // Vos salles bât.2 étage 1
        2: ["B301", "B302", "B303", "B304"]     // Vos salles bât.2 étage 2
    }
};
```

#### B. Intégrer vos données de proximité des escaliers
Utilisez votre fichier sur la proximité des escaliers :

```javascript
// Dans script.js, remplacez proximiteEscaliers par :
proximiteEscaliers: {
    "101": { escalierProche: "Escalier A", distance: 30 },
    "102": { escalierProche: "Escalier A", distance: 45 },
    "201": { escalierProche: "Escalier B", distance: 20 },
    // ... vos données
}
```

## 📊 Format des données de proximité

Votre fichier doit contenir pour chaque salle :
- `escalierProche` : Nom de l'escalier le plus proche
- `distance` : Temps en secondes pour atteindre l'escalier

Exemple :
```json
{
    "101": { "escalierProche": "Escalier A", "distance": 30 },
    "102": { "escalierProche": "Escalier A", "distance": 45 },
    "103": { "escalierProche": "Escalier B", "distance": 60 }
}
```

## 📱 Conversion en APK

### Méthode 1 : PWA Builder (Recommandée)
1. Aller sur [PWABuilder.com](https://www.pwabuilder.com/)
2. Entrer l'URL de votre application hébergée
3. Cliquer "Build My PWA"
4. Télécharger l'APK Android

### Méthode 2 : Bubble.is
1. Créer un compte sur [Bubble.is](https://bubble.io/)
2. Importer votre PWA
3. Générer l'APK

### Méthode 3 : Capacitor (Avancée)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap run android
```

## 🔧 Personnalisation avancée

### Modifier les couleurs
Dans `styles.css`, changez les variables CSS :
```css
:root {
    --primary-color: #2196F3;    /* Bleu principal */
    --secondary-color: #FFC107;  /* Jaune secondaire */
    --success-color: #4CAF50;    /* Vert succès */
}
```

### Ajouter des bâtiments
Dans `script.js`, étendez `lyceeData.batiments` :
```javascript
batiment3: {
    nom: "Bâtiment 3",
    etages: {
        1: { nom: "Étage 1", salles: [] },
        2: { nom: "Étage 2", salles: [] }
    },
    escaliers: ["Escalier D"]
}
```

## 📋 TODO pour votre implémentation

1. ✅ Copier votre fichier de proximité des escaliers
2. ⏳ Lister toutes vos salles par bâtiment/étage
3. ⏳ Modifier `script.js` avec vos données
4. ⏳ Tester l'application localement
5. ⏳ Héberger en ligne (GitHub Pages, Netlify, etc.)
6. ⏳ Convertir en APK

## 🐛 Dépannage

### L'application ne s'affiche pas
- Vérifiez que tous les fichiers sont dans le même dossier
- Utilisez un serveur local (pas file://)

### Les salles ne s'affichent pas
- Vérifiez la syntaxe JavaScript dans `script.js`
- Ouvrez la console développeur (F12)

### L'APK ne fonctionne pas
- Vérifiez que le manifest.json est valide
- Testez d'abord la PWA dans le navigateur mobile

## 📞 Support

Si vous avez des questions ou problèmes :
1. Vérifiez la console développeur (F12)
2. Modifiez progressivement les données
3. Testez chaque modification

## 🎯 Améliorations futures possibles

- [ ] Plan interactif avec SVG
- [ ] Géolocalisation dans le lycée
- [ ] Mode sombre
- [ ] Favoris/raccourcis
- [ ] Notifications push
- [ ] Mode offline complet