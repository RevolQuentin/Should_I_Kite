# Should I Kite?

Application web statique, responsive et sans dépendance externe pour lire les prévisions kitesurf de Cabourg et Bel Ombre, obtenir une recommandation **indicative** de taille d’aile et tenir un carnet de sessions personnel.

## Fonctionnalités

- **Conditions :** vent, rafales, vagues, température de l’eau, marées estimées et tendance sur sept jours.
- **Choisir mon aile :** recommandation indicative calculée selon le poids, le vent, le niveau, le type de planche et le quiver.
- **Mes sessions :** saisie de la date, du spot, du vent moyen, de l’aile, de la planche et de commentaires / appréciations. Les sessions sont affichées dans un historique, peuvent être supprimées individuellement ou effacées en une fois.

Le carnet est volontairement local : ses données sont conservées dans le `localStorage` du navigateur courant, sans envoi vers un serveur. Elles restent disponibles lors des prochaines visites sur ce même navigateur.

## Architecture

```text
.
├── index.html             # Structure, navigation et composants d’interface
├── src/
│   ├── app.js             # État UI, rendu et interactions
│   ├── api.js             # Open-Meteo, timeout, cache et fallback démo explicite
│   ├── config.js          # Spots, seuils d’évaluation et matrice d’ailes
│   ├── sessions.js        # Validation et persistance locale du carnet de sessions
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

## Lancer l’application

Prérequis : Node.js récent (pour les tests) et Python 3 (pour le serveur statique).

```bash
npm test
npm start
# ouvrir http://localhost:8080
```

Aucune installation, clé API ou variable d’environnement n’est nécessaire. Pour un hébergement, servez simplement le répertoire avec un serveur statique.

## Utiliser le carnet de sessions

1. Ouvrez l’onglet **Mes sessions** dans la navigation.
2. Renseignez la date, l’endroit, le vent moyen en nœuds, la taille de l’aile en m² et la taille de la planche.
3. Ajoutez, si vous le souhaitez, vos sensations et remarques dans **Commentaires et appréciations**, puis cliquez sur **Enregistrer ma session**.
4. Retrouvez la session dans l’historique local. Utilisez **Supprimer** pour retirer une entrée ou **Tout effacer** pour vider le carnet.

Les valeurs numériques sont validées afin d’éviter les saisies manifestement incohérentes. Les commentaires sont affichés comme du texte et non comme du HTML.

## Limites et sécurité

La matrice de taille d’aile est un exemple initial à valider auprès de pratiquants expérimentés ou de professionnels. Les données, marées, appréciations et recommandations sont indicatives ; contrôlez les conditions locales, bulletins officiels, règles, matériel et votre niveau avant toute navigation. Le `localStorage` n’est pas une sauvegarde : l’effacement des données du navigateur supprimera le carnet.
