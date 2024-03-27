import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBuilderDialogComponent } from './query-builder-dialog.component';

describe('QueryBuilderDialogComponent', () => {
  let component: QueryBuilderDialogComponent;
  let fixture: ComponentFixture<QueryBuilderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryBuilderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryBuilderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
