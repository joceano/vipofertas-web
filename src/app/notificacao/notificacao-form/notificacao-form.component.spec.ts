import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoFormComponent } from './notificacao-form.component';

describe('NotificacaoFormComponent', () => {
  let component: NotificacaoFormComponent;
  let fixture: ComponentFixture<NotificacaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
