/** @typedef {{id:string,name:string,country:string,latitude:number,longitude:number,timezone:string,unit:string,coastOrientation:string}} Spot */
export const SPOTS = /** @type {Record<string, Spot>} */ ({
  cabourg: { id:'cabourg', name:'Cabourg', country:'France · Calvados', latitude:49.288, longitude:-0.115, timezone:'Europe/Paris', unit:'kn', coastOrientation:'Nord' },
  belOmbre: { id:'belOmbre', name:'Bel Ombre', country:'Île Maurice', latitude:-20.501, longitude:57.425, timezone:'Indian/Mauritius', unit:'kn', coastOrientation:'Sud' }
});
export const THRESHOLDS = { favorable: { minWind:14, maxWind:28, maxGustDelta:10 }, watch: { minWind:10, maxWind:35 } };
/** Matrice exemple à valider avec professionnels/pratiquants locaux. */
export const WING_MATRIX = [
  { maxWeight:60, bands:[[8,22,12],[13,18,9],[18,25,7],[25,35,5]] },
  { maxWeight:75, bands:[[8,15,14],[15,20,11],[20,27,9],[27,35,7]] },
  { maxWeight:90, bands:[[8,15,16],[15,20,12],[20,27,10],[27,35,8]] },
  { maxWeight:140,bands:[[8,15,18],[15,20,14],[20,27,11],[27,35,9]] }
];
