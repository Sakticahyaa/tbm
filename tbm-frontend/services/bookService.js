/**
 * Book Service Module
 * 
 * Purpose:
 * - Provides centralized database operations for book data
 * - Handles all Supabase interactions
 * - Manages error handling and fallback behaviors
 * - Transforms data between database and application formats
 * 
 * Features:
 * - CRUD operations for book data
 * - Search functionality with multiple criteria
 * - Location-based filtering
 * - Error handling with graceful degradation
 * - Environment-aware configuration
 * 
 * Access: Used by useBooks and useBookCount hooks
 * Dependencies: Requires Supabase client configuration
 */

import { supabase } from '../lib/supabase'

export const bookService = {
  /**
   * Get All Books
   * 
   * Purpose: Retrieves all books from the database
   * - Fetches complete book list ordered by creation date
   * - Handles Supabase configuration errors gracefully
   * - Returns empty array on failure to prevent app crashes
   * 
   * @returns {Array} - Array of book objects or empty array on error
   */
  async getAllBooks() {
    try {
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      // Fetch all books ordered by creation date (newest first)
      const { data, error } = await supabase
        .from('buku')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching books:', error)
      // Return empty array on error to prevent app crashes
      return []
    }
  },

  /**
   * Get Books by Location
   * 
   * Purpose: Retrieves books filtered by specific location
   * - Filters books based on lokasi_buku field
   * - Maintains consistent ordering
   * - Handles configuration and query errors
   * 
   * @param {string} location - Location name to filter by
   * @returns {Array} - Array of filtered book objects
   */
  async getBooksByLocation(location) {
    try {
      // Check Supabase configuration
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      // Query books by location with ordering
      const { data, error } = await supabase
        .from('buku')
        .select('*')
        .eq('lokasi_buku', location)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching books by location:', error)
      return []
    }
  },

  /**
   * Search Books
   * 
   * Purpose: Provides comprehensive search functionality
   * - Searches across multiple book fields simultaneously
   * - Applies additional filters (genre, type, location)
   * - Uses case-insensitive pattern matching
   * - Combines search terms with filter criteria
   * 
   * @param {string} searchTerm - Text to search for
   * @param {Object} filters - Additional filter criteria
   * @returns {Array} - Array of matching book objects
   */
  async searchBooks(searchTerm, filters = {}) {
    try {
      // Check Supabase configuration
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      // Start building the query
      let query = supabase
        .from('buku')
        .select('*')

      /**
       * Search Term Processing
       * 
       * Purpose: Applies text search across multiple fields
       * - Searches in title, author, genre, type, and location
       * - Uses ilike for case-insensitive matching
       * - Combines multiple field searches with OR logic
       */
      if (searchTerm) {
        query = query.or(`judul_buku.ilike.%${searchTerm}%,penulis_buku.ilike.%${searchTerm}%,aliran_buku.ilike.%${searchTerm}%,jenis_buku.ilike.%${searchTerm}%,lokasi_buku.ilike.%${searchTerm}%`)
      }

      /**
       * Filter Application
       * 
       * Purpose: Applies additional filtering criteria
       * - Genre filter (aliran_buku)
       * - Type filter (jenis_buku)  
       * - Location filter (lokasi_buku)
       * - Each filter is applied with exact matching
       */
      if (filters.aliran) {
        query = query.eq('aliran_buku', filters.aliran)
      }
      if (filters.jenis) {
        query = query.eq('jenis_buku', filters.jenis)
      }
      if (filters.location && filters.location !== 'all') {
        query = query.eq('lokasi_buku', filters.location)
      }

      // Apply consistent ordering
      query = query.order('created_at', { ascending: false })

      // Execute query and handle response
      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching books:', error)
      return []
    }
  },

  /**
   * Get Book by ID
   * 
   * Purpose: Retrieves a single book by its unique identifier
   * - Used for book detail page display
   * - Returns single book object or null
   * - Handles not found cases gracefully
   * 
   * @param {string} id - Unique book identifier
   * @returns {Object|null} - Book object or null if not found
   */
  async getBookById(id) {
    try {
      // Query single book by ID
      const { data, error } = await supabase
        .from('buku')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching book by ID:', error)
      return null
    }
  },

  /**
   * Add New Book
   * 
   * Purpose: Creates a new book record in the database
   * - Inserts book data with automatic ID generation
   * - Returns created book object
   * - Handles validation and constraint errors
   * 
   * @param {Object} bookData - Book information to insert
   * @returns {Object} - Created book object
   * @throws {Error} - Database or validation errors
   */
  async addBook(bookData) {
    try {
      // Insert new book and return created record
      const { data, error } = await supabase
        .from('buku')
        .insert([bookData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding book:', error)
      throw error
    }
  },

  /**
   * Update Book
   * 
   * Purpose: Updates existing book record
   * - Modifies book data by ID
   * - Automatically updates timestamp
   * - Returns updated book object
   * 
   * @param {string} id - Book ID to update
   * @param {Object} bookData - Updated book information
   * @returns {Object} - Updated book object
   * @throws {Error} - Database or validation errors
   */
  async updateBook(id, bookData) {
    try {
      // Update book with new data and timestamp
      const { data, error } = await supabase
        .from('buku')
        .update({ ...bookData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating book:', error)
      throw error
    }
  },

  /**
   * Delete Book
   * 
   * Purpose: Removes book record from database
   * - Deletes book by ID
   * - Returns success status
   * - Handles foreign key constraints
   * 
   * @param {string} id - Book ID to delete
   * @returns {boolean} - Success status
   * @throws {Error} - Database or constraint errors
   */
  async deleteBook(id) {
    try {
      // Delete book record
      const { error } = await supabase
        .from('buku')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting book:', error)
      throw error
    }
  }
}