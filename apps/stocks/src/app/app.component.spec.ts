import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() =>
    {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      app = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    }
  )

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Stocks'`, () => {
    expect(app.Title).toEqual('Stocks');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Stocks'
    );
  });
});
