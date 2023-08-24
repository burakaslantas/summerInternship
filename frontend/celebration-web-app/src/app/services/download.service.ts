import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  downloadFile() {
    const apiUrl = 'http://localhost:3000/exportData'; // Replace with your server API URL

    // Make an HTTP GET request to the server
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/javascript' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a download link and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exportedData.js'; // Suggested filename

      // Trigger the download using the download link
      a.dispatchEvent(new MouseEvent('click'));

      // Clean up the URL
      window.URL.revokeObjectURL(url);
    });
  }
}
