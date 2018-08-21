import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { VotePageService } from './vote-page.service';

describe('VotePageService', () => {
  const mockData = {items: [
    {id: 1, name: 'QWE'},
    {id: 2, name: 'RTY'}
  ]};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VotePageService]
    });
  });

  it('should be created', inject([VotePageService], (service: VotePageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get items', inject([HttpTestingController, VotePageService],
    (httpMock: HttpTestingController, service: VotePageService) => {
      service.getItems().subscribe(data => {
        expect(data).toEqual(mockData.items);
      });
      const mockReq = httpMock.expectOne(service.url + service.itemsPath);
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush(mockData);
      httpMock.verify();
  }));
});
