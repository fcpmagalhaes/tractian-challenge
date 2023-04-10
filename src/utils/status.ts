export function setStatusData(label: string) {
  let translatedLabel = '';
  let colorStatus = '';
  if (label === 'inOperation') {
    translatedLabel = 'Em Operação';
    colorStatus = 'green';
  }
  if (label === 'inDowntime') {
    translatedLabel = 'Em Parada'
    colorStatus = 'red';
  }
  if (label === 'inAlert') {
    translatedLabel = 'Em Alerta';
    colorStatus = 'orange';
  }
  if (label === 'unplannedStop') {
    translatedLabel = 'Parada Não Planejada';
    colorStatus = 'black';
  }
  if (label === 'plannedStop') {
    translatedLabel = 'Parada Planejada';
    colorStatus = 'blue';
  }
  return {translatedLabel, colorStatus};
}