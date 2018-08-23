import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
    putVote(id: number, name: boolean) {
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

  function clickEditButton() {
    const buttonElement = fixture.debugElement.query(
      By.css('button.edit-button'));
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

  function modifyInput() {
    const inputElement = fixture.debugElement.query(
      By.css('input.edit-input'));
    inputElement.nativeElement.value = 'xxxx';
    inputElement.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
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
    spyOn(service, 'putVote').and.returnValue(of(''));
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

  it('should change "modified" property of an item', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].modified).toEqual(false);
    component.handleItemChange(component.items[0]);
    expect(component.items[0].modified).toEqual(true);
  });

  it('should modify component via view', async(() => {
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].editing).toEqual(false);
    expect(component.items[0].modified).toEqual(false);
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => clickEditButton())
      .then(() => {
        expect(component.items[0].editing).toEqual(true);
        expect(component.items[0].modified).toEqual(false);
      })
      .then(() => modifyInput())
      .then(() => {
        expect(component.items[0].editing).toEqual(true);
        expect(component.items[0].modified).toEqual(true);
        return clickEditButton()
      })
      .then(() => {expect(service.putItem).toHaveBeenCalledTimes(1)
      });
  }));

  it('should not modify component via view', async(() => {
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].editing).toEqual(false);
    expect(component.items[0].modified).toEqual(false);
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => clickEditButton())
      .then(() => {
        expect(component.items[0].editing).toEqual(true);
        expect(component.items[0].modified).toEqual(false);
      })
      .then(() => clickEditButton())
      .then(() => {
        expect(component.items[0].editing).toEqual(false);
        expect(component.items[0].modified).toEqual(false);
        expect(service.putItem).not.toHaveBeenCalled()
      });
  }));

  it('should modify component - force both flags to true', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    component.items[0].modified = true;
    component.items[0].editing = true;
    expect(component.items.length).toEqual(1);
    component.editItem(component.items[0]);
    expect(service.putItem).toHaveBeenCalledWith(
      component.items[0].id, component.items[0].name);
  });

  it('should not modify component - force only modified flag to true', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    component.items[0].modified = true;
    expect(component.items[0].editing).toEqual(false);
    expect(component.items.length).toEqual(1);
    component.editItem(component.items[0]);
    expect(service.putItem).not.toHaveBeenCalled();
  });

  it('should not modify component - force only editing flag to true', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    component.items[0].editing = true;
    expect(component.items[0].modified).toEqual(false);
    expect(component.items.length).toEqual(1);
    component.editItem(component.items[0]);
    expect(service.putItem).not.toHaveBeenCalled();
  });

  it('should increase vote', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    component.editVote(component.items[0], 1);
    expect(service.putVote).toHaveBeenCalledWith(1, 1);
  });

  it('should decrease vote', () => {
    expect(component.items.length).toEqual(0);
    component.addItem('abc');
    expect(component.items.length).toEqual(1);
    component.editVote(component.items[0], -1);
    expect(service.putVote).toHaveBeenCalledWith(1, -1);
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
