import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateComponent } from './post-create.component';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose hedge options and local sources for the guide', () => {
    expect(component.hedgeOptions.length).toBe(5);
    expect(component.localSources).toContain('Flamingo Road Nursery (Davie)');
  });

  it('should calculate the estimated cost range for a 21 foot clusia hedge', () => {
    expect(component.getPlantEstimate(component.hedgeOptions[0])).toBe('6-7 plantas');
    expect(component.getCostEstimate(component.hedgeOptions[0])).toBe('$270-$560 aprox.');
  });

  it('should render the numbered privacy guide in Spanish', () => {
    const compiled: HTMLElement = fixture.nativeElement;

    expect(compiled.textContent).toContain('Guía rápida de arbustos para privacidad');
    expect(compiled.textContent).toContain('¿Qué tipos hay?');
    expect(compiled.textContent).toContain('¿Dónde se podrían conseguir?');
    expect(compiled.textContent).toContain('Perfect Choice Nursery (Southwest Ranches)');
  });
});
