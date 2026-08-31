# Should I Kite?

Application web statique, responsive et sans dépendance externe pour lire les prévisions kitesurf de Cabourg et Bel Ombre, puis obtenir une recommandation **indicative** de taille d’aile.

## Architecture

```text
.
├── index.html             # Structure, navigation et composants d’interface
├── src/
│   ├── app.js             # État UI, rendu et interactions
│   ├── api.js             # Open-Meteo, timeout, cache et fallback démo explicite
│   ├── config.js          # Spots, seuils d’évaluation et matrice d’ailes
│   ├── tides.js           # Détection des extrema de niveau marin
│   ├── utils.js           # Directions et formatage temporel
│   ├── wing.js            # Recommandation isolée
│   └── styles.css          # Thème clair/sombre et responsive
├── tests/test.js          # Tests unitaires Node
├── package.json
└── .env.example
```

Les appels au service Weather et Marine d’Open-Meteo sont effectués avec les coordonnées configurées dans `src/config.js`. Les réponses sont normalisées dans une structure interne. Un cache navigateur de 10 minutes et un timeout de 9 secondes évitent les appels inutiles ou bloquants. Si l’API est indisponible, l’interface passe sur des valeurs de démonstration, identifiées visiblement comme telles — elles ne sont jamais présentées comme réelles.

Les marées sont des estimations : les maxima et minima locaux de la série horaire de niveau marin du modèle sont détectés dans `src/tides.js`.

## Lancer

Prérequis : Node.js récent (pour les tests) et Python 3 (pour le serveur statique).

```bash
npm test
npm start
# ouvrir http://localhost:8080
```

Aucune installation, clé API ou variable d’environnement n’est nécessaire. Pour un hébergement, servez simplement le répertoire avec un serveur statique.

## Limites et sécurité

La matrice de taille d’aile est un exemple initial à valider auprès de pratiquants expérimentés ou de professionnels. Les données, marées, appréciations et recommandations sont indicatives ; contrôlez les conditions locales, bulletins officiels, règles, matériel et votre niveau avant toute navigation.
