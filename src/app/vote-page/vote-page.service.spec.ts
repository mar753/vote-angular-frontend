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
      const mockReq = httpMock.expectOne(service.url + service.itemsRoute);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(mockData);
      httpMock.verify();
  }));

  it('should post item', inject([HttpTestingController, VotePageService],
    (httpMock: HttpTestingController, service: VotePageService) => {
      service.postItem('qwe').subscribe();
      const mockReq = httpMock.expectOne(service.url + service.itemsRoute);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('POST');
      expect(mockReq.request.body).toEqual({value:'qwe'});
      mockReq.flush(mockData);
      httpMock.verify();
  }));

  it('should edit item using PUT', inject([HttpTestingController, VotePageService],
    (httpMock: HttpTestingController, service: VotePageService) => {
      service.putItem(3, -1).subscribe();
      const mockReq = httpMock.expectOne(service.url + service.itemsRoute + '/3');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('PUT');
      expect(mockReq.request.body).toEqual({value: -1});
      mockReq.flush(mockData);
      httpMock.verify();
  }));

  it('should delete item', inject([HttpTestingController, VotePageService],
    (httpMock: HttpTestingController, service: VotePageService) => {
      service.deleteItem(3).subscribe();
      const mockReq = httpMock.expectOne(service.url + service.itemsRoute + '/3');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('DELETE');
      expect(mockReq.request.body).toEqual(null);
      mockReq.flush(mockData);
      httpMock.verify();
  }));
});
