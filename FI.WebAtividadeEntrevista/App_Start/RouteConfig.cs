﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebAtividadeEntrevista
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "Beneficiario",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Cliente", action = "BeneficiarioList", id = UrlParameter.Optional }
           );

            routes.MapRoute(
              name: "BeneficiarioExiste",
              url: "{controller}/{action}/{cpf}",
              defaults: new { controller = "Cliente", action = "ExisteBeneficiario", cpf = UrlParameter.Optional }
          );
        }
    }
}
