import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Food {
  id?: number;
  name: string;
  calories: number;
  protein: number;
  carb: number;
  fat: number;
}

export interface Meal {
  id?: number;
  user_id?: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  created_at?: string;
  meal_items?: MealItem[];
}

export interface MealItem {
  id?: number;
  meal_id?: number;
  food_id: number;
  quantity: number;
  food?: Food;
}

export interface Profile {
  id: string;
  weight?: number;
  height?: number;
  age?: number;
  goal_type?: string;
  activity_level?: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase!: SupabaseClient;
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    if (this.isBrowser) {
      this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey
      );
    }
  }

  private assertBrowser(): void {
    if (!this.isBrowser) {
      throw new Error('Supabase operations are only available in the browser.');
    }
  }

  // ─── Auth ────────────────────────────────────────
  async signUp(email: string, password: string) {
    this.assertBrowser();
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    // upsert profile
    if (data.user) {
      await this.supabase.from('profiles').upsert({
        id: data.user.id,
      });
    }
    return data;
  }

  async signIn(email: string, password: string) {
    this.assertBrowser();
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    this.assertBrowser();
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getUser(): Promise<User | null> {
    if (!this.isBrowser) return null;
    // Try session from localStorage first (fast, no network)
    const { data: { session } } = await this.supabase.auth.getSession();
    if (session?.user) return session.user;
    // Fallback to server verification
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  // ─── Profile ─────────────────────────────────────
  async getProfile(): Promise<Profile | null> {
    const user = await this.getUser();
    if (!user) return null;
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (error) throw error;
    return data;
  }

  // ─── Foods ───────────────────────────────────────
  async getFoods(): Promise<Food[]> {
    if (!this.isBrowser) return [];
    const { data, error } = await this.supabase
      .from('foods')
      .select('*')
      .order('name');
    if (error) throw error;
    return data ?? [];
  }

  async addFood(food: Omit<Food, 'id'>): Promise<Food> {
    const { data, error } = await this.supabase
      .from('foods')
      .insert(food)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateFood(id: number, food: Partial<Omit<Food, 'id'>>): Promise<Food> {
    this.assertBrowser();
    const { data, error } = await this.supabase
      .from('foods')
      .update(food)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteFood(id: number): Promise<void> {
    this.assertBrowser();
    const { error } = await this.supabase
      .from('foods')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // ─── Meals ───────────────────────────────────────
  async addMeal(mealType: string): Promise<Meal> {
    const user = await this.getUser();
    const { data, error } = await this.supabase
      .from('meals')
      .insert({ meal_type: mealType, user_id: user?.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async addMealItem(mealId: number, foodId: number, quantity: number): Promise<MealItem> {
    const { data, error } = await this.supabase
      .from('meal_items')
      .insert({ meal_id: mealId, food_id: foodId, quantity })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteMeal(mealId: number): Promise<void> {
    this.assertBrowser();
    // Delete meal_items first (FK constraint)
    const { error: itemsError } = await this.supabase
      .from('meal_items')
      .delete()
      .eq('meal_id', mealId);
    if (itemsError) throw itemsError;
    // Delete the meal
    const { error } = await this.supabase
      .from('meals')
      .delete()
      .eq('id', mealId);
    if (error) throw error;
  }

  async getTodayMeals(): Promise<Meal[]> {
    const user = await this.getUser();
    if (!user) return [];
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await this.supabase
      .from('meals')
      .select(`
        *,
        meal_items (
          *,
          food:foods (*)
        )
      `)
      .eq('user_id', user.id)
      .gte('created_at', today + 'T00:00:00')
      .lt('created_at', today + 'T23:59:59.999');
    if (error) throw error;
    return data ?? [];
  }

  async getMealsForDateRange(startDate: string, endDate: string): Promise<Meal[]> {
    const user = await this.getUser();
    if (!user) return [];
    const { data, error } = await this.supabase
      .from('meals')
      .select(`
        *,
        meal_items (
          *,
          food:foods (*)
        )
      `)
      .eq('user_id', user.id)
      .gte('created_at', startDate + 'T00:00:00')
      .lte('created_at', endDate + 'T23:59:59.999');
    if (error) throw error;
    return data ?? [];
  }
}
