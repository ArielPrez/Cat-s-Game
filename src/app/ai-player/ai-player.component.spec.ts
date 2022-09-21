/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AiPlayerComponent } from './ai-player.component';

describe('AiPlayerComponent', () => {
  let component: AiPlayerComponent;
  let fixture: ComponentFixture<AiPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
