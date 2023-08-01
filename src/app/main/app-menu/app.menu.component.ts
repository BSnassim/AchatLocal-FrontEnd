import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { AppMainComponent } from "../app-main/app.main.component";
import { TranslateService } from "@ngx-translate/core";
import { MenuService } from "./app.menu.service";
import { MenuItem } from "primeng/api";
import { NgxPermissionsService } from "ngx-permissions";

@Component({ selector: "app-menu", templateUrl: "./app.menu.component.html" })
export class AppMenuComponent implements OnInit {
  public templateMenu: any[];
  userMenu = [];
  constructor(public app: AppComponent, public appMain: AppMainComponent,
    private menuService: MenuService,
    private permissionService: NgxPermissionsService) { }

  ngOnInit() {
    // this.loadMenu();

    this.templateMenu = [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home",
        routerLink: ["/"]
      },
      {
        label: "Administration",
        icon: "pi pi-fw pi-list",
        visible: this.permissionService.getPermissions().hasOwnProperty("Administrateur"),
        items: [
          {
            label: "Gestion des utilisateurs",
            icon: "pi pi-fw pi-users",
            routerLink: ["/administration/users"]
          },
          {
            label: "Gestion des departements",
            icon: "pi pi-fw pi-id-card",
            routerLink: ["/administration/departements"]
          }
        ]
      },
      {
        label: "Magasinier",
        icon: "pi pi-fw pi-book",
        visible: (this.permissionService.getPermissions().hasOwnProperty("Administrateur") || this.permissionService.getPermissions().hasOwnProperty("Magasinier")),
        items: [
          {
            label: "Gestion des categories",
            icon: "pi pi-fw pi-th-large",
            routerLink: ["/magasinier/categories"]
          },
          {
            label: "Gestion des articles",
            icon: "pi pi-fw pi-pencil",
            routerLink: ["/magasinier/articles"]
          },
          {
            label: "Gestion des demandes",
            icon: "pi pi-fw pi-folder-open",
            routerLink: ["/demande/Liste-des-demandes"]
          },
          {
            label: "Bons de sortie",
            icon: "pi pi-fw pi-folder",
            routerLink: ["/demande/Liste-des-bons-de-sortie"]
          }
        ]
      },
      {
        label: "Service d'achat",
        icon: "pi pi-fw pi-wallet",
        visible: (this.permissionService.getPermissions().hasOwnProperty("Administrateur") ||
         this.permissionService.getPermissions().hasOwnProperty("Service achat") ||
         this.permissionService.getPermissions().hasOwnProperty("Magasinier")) ,
        items: [
          {
            label: "Demandes d'achat",
            icon: "pi pi-fw pi-folder",
            routerLink: ["service-achat/Liste-demande-achat"]
          },
          {
            label: "Bons de commande",
            icon: "pi pi-fw pi-folder",
            routerLink: ["service-achat/Liste-bon-de-commande"]
          },
        ]
      },
      {
        label: "Demander un article",
        icon: "pi pi-fw pi-file-o",
        routerLink: ["/demande/Demander-un-article"]
      },
      {
        label: "Mes demandes",
        icon: "pi pi-fw pi-folder",
        routerLink: ["/demande/Mes-demandes"]
      },
      
    ];
    this.userMenu = this.templateMenu;
    //Place here static menu items
  }

  loadMenu(): void {
    //Place here menu items loading
    /*this.menuService.loadMenu().subscribe((response: any) => {
           const menuItems = response.content as MenuItem[];
           this.translateService.get('menu').subscribe((translatedMenu: any) => {
                // Accept o=menu with depth = 3 !
                menuItems.forEach((menuItem) => {
                    menuItem = this.deleteInvalidItems(menuItem);
                    delete menuItem.routerLink;
                    menuItem.label = translatedMenu[menuItem.label];
                    menuItem.items?.forEach((childMenuItem) => {
                        // tslint:disable-next-line:max-line-length
                        childMenuItem = this.deleteInvalidItems(childMenuItem);
                        childMenuItem = this.correctInvalidRouterLink(childMenuItem);
                        childMenuItem.label = translatedMenu[childMenuItem.label];
                        childMenuItem.items?.forEach(grandChildMenuItem => {
                            // tslint:disable-next-line:max-line-length
                            grandChildMenuItem = this.deleteInvalidItems(grandChildMenuItem);
                            grandChildMenuItem = this.correctInvalidRouterLink(grandChildMenuItem);
                            grandChildMenuItem.label = translatedMenu[grandChildMenuItem.label];
                        });
                    });
                });
                this.userMenu = menuItems.concat(this.templateMenu);
            });
        });*/
  }
  /*correctInvalidRouterLink(menuItem: MenuItem): MenuItem {
       if (!menuItem.routerLink || menuItem.routerLink === [null] || menuItem.routerLink.length === 0){
           delete menuItem.routerLink;
       }else{
           menuItem.routerLinkActiveOptions = {exact: true};
       }
       return menuItem;
   }
   deleteInvalidItems(menuItem: MenuItem): MenuItem{
       if (!menuItem.items || menuItem.items.length === 0 || menuItem.items === [null]){
           delete menuItem.items;
       }
       return menuItem;
   }*/
}
