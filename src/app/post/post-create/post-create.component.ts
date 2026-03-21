import { Component } from '@angular/core';

interface HedgeOption {
  name: string;
  matureSize: string;
  spacing: string;
  availability: string;
  priceRange: [number, number];
  plantCount: [number, number];
  notes: string;
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {

  public readonly lineWidthFeet: number = 21;
  public readonly hedgeOptions: HedgeOption[] = [
    {
      name: 'Clusia',
      matureSize: '10-15 pies de alto x 6-8 pies de ancho',
      spacing: '3-4 pies entre plantas para cerrar rápido',
      availability: 'Sí, es muy común en viveros del sur de la Florida',
      priceRange: [45, 80],
      plantCount: [6, 7],
      notes: 'Pantalla densa, tolera sol fuerte y se mantiene verde todo el año.'
    },
    {
      name: 'Podocarpus',
      matureSize: '12-20 pies de alto x 4-6 pies de ancho',
      spacing: '2.5-3 pies entre plantas',
      availability: 'Sí, se consigue con facilidad en Broward',
      priceRange: [35, 75],
      plantCount: [7, 9],
      notes: 'Se ve más formal y vertical; ideal si el espacio lateral es limitado.'
    },
    {
      name: 'Areca palm',
      matureSize: '12-20 pies de alto x 6-10 pies de ancho',
      spacing: '4-6 pies entre grupos',
      availability: 'Sí, muy usada para privacidad en South Florida',
      priceRange: [70, 150],
      plantCount: [4, 6],
      notes: 'Da un look tropical y cubre bien, pero necesita más agua al establecerse.'
    },
    {
      name: 'Simpson\'s stopper',
      matureSize: '8-15 pies de alto x 5-8 pies de ancho',
      spacing: '3-4 pies entre plantas',
      availability: 'Sí, nativa y apropiada para Broward County',
      priceRange: [35, 90],
      plantCount: [6, 7],
      notes: 'Nativa, atrae polinizadores y responde muy bien a la poda.'
    },
    {
      name: 'Cocoplum',
      matureSize: '6-12 pies de alto x 5-6 pies de ancho',
      spacing: '3-4 pies entre plantas',
      availability: 'Sí, es otra opción nativa común en la zona',
      priceRange: [40, 90],
      plantCount: [6, 7],
      notes: 'Muy buena para una barrera baja o media con apariencia más natural.'
    }
  ];

  public readonly localSources: string[] = [
    'Flamingo Road Nursery (Davie)',
    'Perfect Choice Nursery (Southwest Ranches)',
    'Living Color Garden Center (Davie)',
    'Home Depot y Lowe\'s de Broward County'
  ];

  public getPlantEstimate(option: HedgeOption): string {
    return `${option.plantCount[0]}-${option.plantCount[1]} plantas`;
  }

  public getCostEstimate(option: HedgeOption): string {
    const minCost: number = option.plantCount[0] * option.priceRange[0];
    const maxCost: number = option.plantCount[1] * option.priceRange[1];

    return `$${minCost}-$${maxCost} aprox.`;
  }

}
