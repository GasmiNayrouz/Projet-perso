import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logsList: any[] = [];
  loading = false;
  error = '';

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.fetchLogs()
  }
  fetchLogs(): void {
    this.logsService.getLogs().subscribe({
      next: (logs) => {
        this.logsList = logs;
      },
      error: (err) => {
        console.error('Failed to load logs', err);
      }
    });
  }
}
