/** @typedef {{time:number,height:number,type:'high'|'low'}} Tide */
/** Finds local extrema in a modeled hourly sea-level series. @param {{time:number,height:number}[]} points @returns {Tide[]} */
export function findTides(points) { const result=[]; for(let i=1;i<points.length-1;i++){const a=points[i-1].height,b=points[i].height,c=points[i+1].height;if((b>=a&&b>c)||(b<=a&&b<c)) result.push({time:points[i].time,height:b,type:b>a?'high':'low'});} return result; }
