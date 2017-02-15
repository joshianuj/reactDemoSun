export function getSolarSize(bill) {
    let average, psh, loss, lossFromPsh, totalLoss
    average = calculateAverage(bill);
    psh = getLossFromLocation(bill.roof, bill.location);
    lossFromPsh = average / psh[0];
    totalLoss =lossFromPsh; // (1 - psh[1] / 100) * lossFromPsh;
    return totalLoss;
}

export function getRoofMessage(bill){
  let orientation = bill.orientation;
  let location = bill.location;
  switch(bill.roof){
    case 'Flat Roof':
      return 'For your location, a flat roof panel can produce '+ location.flat_roof_loss+ '% less solar energy. Recommend tilting 5-10% for less losses and panel durability.'
    case 'Pitched Roof':
      if (orientation ==='North, NE, NW')
        return '✔ Ideal for solar'
      else if(orientation==='East or West')
        return 'North facing roof is ideal. If your roof is East and West facing, splitting more panels on the side of day with higher consumption is recommended.'
      else if(orientation==='South, SE, SW')
        return 'North facing roof is ideal. Because your roof is S,SE,SW facing, for your locatoin it can output ' + location.south_direction_loss + '% less solar energy on any given day compared to North facing panels. If your mind is set on getting solar panels on this roof, you may consider up-sizing your system to account for some of the losses'
      else {
        return
      }
  }

}

export function getShadingMessage(bill){
  switch(bill.shading){
    case 'Light':
      return '✔'
    case 'Moderate':
      return 'Going with microinverter solar panel or optimizers will mitigate some of the shading issues. Please consult solar company'
    case 'Heavy':
      return 'In such rare case, an analysis of your roof shading is highly recommended for final sizing estimate. Please consult with Solar Company'
    case 'Not Sure':
      return 'Light or even moderate shading can be mitigated with optimizers or micro inverter panels. If your concern is heavy shade, please ask solar company for a thorough shading analysis before receive their quote.'
  }
}

function getLossFromLocation(roof, location) {
    let psh, loss;
    psh = location.psh;
    if (roof == 'Flat') {
        loss = location.flat_roof_loss;
    } else {
        loss = location.south_direction_loss;
    }
    let someArr = []
    someArr.push(psh);
    someArr.push(loss);
    return someArr;
}

function calculateAverage(bill) {
    let informations = bill.informations;
    let perDayUse, perDayAverage, averageTotal = 0,
        aggregatedAverage;
    informations.forEach((information, index) => {
        perDayUse = information.total //(information.total / information.days);
        perDayAverage = (information.percentage / 100) * perDayUse;
        averageTotal += Math.round(perDayAverage);
        aggregatedAverage = averageTotal / (index + 1);
    })
    return aggregatedAverage;
}
