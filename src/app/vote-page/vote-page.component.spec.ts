import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VotePageComponent } from './vote-page.component';
import { VotePageService } from './vote-page.service';
import { of } from 'rxjs';

describe('VotePageComponent', () => {
  let component: VotePageComponent;
  let fixture: ComponentFixture<VotePageComponent>;
  let votePageServiceMock = {
    response: [],
    getItems() {
      return of([]);
    }
  };

  function addTextToInput(text: string) {
    const inputElement = fixture.debugElement.query(
      By.css('input#new-item-name'));
    inputElement.nativeElement.value = text;
    inputElement.nativeElement.dispatchEvent(new Event('onchange'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function clickAddButton() {
    const buttonElement = fixture.debugElement.query(
      By.css('button#new-item-button'));
    buttonElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function clickRemoveButton() {
    const buttonElement = fixture.debugElement.query(
      By.css('button.remove-button'));
    buttonElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotePageComponent ],
      providers: [ {provide: VotePageService, useValue: votePageServiceMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    votePageServiceMock.response = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item via view', async(() => {
    expect(component.items.length).toEqual(0);
    addTextToInput('fgh')
      .then(() => clickAddButton())
      .then(() => {
        expect(component.items.length).toEqual(1);
        expect(component.items[0].id).toEqual(1);
        expect(component.items[0].name).toEqual('fgh');
      });
  }));

  it('should add item via component', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].id).toEqual(1);
    expect(component.items[0].name).toEqual('abc');
  });

  it('should remove item via view', async(() => {
    expect(component.items.length).toEqual(0);
    addTextToInput('fgh')
      .then(() => clickAddButton())
      .then(() => {
        expect(component.items.length).toEqual(1);
        expect(component.items[0].id).toEqual(1);
        expect(component.items[0].name).toEqual('fgh');
      })
      .then(() => clickRemoveButton())
      .then(() => {
        expect(component.items.length).toEqual(0);
      });
  }));

  it('should remove item via component', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].id).toEqual(1);
    expect(component.items[0].name).toEqual('abc');
    component.removeItem(component.items[0]);
    expect(component.items.length).toEqual(0);
  });
});
