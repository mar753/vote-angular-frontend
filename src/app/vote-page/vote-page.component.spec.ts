import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VotePageComponent } from './vote-page.component';
import { VotePageService } from './vote-page.service';
import { of } from 'rxjs';

describe('VotePageComponent', () => {
  let service: VotePageService;
  let component: VotePageComponent;
  let fixture: ComponentFixture<VotePageComponent>;
  let votePageServiceMock = {
    getItems() {
      return of([]);
    },
    postItem(name: string) {
      return of('');
    },
    putItem(id: number, name: boolean) {
      return of('');
    },
    deleteItem(id: number) {
      return of('');
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
      providers: [ { provide: VotePageService, useValue: votePageServiceMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(VotePageService);
    spyOn(service, 'postItem').and.returnValue(of(''));
    spyOn(service, 'putItem').and.returnValue(of(''));
    spyOn(service, 'deleteItem').and.returnValue(of(''));
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
    expect(service.postItem).toHaveBeenCalledTimes(1)
  });

  it('should add item via component - second item', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    component.items[0].id = 999;
    component.addItem('def');
    expect(component.items.length).toEqual(2);
    expect(component.items[1].id).toEqual(1000);
    expect(component.items[1].name).toEqual('def');
    expect(service.postItem).toHaveBeenCalledTimes(2);
  });

  it('should not add the same item name twice', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].id).toEqual(1);
    expect(component.items[0].name).toEqual('abc');
    expect(service.postItem).toHaveBeenCalledTimes(1);
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].id).toEqual(1);
    expect(component.items[0].name).toEqual('abc');
    expect(service.postItem).toHaveBeenCalledTimes(1);
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
        expect(service.deleteItem).toHaveBeenCalledTimes(1);
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
    expect(service.deleteItem).toHaveBeenCalledTimes(1);
  });
});
