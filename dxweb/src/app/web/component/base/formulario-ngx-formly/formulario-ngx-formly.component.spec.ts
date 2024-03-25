import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNgxFormlyComponent } from './formulario-ngx-formly.component';

describe('FormularioNgxFormlyComponent', () => {
  let component: FormularioNgxFormlyComponent;
  let fixture: ComponentFixture<FormularioNgxFormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioNgxFormlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioNgxFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
