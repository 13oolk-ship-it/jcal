import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService } from '../../services/supabase.service';
import { FoodScannerService } from '../../services/food-scanner.service';

@Component({
  selector: 'app-add-food',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css',
})
export class AddFoodComponent {
  @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;

  name = '';
  calories = 0;
  protein = 0;
  carb = 0;
  fat = 0;
  loading = signal(false);
  errorMessage = signal('');

  // Scanner state
  previewUrl = signal<string | null>(null);
  scanning = signal(false);
  scanDone = signal(false);
  scanError = signal('');
  private imageBase64 = '';
  private imageMimeType = '';

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private scanner: FoodScannerService,
  ) {}

  openCamera() {
    this.cameraInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.scanError.set('');
    this.scanDone.set(false);
    this.imageMimeType = file.type || 'image/jpeg';

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      this.previewUrl.set(dataUrl);
      // Extract base64 data (remove data:image/xxx;base64, prefix)
      this.imageBase64 = dataUrl.split(',')[1];
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be re-selected
    input.value = '';
  }

  async analyzeImage() {
    if (!this.imageBase64) return;

    this.scanning.set(true);
    this.scanError.set('');

    try {
      const result = await this.scanner.scanImage(this.imageBase64, this.imageMimeType);
      // Auto-fill form
      if (result.name) this.name = result.name;
      this.calories = result.calories;
      this.protein = result.protein;
      this.carb = result.carb;
      this.fat = result.fat;
      this.scanDone.set(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to analyze image';
      this.scanError.set(msg);
    } finally {
      this.scanning.set(false);
    }
  }

  clearPreview() {
    this.previewUrl.set(null);
    this.imageBase64 = '';
    this.imageMimeType = '';
    this.scanDone.set(false);
    this.scanError.set('');
  }

  async onSubmit() {
    if (!this.name.trim()) {
      this.errorMessage.set('Food name is required.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.supabase.addFood({
        name: this.name.trim(),
        calories: this.calories,
        protein: this.protein,
        carb: this.carb,
        fat: this.fat,
      });
      this.snackBar.open('Food added successfully!', 'OK', { duration: 3000 });
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add food';
      this.errorMessage.set(message);
    } finally {
      this.loading.set(false);
    }
  }
}
