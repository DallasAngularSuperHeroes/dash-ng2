import { Component, provide } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  HTTP_PROVIDERS
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { NameListService } from '../shared/index';
// import { MemberComponent } from './member.component';

export function main() {
  describe('MemberList component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            rootTC.detectChanges();

            let memberListInstance = rootTC.debugElement.children[0].componentInstance;
            let memberListDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(memberListInstance.nameListService).toEqual(jasmine.any(NameListService));
            expect(getDOM().querySelectorAll(memberListDOMEl, 'li').length).toEqual(0);

            memberListInstance.newName = 'Minko';
            memberListInstance.addName();
            rootTC.detectChanges();

            expect(getDOM().querySelectorAll(memberListDOMEl, 'li').length).toEqual(1);

            expect(getDOM().querySelectorAll(memberListDOMEl, 'li')[0].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [
    HTTP_PROVIDERS,
    NameListService,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
  ],
  selector: 'test-cmp',
  template: '<sd-memberList></sd-memberList>'
  // directives: [MemberComponent]
})
class TestComponent {}
