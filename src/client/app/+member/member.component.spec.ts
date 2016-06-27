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
  describe('Member component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            rootTC.detectChanges();

            let memberInstance = rootTC.debugElement.children[0].componentInstance;
            let memberDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(memberInstance.nameListService).toEqual(jasmine.any(NameListService));
            expect(getDOM().querySelectorAll(memberDOMEl, 'li').length).toEqual(0);

            memberInstance.newName = 'Minko';
            memberInstance.addName();
            rootTC.detectChanges();

            expect(getDOM().querySelectorAll(memberDOMEl, 'li').length).toEqual(1);

            expect(getDOM().querySelectorAll(memberDOMEl, 'li')[0].textContent).toEqual('Minko');
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
  template: '<sd-member></sd-member>'
  // directives: [MemberComponent]
})
class TestComponent {}
