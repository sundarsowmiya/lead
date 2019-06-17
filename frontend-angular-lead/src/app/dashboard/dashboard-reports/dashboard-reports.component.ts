import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LeadService } from '../../services/lead.service';
@Component({
  selector: 'app-dashboard-reports',
  templateUrl: './dashboard-reports.component.html',
  styleUrls: ['../dashboard.component.css', '../../../assets/css/vendor/jquery-jvectormap-1.2.2.css',
  ]
})
export class DashboardReportsComponent implements OnInit {
  followupCount;
  customer;
  leads;
  unqualfied;
  loadAPI: Promise<any>;
  constructor(private leadService: LeadService, private route: ActivatedRoute) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }
  ngOnInit() {
    this.loadScript();

    this.leadService.performActionLeadsCount().subscribe((resources) => {
      this.setLeadsCount(resources);
    });
    this.leadService.performActionCustomersCount().subscribe((resources) => {
      this.setCustomersCount(resources);
    });
    this.leadService.performActionUnqualfiedCount().subscribe((resources) => {
      this.setUnqualfiedCount(resources);
    });
    this.leadService.performActionFollowupCount().subscribe((resources) => {
      this.setFollowupCoune(resources);
    });
  }
  setLeadsCount(e) {
    this.leads = e.leads;
  }
  setCustomersCount(e) {
    this.customer = e.customer;
  }
  setUnqualfiedCount(e) {
    this.unqualfied = e.unqualfied;
  }
  setFollowupCoune(e) {
    this.followupCount = e.followup;
  }
  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        //  "../../assets/js/app.min.js",
        "../../assets/js/vendor/Chart.bundle.min.js",
        "../../assets/js/vendor/jquery-jvectormap-1.2.2.min.js",
        "../../assets/js/vendor/jquery-jvectormap-world-mill-en.js",
        "../../assets/js/pages/demo.dashboard.js",
        "../../assets/js/vendor/apexcharts.min.js",
        "../../assets/js/pages/demo.apex-pie.js",
        // "../../assets/js/vendor/d3.min.js",
        // "../../assets/js/vendor/britecharts.min.js",
        // "../../assets/js/pages/demo.britechart.js",


      ];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }

}
