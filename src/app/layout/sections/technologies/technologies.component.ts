import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technologies.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TechnologiesComponent {
  technologies = [
    { name: 'Angular', logo: '/assets/images/logos/angular.svg' },
    { name: 'HTML', logo: '/assets/images/logos/html.svg' },
    { name: 'CSS', logo: '/assets/images/logos/css.svg' },
    { name: 'TypeScript', logo: '/assets/images/logos/typescript.svg' },
    { name: 'Node.js', logo: '/assets/images/logos/nodejs.svg' },
    { name: 'Azure', logo: '/assets/images/logos/azure.svg' },
    { name: 'GitHub', logo: '/assets/images/logos/github.svg' },
    { name: 'OpenAI', logo: '/assets/images/logos/openai.svg' },
    { name: '.NET', logo: '/assets/images/logos/dotnet.svg' },
    { name: 'NestJS', logo: '/assets/images/logos/nestjs.svg' }
  ];
}
