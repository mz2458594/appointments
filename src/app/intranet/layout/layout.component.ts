import { Component, inject } from "@angular/core";
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive]
})
export default class LayoutComponent {

  authService = inject(AuthService)




  // routes = intranetRoutes[0].children?.map(route => ({
  //   title: route.title,
  //   path: route.path
  // })).filter(route => route.path !== '**')
}
